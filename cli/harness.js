import { createHash, randomUUID } from "node:crypto";
import {
  appendFileSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import { hashPath } from "./diagnostics.js";
import { missingApprovers } from "./gates.js";
import { validateProject } from "./validate.js";

const PIPELINES = Object.freeze({
  lite: ["preflight", "critique", "report", "complete"],
  standard: ["preflight", "product", "journeys", "critique", "frontend", "cross_critique", "report", "consensus", "implement", "verify", "learn", "complete"],
  full: ["preflight", "product", "journeys", "critique", "copy", "frontend", "cross_critique", "report", "consensus", "implement", "verify", "learn", "complete"],
  implement: ["consensus", "implement", "verify", "learn", "complete"],
});

const REVIEW_PIPELINES = Object.freeze({
  standard: ["preflight", "product", "journeys", "critique", "frontend", "cross_critique", "report", "learn", "complete"],
  full: ["preflight", "product", "journeys", "critique", "copy", "frontend", "cross_critique", "report", "learn", "complete"],
});

const PHASE_ARTIFACTS = Object.freeze({
  preflight: ["panel-report/run-state.yaml"],
  product: ["panel-report/product.md"],
  journeys: ["panel-report/journeys.md"],
  critique: ["panel-report/heuristics.md"],
  copy: ["panel-report/copy.md"],
  frontend: ["panel-report/frontend.md"],
  cross_critique: ["panel-report/hypotheses.md"],
  report: ["panel-report/report.md", "panel-report/findings.json", "panel-report/process-score.md"],
  consensus: ["panel-report/council.md"],
  verify: ["panel-report/verification.md"],
  learn: ["panel-report/learning.md"],
});

export class HarnessRuntime {
  static start({ projectRoot, runId, runClass = "standard", reviewOnly = false, clock = () => new Date() }) {
    const root = path.resolve(projectRoot || process.cwd());
    if (!PIPELINES[runClass]) throw new HarnessError("RUN_CLASS_INVALID", `Unknown run class: ${runClass}`);
    if (reviewOnly && !REVIEW_PIPELINES[runClass]) {
      throw new HarnessError("REVIEW_MODE_INVALID", `Review-only mode is not supported for ${runClass}.`);
    }
    const id = runId || `${clock().toISOString().replace(/[:.]/g, "-")}-${randomUUID().slice(0, 8)}`;
    assertRunId(id);
    const runDir = path.join(root, ".panel", "runs", id);
    if (existsSync(runDir)) throw new HarnessError("RUN_EXISTS", `Run already exists: ${id}`);
    mkdirSync(path.join(runDir, "permits"), { recursive: true });
    const pipeline = reviewOnly ? REVIEW_PIPELINES[runClass] : PIPELINES[runClass];
    const state = {
      schemaVersion: 1,
      runId: id,
      runClass,
      reviewOnly,
      status: "active",
      pipeline,
      phaseIndex: 0,
      currentPhase: pipeline[0],
      admittedArtifacts: {},
      activePermit: null,
      sequence: 0,
    };
    const runtime = new HarnessRuntime({ projectRoot: root, runId: id, clock });
    runtime._commit("run_started", { runClass, reviewOnly }, state);
    atomicJson(path.join(root, ".panel", "current-run.json"), { runId: id });
    return runtime;
  }

  static open({ projectRoot, runId, clock = () => new Date() }) {
    const root = path.resolve(projectRoot || process.cwd());
    const id = runId || readJsonStrict(path.join(root, ".panel", "current-run.json")).runId;
    assertRunId(id);
    return new HarnessRuntime({ projectRoot: root, runId: id, clock });
  }

  constructor({ projectRoot, runId, clock }) {
    this.projectRoot = projectRoot;
    this.runId = runId;
    this.clock = clock;
    this.runDir = path.join(projectRoot, ".panel", "runs", runId);
    this.statePath = path.join(this.runDir, "state.json");
    this.eventsPath = path.join(this.runDir, "events.jsonl");
  }

  status() {
    return this._loadVerified().state;
  }

  events() {
    return this._loadVerified().events;
  }

  advance({ phase, artifacts = [], permitId = null, metadata = {} }) {
    return this._withLock(() => this._advance({ phase, artifacts, permitId, metadata }));
  }

  _advance({ phase, artifacts = [], permitId = null, metadata = {} }) {
    const { state } = this._loadVerified();
    this._assertActive(state);
    if (phase !== state.currentPhase) {
      throw new HarnessError("PHASE_ORDER", `Expected ${state.currentPhase}; received ${phase}.`);
    }
    if (phase === "complete") throw new HarnessError("RUN_COMPLETE", "Run is already at its terminal phase.");

    const required = phase === "report" && state.runClass === "lite"
      ? ["panel-report/report.md"]
      : PHASE_ARTIFACTS[phase] || [];
    const supplied = new Set([...required, ...artifacts]);
    const admitted = { ...state.admittedArtifacts };
    for (const relative of supplied) {
      const absolute = projectArtifactPath(this.projectRoot, relative);
      if (!existsSync(absolute)) {
        throw new HarnessError("ARTIFACT_MISSING", `${phase} requires ${relative}.`);
      }
      assertArtifactProvenance({ absolute, relative, runId: this.runId });
      admitted[relative] = { phase, sha256: hashPath(absolute) };
    }

    let activePermit = state.activePermit;
    if (phase === "implement") {
      if (!permitId) throw new HarnessError("PERMIT_REQUIRED", "Implementation requires a write permit.");
      if (state.activePermit !== permitId) throw new HarnessError("PERMIT_INVALID", "Permit is not active for this run.");
      const permit = this._readPermit(permitId);
      if (permit.usedAt || permit.runId !== this.runId) throw new HarnessError("PERMIT_INVALID", "Write permit is used or belongs to another run.");
      permit.usedAt = this.clock().toISOString();
      atomicJson(path.join(this.runDir, "permits", `${permitId}.json`), permit);
      activePermit = null;
    }

    if (phase === "learn" || (phase === "report" && state.runClass === "lite")) {
      const validation = validateProject({ dir: this.projectRoot, quiet: true });
      if (!validation.ok) {
        const codes = validation.issues.filter((item) => item.level === "error").map((item) => item.code);
        throw new HarnessError("VALIDATION_FAILED", `Panel validation failed: ${[...new Set(codes)].join(", ")}`);
      }
    }

    const nextIndex = state.phaseIndex + 1;
    const nextPhase = state.pipeline[nextIndex];
    const nextState = {
      ...state,
      admittedArtifacts: admitted,
      activePermit,
      phaseIndex: nextIndex,
      currentPhase: nextPhase,
      status: nextPhase === "complete" ? "complete" : "active",
    };
    this._commit("phase_completed", { phase, artifacts: [...supplied], metadata }, nextState);
    return nextState;
  }

  authorize({ action, approvals, consensusDecision }) {
    return this._withLock(() => this._authorize({ action, approvals, consensusDecision }));
  }

  _authorize({ action, approvals, consensusDecision }) {
    const { state } = this._loadVerified();
    this._assertActive(state);
    if (state.currentPhase !== "implement") {
      throw new HarnessError("AUTHORIZE_PHASE", `Write permits can only be issued in implement; current phase is ${state.currentPhase}.`);
    }
    if (consensusDecision !== "PROCEED") {
      throw new HarnessError("CONSENSUS_REQUIRED", "Write permit requires consensus PROCEED.");
    }
    const gate = missingApprovers(action, approvals);
    if (gate.unknown) throw new HarnessError("ACTION_UNKNOWN", `No approval gate is registered for ${action}.`);
    if (!Array.isArray(approvals) || approvals.some((approval) => !approval.evidence?.trim())) {
      throw new HarnessError("APPROVAL_EVIDENCE_MISSING", "Every approval must cite a panel-report artifact and section.");
    }
    for (const approval of approvals) {
      const [evidencePath, anchor] = approval.evidence.split("#", 2);
      if (!evidencePath.startsWith("panel-report/") || !anchor?.trim()) {
        throw new HarnessError("APPROVAL_EVIDENCE_INVALID", `Approval evidence must use panel-report/path#section: ${approval.role}.`);
      }
      const absolute = projectArtifactPath(this.projectRoot, evidencePath);
      if (!existsSync(absolute)) {
        throw new HarnessError("APPROVAL_EVIDENCE_INVALID", `Approval evidence does not exist: ${evidencePath}.`);
      }
      if (!anchorExists(absolute, anchor)) {
        throw new HarnessError("APPROVAL_EVIDENCE_INVALID", `Approval section does not exist: ${approval.evidence}.`);
      }
    }
    if (gate.missing.length) throw new HarnessError("APPROVALS_MISSING", `Missing approvals: ${gate.missing.join(", ")}.`);

    const permit = {
      schemaVersion: 1,
      permitId: randomUUID(),
      runId: this.runId,
      action,
      approvals,
      issuedAt: this.clock().toISOString(),
      usedAt: null,
    };
    atomicJson(path.join(this.runDir, "permits", `${permit.permitId}.json`), permit);
    const nextState = { ...state, activePermit: permit.permitId };
    this._commit("write_authorized", { permitId: permit.permitId, action, approvals }, nextState);
    return permit;
  }

  block(reason) {
    return this._withLock(() => this._block(reason));
  }

  _block(reason) {
    const { state } = this._loadVerified();
    this._assertActive(state);
    if (!reason?.trim()) throw new HarnessError("BLOCK_REASON_REQUIRED", "A block reason is required.");
    const nextState = { ...state, status: "blocked", blockedReason: reason.trim() };
    this._commit("run_blocked", { reason: reason.trim() }, nextState);
    return nextState;
  }

  _readPermit(permitId) {
    return readJsonStrict(path.join(this.runDir, "permits", `${permitId}.json`));
  }

  _withLock(operation) {
    const lockPath = path.join(this.runDir, "write.lock");
    let descriptor;
    try {
      descriptor = openSync(lockPath, "wx");
      writeFileSync(descriptor, `${process.pid}\n`, "utf8");
    } catch (error) {
      if (descriptor !== undefined) closeSync(descriptor);
      if (existsSync(lockPath) && error?.code !== "EEXIST") unlinkSync(lockPath);
      if (error?.code === "EEXIST") throw new HarnessError("RUN_LOCKED", "Another process is mutating this run.");
      throw error;
    }
    try {
      return operation();
    } finally {
      closeSync(descriptor);
      unlinkSync(lockPath);
    }
  }

  _assertActive(state) {
    if (state.status !== "active") throw new HarnessError("RUN_NOT_ACTIVE", `Run status is ${state.status}.`);
  }

  _loadVerified() {
    if (!existsSync(this.statePath) || !existsSync(this.eventsPath)) {
      throw new HarnessError("RUN_NOT_FOUND", `Harness run not found: ${this.runId}`);
    }
    const events = readFileSync(this.eventsPath, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse);
    let previousHash = "GENESIS";
    for (let index = 0; index < events.length; index++) {
      const event = events[index];
      if (event.sequence !== index + 1 || event.previousHash !== previousHash) {
        throw new HarnessError("EVENT_LOG_TAMPERED", `Event chain is invalid at sequence ${index + 1}.`);
      }
      const expected = eventHash({ ...event, hash: undefined });
      if (event.hash !== expected) throw new HarnessError("EVENT_LOG_TAMPERED", `Event hash is invalid at sequence ${event.sequence}.`);
      previousHash = event.hash;
    }
    const state = readJsonStrict(this.statePath);
    const last = events.at(-1);
    if (!last || stableJson(last.stateAfter) !== stableJson(state)) {
      throw new HarnessError("STATE_TAMPERED", "state.json does not match the immutable event history.");
    }
    return { state, events };
  }

  _commit(type, data, nextState) {
    const events = existsSync(this.eventsPath)
      ? readFileSync(this.eventsPath, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse)
      : [];
    const previousHash = events.at(-1)?.hash || "GENESIS";
    const sequence = events.length + 1;
    const stateAfter = { ...nextState, sequence };
    const event = {
      sequence,
      type,
      at: this.clock().toISOString(),
      previousHash,
      data,
      stateAfter,
    };
    event.hash = eventHash(event);
    mkdirSync(this.runDir, { recursive: true });
    appendFileSync(this.eventsPath, `${JSON.stringify(event)}\n`, "utf8");
    atomicJson(this.statePath, stateAfter);
  }
}

export class HarnessError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "HarnessError";
    this.code = code;
  }
}

