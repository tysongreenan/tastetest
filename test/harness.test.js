import assert from "node:assert/strict";
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { HarnessError, HarnessRuntime } from "../cli/harness.js";
import { hashPath } from "../cli/diagnostics.js";

test("harness enforces phase order and required artifacts", async (t) => {
  const target = await temporaryProject(t, "panel-harness-order-");
  const runtime = HarnessRuntime.start({ projectRoot: target, runId: "order", runClass: "lite" });

  const lockPath = path.join(target, ".panel", "runs", "order", "write.lock");
  writeFileSync(lockPath, "other-process\n", "utf8");
  assert.throws(
    () => runtime.advance({ phase: "preflight" }),
    (error) => error instanceof HarnessError && error.code === "RUN_LOCKED"
  );
  unlinkSync(lockPath);

  assert.throws(
    () => runtime.advance({ phase: "critique" }),
    (error) => error instanceof HarnessError && error.code === "PHASE_ORDER"
  );
  assert.throws(
    () => runtime.advance({ phase: "preflight" }),
    (error) => error instanceof HarnessError && error.code === "ARTIFACT_MISSING"
  );
  writeArtifact(target, "panel-report/run-state.yaml", "run_id: order\npreflight: lite\nprotocol: short\nrun_class: lite\n");
  assert.throws(
    () => runtime.advance({ phase: "preflight", artifacts: ["../../etc/passwd"] }),
    (error) => error instanceof HarnessError && error.code === "ARTIFACT_PATH_INVALID"
  );
  runtime.advance({ phase: "preflight" });
  writeArtifact(target, "panel-report/heuristics.md", "# Heuristics\nRun: `order`\n");
  runtime.advance({ phase: "critique" });
  writeArtifact(target, "panel-report/report.md", "# Report\nRun: `order`\n");
  const complete = runtime.advance({ phase: "report" });

  assert.equal(complete.status, "complete");
  assert.equal(complete.currentPhase, "complete");
  assert.equal(runtime.events().length, 4);
  assert.match(complete.admittedArtifacts["panel-report/report.md"].sha256, /^[a-f0-9]{64}$/);
});

test("harness rejects path-like run identifiers", async (t) => {
  const target = await temporaryProject(t, "panel-harness-id-");
  assert.throws(
    () => HarnessRuntime.start({ projectRoot: target, runId: "../../escape", runClass: "lite" }),
    (error) => error instanceof HarnessError && error.code === "RUN_ID_INVALID"
  );
});

test("harness rejects artifacts stamped for another run", async (t) => {
  const target = await temporaryProject(t, "panel-harness-provenance-");
  writeArtifact(target, "panel-report/run-state.yaml", "run_id: previous-run\npreflight: GO\n");
  const runtime = HarnessRuntime.start({ projectRoot: target, runId: "current-run", runClass: "lite" });

  assert.throws(
    () => runtime.advance({ phase: "preflight" }),
    (error) => error instanceof HarnessError && error.code === "ARTIFACT_PROVENANCE_INVALID"
  );
  assert.equal(runtime.status().currentPhase, "preflight");
});

test("harness validates JSON stamps and hash-bound binary sidecars", async (t) => {
  const target = await temporaryProject(t, "panel-harness-structured-provenance-");
  const runtime = HarnessRuntime.start({ projectRoot: target, runId: "structured", runClass: "lite" });
  writeArtifact(target, "panel-report/run-state.yaml", "run_id: structured\npreflight: GO\n");
  writeArtifact(target, "panel-report/stale.json", '{"runId":"another-run"}\n');

  assert.throws(
    () => runtime.advance({ phase: "preflight", artifacts: ["panel-report/stale.json"] }),
    (error) => error instanceof HarnessError && error.code === "ARTIFACT_PROVENANCE_INVALID"
  );

  writeArtifact(target, "panel-report/current.json", '{"runId":"structured"}\n');
  const imagePath = path.join(target, "panel-report/evidence.png");
  writeFileSync(imagePath, Buffer.from("binary-evidence"));
  writeArtifact(target, "panel-report/evidence.png.provenance.json", JSON.stringify({
    runId: "structured",
    sha256: hashPath(imagePath),
  }));
  writeFileSync(imagePath, Buffer.from("mutated-binary-evidence"));
  assert.throws(
    () => runtime.advance({ phase: "preflight", artifacts: ["panel-report/evidence.png"] }),
    (error) => error instanceof HarnessError && error.code === "ARTIFACT_PROVENANCE_INVALID"
  );
  writeArtifact(target, "panel-report/evidence.png.provenance.json", JSON.stringify({
    runId: "structured",
    sha256: hashPath(imagePath),
  }));
  const state = runtime.advance({
    phase: "preflight",
    artifacts: ["panel-report/current.json", "panel-report/evidence.png"],
  });

  assert.equal(state.currentPhase, "critique");
  assert.equal(state.admittedArtifacts["panel-report/evidence.png"].phase, "preflight");
});

