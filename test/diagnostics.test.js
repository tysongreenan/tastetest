import assert from "node:assert/strict";
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { doctorProject } from "../cli/doctor.js";
import { initProject } from "../cli/init.js";
import { validateProject } from "../cli/validate.js";

const packageVersion = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
).version;

test("doctor passes a current complete install and fails deleted managed files", async (t) => {
  const target = await mkdtemp(path.join(os.tmpdir(), "panel-doctor-test-"));
  t.after(() => rm(target, { recursive: true, force: true }));
  await initProject({
    dir: target,
    packageVersion,
    cursor: false,
    claude: false,
  });

  const healthy = doctorProject({ dir: target, packageVersion, json: true });
  assert.equal(healthy.ok, true);

  unlinkSync(path.join(target, "PANEL.md"));
  const broken = doctorProject({ dir: target, packageVersion, json: true });
  assert.equal(broken.ok, false);
  assert.equal(broken.issues.some((item) => item.code === "CORE_FILE_MISSING"), true);
  assert.equal(broken.issues.some((item) => item.code === "MANAGED_FILES_DELETED"), true);
});

test("validate accepts evidenced output and rejects speculative blockers", async (t) => {
  const target = await mkdtemp(path.join(os.tmpdir(), "panel-validate-test-"));
  t.after(() => rm(target, { recursive: true, force: true }));
  const reportDir = path.join(target, "panel-report");
  mkdirSync(reportDir, { recursive: true });

  writeFileSync(path.join(reportDir, "run-state.yaml"), validRunState(), "utf8");
  for (const file of ["report.md", "learning.md", "verification.md", "journeys.md"]) {
    writeFileSync(path.join(reportDir, file), `# ${file}\n`, "utf8");
  }
  writeFileSync(path.join(reportDir, "desktop.png"), "desktop", "utf8");
  writeFileSync(path.join(reportDir, "mobile.png"), "mobile", "utf8");
  writeFileSync(path.join(reportDir, "process-score.md"), "# Process\n- all checks: yes\n", "utf8");
  writeFileSync(
    path.join(reportDir, "hypotheses.md"),
    "# Hypotheses\nH-001\nResult: upheld with new evidence\n",
    "utf8"
  );
  writeFileSync(path.join(reportDir, "findings.json"), JSON.stringify(validFindings(), null, 2), "utf8");

  const valid = validateProject({ dir: target, json: true });
  assert.equal(valid.ok, true, JSON.stringify(valid.issues));

  const badFindings = validFindings();
  badFindings.findings[0].confidence = "speculative";
  badFindings.findings[0].severity = "Block";
  badFindings.findings[0].status = "open";
  writeFileSync(path.join(reportDir, "findings.json"), JSON.stringify(badFindings, null, 2), "utf8");

  const invalid = validateProject({ dir: target, json: true });
  assert.equal(invalid.ok, false);
  assert.equal(invalid.issues.some((item) => item.code === "SPECULATION_BLOCKS_SHIP"), true);
  assert.equal(invalid.issues.some((item) => item.code === "BLOCKING_FINDINGS_OPEN"), true);
});

test("validate accepts an honest NO-GO package without demanding implementation artifacts", async (t) => {
  const target = await mkdtemp(path.join(os.tmpdir(), "panel-no-go-test-"));
  t.after(() => rm(target, { recursive: true, force: true }));
  const reportDir = path.join(target, "panel-report");
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(
    path.join(reportDir, "run-state.yaml"),
    "preflight: NO-GO\nprotocol: full\nrun_class: full\ndelivery_status: BLOCKED\n",
    "utf8"
  );
  writeFileSync(path.join(reportDir, "report.md"), "# NO-GO\nMissing personas.\n", "utf8");

  const result = validateProject({ dir: target, json: true });
  assert.equal(result.ok, true, JSON.stringify(result.issues));
});

function validRunState() {
  return `preflight: GO
protocol: full
run_class: implement
consensus:
  decision: PROCEED
hypotheses:
  status: measured
learning:
  status: closed
delivery_status: SHIPPABLE
verification:
  verdict: PASS
  desktop_evidence: [panel-report/desktop.png]
  mobile_evidence: [panel-report/mobile.png]
  visual_regression: pass
  preserve_regression: pass
  states:
    default: pass
    hover: pass
    focus_visible: pass
    active_pressed: pass
    loading: "n/a: static surface"
    empty: "n/a: static surface"
    error: "n/a: static surface"
    disabled: "n/a: no disabled control"
    success: pass
    reduced_motion: pass
design_system_delta:
  status: none
artifacts:
  report: panel-report/report.md
skills_used:
  - seat: Journey Critic
    files: [JOURNEY.md]
    hook: "Checked the primary path"
    artifact: panel-report/journeys.md
artifact_checks:
  - seat: Journey Critic
    required: panel-report/journeys.md
    present: true
`;
}

function validFindings() {
  return {
    schemaVersion: "1.0",
    surface: "homepage",
    findings: [
      {
        id: "H-001",
        severity: "P1",
        confidence: "observed",
        surface: "hero CTA",
        problem: "The primary action was not visually distinct.",
        evidence: [
          {
            type: "browser",
            ref: "panel-report/desktop.png",
            claim: "Primary and secondary actions had equal visual weight."
          }
        ],
        change: "Give the install action sole primary emphasis.",
        personaImpact: {
          priority: "help — faster first action",
          secondary: "neutral — supporting path remains visible"
        },
        acceptanceCheck: "The install action is the only primary button at desktop and mobile.",
        owner: "Frontend Design",
        sourceArtifacts: ["panel-report/journeys.md"],
        status: "verified"
      }
    ]
  };
}