function eventHash(event) {
  const payload = { ...event };
  delete payload.hash;
  return createHash("sha256").update(stableJson(payload)).digest("hex");
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function readJsonStrict(file) {
  if (!existsSync(file)) throw new HarnessError("FILE_MISSING", `Missing ${file}.`);
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    throw new HarnessError("JSON_INVALID", `Invalid JSON: ${file}.`);
  }
}

function atomicJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  renameSync(temporary, file);
}

function assertRunId(runId) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(runId) || runId.includes("..")) {
    throw new HarnessError("RUN_ID_INVALID", "Run ID must be 1–128 safe filename characters without `..`.");
  }
}

function projectArtifactPath(projectRoot, relative) {
  if (!relative || path.isAbsolute(relative)) {
    throw new HarnessError("ARTIFACT_PATH_INVALID", `Artifact path must be project-relative: ${relative}.`);
  }
  const root = realpathSync(projectRoot);
  const candidate = path.resolve(root, relative);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
    throw new HarnessError("ARTIFACT_PATH_INVALID", `Artifact escapes project root: ${relative}.`);
  }
  if (existsSync(candidate)) {
    const real = realpathSync(candidate);
    if (real !== root && !real.startsWith(`${root}${path.sep}`)) {
      throw new HarnessError("ARTIFACT_PATH_INVALID", `Artifact symlink escapes project root: ${relative}.`);
    }
  }
  return candidate;
}