test("harness detects state and event-log tampering", async (t) => {
  const target = await temporaryProject(t, "panel-harness-tamper-");
  const runtime = HarnessRuntime.start({ projectRoot: target, runId: "tamper", runClass: "lite" });
  const statePath = path.join(target, ".panel", "runs", "tamper", "state.json");
  const originalState = readFileSync(statePath, "utf8");
  writeFileSync(statePath, originalState.replace('"status": "active"', '"status": "complete"'), "utf8");
  assert.throws(
    () => runtime.status(),
    (error) => error instanceof HarnessError && error.code === "STATE_TAMPERED"
  );

  writeFileSync(statePath, originalState, "utf8");
  const eventsPath = path.join(target, ".panel", "runs", "tamper", "events.jsonl");
  writeFileSync(eventsPath, readFileSync(eventsPath, "utf8").replace("run_started", "run_forged"), "utf8");
  assert.throws(
    () => runtime.status(),
    (error) => error instanceof HarnessError && error.code === "EVENT_LOG_TAMPERED"
  );
});

test("harness issues fail-closed write permits and consumes the active permit once", async (t) => {
  const target = await temporaryProject(t, "panel-harness-permit-");
  const runtime = HarnessRuntime.start({ projectRoot: target, runId: "permit", runClass: "implement" });
  writeArtifact(target, "panel-report/council.md", "# Consensus\nRun: `permit`\nDecision: PROCEED\n\n## Orchestrator\nApprove.\n\n## PM-Avery\nApprove.\n");
  writeArtifact(target, "panel-report/craft.md", "# Approve\nRun: `permit`\n");
  writeArtifact(target, "panel-report/design-system.md", "# Approve\nRun: `permit`\n");
  runtime.advance({ phase: "consensus" });

  assert.throws(
    () => runtime.authorize({ action: "unknown_write", approvals: [], consensusDecision: "PROCEED" }),
    (error) => error instanceof HarnessError && error.code === "ACTION_UNKNOWN"
  );
  assert.throws(
    () => runtime.authorize({ action: "implement_layout", approvals: [], consensusDecision: "PROCEED" }),
    (error) => error instanceof HarnessError && error.code === "APPROVALS_MISSING"
  );

  const approvals = [
    { role: "Orchestrator Manager", status: "yes", evidence: "panel-report/council.md#orchestrator" },
    { role: "Craft Critic", status: "yes", evidence: "panel-report/craft.md#approve" },
    { role: "Design System Checker", status: "yes", evidence: "panel-report/design-system.md#approve" },
    { role: "PM-Avery", status: "yes", evidence: "panel-report/council.md#pm-avery" },
  ];
  assert.throws(
    () => runtime.authorize({
      action: "implement_layout",
      approvals: approvals.map(({ role, status }) => ({ role, status })),
      consensusDecision: "PROCEED",
    }),
    (error) => error instanceof HarnessError && error.code === "APPROVAL_EVIDENCE_MISSING"
  );
  const permit = runtime.authorize({ action: "implement_layout", approvals, consensusDecision: "PROCEED" });
  assert.equal(runtime.status().activePermit, permit.permitId);
  assert.throws(
    () => runtime.advance({ phase: "implement", permitId: "not-active" }),
    (error) => error instanceof HarnessError && error.code === "PERMIT_INVALID"
  );

  const next = runtime.advance({ phase: "implement", permitId: permit.permitId });
  assert.equal(next.currentPhase, "verify");
  assert.equal(next.activePermit, null);
  assert.throws(
    () => runtime.advance({ phase: "implement", permitId: permit.permitId }),
    (error) => error instanceof HarnessError && error.code === "PHASE_ORDER"
  );
  writeArtifact(target, "panel-report/verification.md", "# Verification\nRun: `permit`\nVerdict: PASS\n");
  runtime.advance({ phase: "verify" });
  writeArtifact(target, "panel-report/learning.md", "# Learning\nRun: `permit`\n");
  assert.throws(
    () => runtime.advance({ phase: "learn" }),
    (error) => error instanceof HarnessError && error.code === "VALIDATION_FAILED"
  );
});

async function temporaryProject(t, prefix) {
  const target = await mkdtemp(path.join(os.tmpdir(), prefix));
  t.after(() => rm(target, { recursive: true, force: true }));
  return target;
}

function writeArtifact(target, relative, contents) {
  const destination = path.join(target, relative);
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, contents, "utf8");
}