function assertArtifactProvenance({ absolute, relative, runId }) {
  const extension = path.extname(relative).toLowerCase();
  if (new Set([".md", ".yaml", ".yml", ".txt"]).has(extension)) {
    const contents = readFileSync(absolute, "utf8");
    const escaped = runId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const stamp = new RegExp("^(?:Run|run_id|runId):\\s*[`\"']?" + escaped + "[`\"']?\\s*$", "m");
    if (stamp.test(contents)) return;
  } else if (extension === ".json") {
    try {
      const document = JSON.parse(readFileSync(absolute, "utf8"));
      if (document?.runId === runId || document?.run_id === runId) return;
    } catch {
      // The format validator reports malformed JSON separately; provenance still fails closed.
    }
  } else {
    const sidecar = `${absolute}.provenance.json`;
    if (existsSync(sidecar)) {
      try {
        const provenance = JSON.parse(readFileSync(sidecar, "utf8"));
        if (provenance.runId === runId && provenance.sha256 === hashPath(absolute)) return;
      } catch {
        // Fall through to the provenance error below.
      }
    }
  }
  throw new HarnessError(
    "ARTIFACT_PROVENANCE_INVALID",
    `${relative} is not stamped for active run ${runId}.`
  );
}

function anchorExists(file, anchor) {
  const expected = anchor.trim().toLowerCase();
  const contents = readFileSync(file, "utf8");
  if (contents.includes(`id="${anchor}"`) || contents.includes(`id='${anchor}'`)) return true;
  return [...contents.matchAll(/^#{1,6}\s+(.+)$/gm)].some((match) => markdownSlug(match[1]) === expected);
}

function markdownSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
