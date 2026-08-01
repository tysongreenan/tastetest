import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { issue, printDiagnostics, readJson } from "./diagnostics.js";

const SEVERITIES = new Set(["Block", "P0", "P1", "P2"]);
const CONFIDENCE = new Set(["observed", "strong-inference", "speculative"]);
const STATUSES = new Set(["open", "approved", "implemented", "verified", "deferred", "rejected"]);
const EVIDENCE_TYPES = new Set(["browser", "file", "user-data", "analytics", "test"]);

export function validateProject({ dir, json = false, quiet = false }) {
  const target = path.resolve(dir || process.cwd());
  const issues = [];
  const runStatePath = path.join(target, "panel-report", "run-state.yaml");
  if (!existsSync(runStatePath)) {
    issues.push(
      issue(
        "error",
        "RUN_STATE_MISSING",
        "panel-report/run-state.yaml does not exist.",
        "Start from panel-report/run-state.template.yaml."
      )
    );
    return finish(target, issues, json, quiet);
  }

  const state = readFileSync(runStatePath, "utf8");
  const runClass = topScalar(state, "run_class");
  if (!new Set(["lite", "standard", "full", "implement"]).has(runClass)) {
    issues.push(issue("error", "RUN_CLASS_INVALID", `Invalid or missing run_class: ${runClass || "null"}.`));
  } else {
    issues.push(issue("pass", "RUN_CLASS_VALID", `Run class is ${runClass}.`));
  }

  const preflight = topScalar(state, "preflight");
  if (!new Set(["GO", "NO-GO", "lite"]).has(preflight)) {
    issues.push(issue("error", "PREFLIGHT_INVALID", `Invalid or missing preflight: ${preflight || "null"}.`));
  }

  if (preflight === "NO-GO") {
    requirePath(target, "panel-report/report.md", "NO_GO_REPORT_MISSING", issues);
    if (topScalar(state, "delivery_status") === "SHIPPABLE") {
      issues.push(issue("error", "NO_GO_MARKED_SHIPPABLE", "A NO-GO preflight cannot be SHIPPABLE."));
    }
    return finish(target, issues, json, quiet);
  }

  if (runClass === "lite") {
    requirePath(target, "panel-report/report.md", "LITE_REPORT_MISSING", issues);
    return finish(target, issues, json, quiet);
  }

  for (const file of [
    "panel-report/report.md",
    "panel-report/process-score.md",
    "panel-report/hypotheses.md",
    "panel-report/learning.md",
    "panel-report/findings.json",
  ]) {
    requirePath(target, file, "REQUIRED_ARTIFACT_MISSING", issues);
  }

  const processScorePath = path.join(target, "panel-report", "process-score.md");
  if (existsSync(processScorePath) && /(?:\|\s*no\s*\||:\s*no\b)/i.test(readFileSync(processScorePath, "utf8"))) {
    issues.push(issue("error", "PROCESS_SCORE_FAILED", "process-score.md contains one or more `no` results."));
  }

  validateSeatEvidence(target, state, issues);
  validateFeedbackLoop(target, state, issues);
  validateFindings(target, issues);

  const delivery = topScalar(state, "delivery_status");
  if (delivery === "SHIPPABLE") validateShippable(target, state, issues);
  else if (runClass === "implement" && !new Set(["IMPLEMENTED", "REVISE", "BLOCKED"]).has(delivery)) {
    issues.push(issue("error", "DELIVERY_STATUS_INVALID", `Implement run has invalid delivery_status: ${delivery || "null"}.`));
  }

  return finish(target, issues, json, quiet);
}

function validateSeatEvidence(target, state, issues) {
  const skillBlock = section(state, "skills_used");
  const artifactBlock = section(state, "artifact_checks");
  const skillSeats = matches(skillBlock, /^\s*-\s+seat:\s*(.+)$/gm);
  const requiredArtifacts = matches(artifactBlock, /^\s+required:\s*(.+)$/gm);
  const presentChecks = matches(artifactBlock, /^\s+present:\s*(.+)$/gm);

  if (!skillSeats.length) {
    issues.push(issue("error", "SKILL_PROOF_MISSING", "No in-scope seat entries were recorded under skills_used."));
  } else if (!/\n\s+hook:\s*[^\s#]/.test(skillBlock) || !/\n\s+artifact:\s*[^\s#]/.test(skillBlock)) {
    issues.push(issue("error", "SKILL_PROOF_INCOMPLETE", "skills_used entries must include a hook and artifact."));
  } else {
    issues.push(issue("pass", "SKILL_PROOF_PRESENT", `${skillSeats.length} skill-use entries recorded.`));
  }

  if (!requiredArtifacts.length) {
    issues.push(issue("error", "ARTIFACT_CHECKS_MISSING", "No required seat artifacts were recorded under artifact_checks."));
  }
  requiredArtifacts.forEach((relative, index) => {
    const clean = unquote(relative);
    if (!existsSync(path.join(target, clean))) {
      issues.push(issue("error", "SEAT_ARTIFACT_MISSING", `Required seat artifact is missing: ${clean}.`));
    }
    if (presentChecks[index] && unquote(presentChecks[index]) !== "true") {
      issues.push(issue("error", "SEAT_ARTIFACT_UNCONFIRMED", `Artifact check is not present=true: ${clean}.`));
    }
  });
}

function validateFeedbackLoop(target, state, issues) {
  const hypothesisStatus = nestedScalar(state, "hypotheses", "status");
  const learningStatus = nestedScalar(state, "learning", "status");
  const hypothesesPath = path.join(target, "panel-report", "hypotheses.md");
  if (!new Set(["cross-critiqued", "approved", "measured", "n/a"]).has(hypothesisStatus)) {
    issues.push(issue("error", "HYPOTHESES_NOT_READY", `Hypothesis status is ${hypothesisStatus || "null"}; cross-critique is required.`));
  }
  if (existsSync(hypothesesPath) && hypothesisStatus !== "n/a") {
    const hypotheses = readFileSync(hypothesesPath, "utf8");
    if (!/\bH-\d{3,}\b/.test(hypotheses)) {
      issues.push(issue("error", "HYPOTHESIS_IDS_MISSING", "hypotheses.md has no stable H-IDs."));
    }
    if (!/mutated|rejected|upheld with new evidence/i.test(hypotheses)) {
      issues.push(issue("error", "CROSS_CRITIQUE_MISSING", "hypotheses.md has no valid cross-critique outcome."));
    }
  }
  if (learningStatus !== "closed") {
    issues.push(issue("error", "LEARNING_LOOP_OPEN", `Learning status is ${learningStatus || "null"}; expected closed.`));
  }
}

function validateFindings(target, issues) {
  const findingsPath = path.join(target, "panel-report", "findings.json");
  if (!existsSync(findingsPath)) return;
  const document = readJson(findingsPath);
  if (!document || document.schemaVersion !== "1.0" || typeof document.surface !== "string" || !document.surface.trim() || !Array.isArray(document.findings)) {
    issues.push(issue("error", "FINDINGS_DOCUMENT_INVALID", "findings.json does not match the top-level structured findings contract."));
    return;
  }
  rejectUnknownKeys(document, new Set(["schemaVersion", "runId", "surface", "findings"]), "findings document", issues);

  const ids = new Set();
  const problemKeys = new Set();
  document.findings.forEach((finding, index) => {
    const label = `findings[${index}]`;
    rejectUnknownKeys(
      finding,
      new Set(["id", "severity", "confidence", "surface", "problem", "evidence", "change", "personaImpact", "acceptanceCheck", "owner", "sourceArtifacts", "status"]),
      label,
      issues
    );
    const requiredStrings = ["id", "surface", "problem", "change", "acceptanceCheck", "owner"];
    for (const field of requiredStrings) {
      if (typeof finding?.[field] !== "string" || !finding[field].trim()) {
        issues.push(issue("error", "FINDING_FIELD_MISSING", `${label}.${field} must be a non-empty string.`));
      }
    }
    if (!/^(H|F)-\d{3,}$/.test(finding?.id || "")) {
      issues.push(issue("error", "FINDING_ID_INVALID", `${label}.id must match H-001 or F-001.`));
    } else if (ids.has(finding.id)) {
      issues.push(issue("error", "FINDING_ID_DUPLICATE", `Duplicate finding ID: ${finding.id}.`));
    } else ids.add(finding.id);
    const problemKey = `${finding?.surface || ""}::${finding?.problem || ""}`.trim().toLowerCase();
    if (problemKeys.has(problemKey)) {
      issues.push(issue("error", "FINDING_DUPLICATE", `${finding.id || label} duplicates an existing surface/problem pair.`));
    } else problemKeys.add(problemKey);
    if (!SEVERITIES.has(finding?.severity)) issues.push(issue("error", "FINDING_SEVERITY_INVALID", `${label}.severity is invalid.`));
    if (!CONFIDENCE.has(finding?.confidence)) issues.push(issue("error", "FINDING_CONFIDENCE_INVALID", `${label}.confidence is invalid.`));
    if (finding?.confidence === "speculative" && new Set(["Block", "P0"]).has(finding?.severity)) {
      issues.push(issue("error", "SPECULATION_BLOCKS_SHIP", `${finding.id} is speculative and cannot be ${finding.severity}.`));
    }
    if (!STATUSES.has(finding?.status)) issues.push(issue("error", "FINDING_STATUS_INVALID", `${label}.status is invalid.`));
    if (!Array.isArray(finding?.sourceArtifacts) || !finding.sourceArtifacts.length) {
      issues.push(issue("error", "FINDING_SOURCES_MISSING", `${label}.sourceArtifacts must be non-empty.`));
    } else {
      for (const source of finding.sourceArtifacts) {
        const sourcePath = String(source).split("#", 1)[0];
        if (!existsSync(path.join(target, sourcePath))) {
          issues.push(issue("error", "FINDING_SOURCE_NOT_FOUND", `${finding.id || label} source artifact does not exist: ${source}.`));
        }
      }
    }
    if (!Array.isArray(finding?.evidence) || !finding.evidence.length) {
      issues.push(issue("error", "FINDING_EVIDENCE_MISSING", `${label}.evidence must be non-empty.`));
    } else {
      for (const evidence of finding.evidence) {
        rejectUnknownKeys(evidence, new Set(["type", "ref", "claim"]), `${label}.evidence`, issues);
        if (!EVIDENCE_TYPES.has(evidence?.type) || !evidence?.ref || !evidence?.claim) {
          issues.push(issue("error", "FINDING_EVIDENCE_INVALID", `${label} has malformed evidence.`));
        } else if (!isExternal(evidence.ref) && !existsSync(path.join(target, String(evidence.ref).split("#", 1)[0]))) {
          issues.push(issue("error", "FINDING_EVIDENCE_NOT_FOUND", `${finding.id || label} evidence does not exist: ${evidence.ref}.`));
        }
      }
    }
    if (!finding?.personaImpact?.priority || !finding?.personaImpact?.secondary) {
      issues.push(issue("error", "FINDING_PERSONA_IMPACT_MISSING", `${label}.personaImpact must cover priority and secondary.`));
    } else {
      rejectUnknownKeys(finding.personaImpact, new Set(["priority", "secondary"]), `${label}.personaImpact`, issues);
    }
  });

  if (!issues.some((item) => item.code.startsWith("FINDING_") || item.code === "SPECULATION_BLOCKS_SHIP")) {
    issues.push(issue("pass", "FINDINGS_VALID", `${document.findings.length} structured findings validated.`));
  }
}

function validateShippable(target, state, issues) {
  const requirements = [
    [nestedScalar(state, "consensus", "decision") === "PROCEED", "CONSENSUS_NOT_PROCEED", "SHIPPABLE requires consensus PROCEED."],
    [nestedScalar(state, "verification", "verdict") === "PASS", "VERIFICATION_NOT_PASS", "SHIPPABLE requires verification PASS."],
    [nestedScalar(state, "verification", "visual_regression") === "pass", "VISUAL_REGRESSION_FAILED", "SHIPPABLE requires visual_regression: pass."],
    [nestedScalar(state, "verification", "preserve_regression") === "pass", "PRESERVE_REGRESSION_FAILED", "SHIPPABLE requires preserve_regression: pass."],
    [nestedScalar(state, "hypotheses", "status") === "measured", "HYPOTHESES_UNMEASURED", "SHIPPABLE requires measured hypotheses."],
    [nestedScalar(state, "learning", "status") === "closed", "LEARNING_NOT_CLOSED", "SHIPPABLE requires closed learning."],
    [new Set(["updated", "none"]).has(nestedScalar(state, "design_system_delta", "status")), "DESIGN_DELTA_OPEN", "SHIPPABLE requires design_system_delta updated or none."],
  ];
  for (const [pass, code, message] of requirements) {
    if (!pass) issues.push(issue("error", code, message));
  }
  if (!listHasItems(state, "verification", "desktop_evidence") || !listHasItems(state, "verification", "mobile_evidence")) {
    issues.push(issue("error", "BROWSER_EVIDENCE_MISSING", "SHIPPABLE requires desktop and mobile evidence arrays."));
  } else {
    for (const evidencePath of [
      ...listValues(state, "verification", "desktop_evidence"),
      ...listValues(state, "verification", "mobile_evidence"),
    ]) {
      if (!isExternal(evidencePath) && !existsSync(path.join(target, evidencePath))) {
        issues.push(issue("error", "BROWSER_EVIDENCE_NOT_FOUND", `Browser evidence does not exist: ${evidencePath}.`));
      }
    }
  }
  for (const stateName of [
    "default",
    "hover",
    "focus_visible",
    "active_pressed",
    "loading",
    "empty",
    "error",
    "disabled",
    "success",
    "reduced_motion",
  ]) {
    const value = nestedNestedScalar(state, "verification", "states", stateName);
    if (value === "pass") continue;
    if (/^n\/a:\s*\S/i.test(value)) continue;
    issues.push(issue("error", "STATE_COVERAGE_INCOMPLETE", `${stateName} must be pass or \"n/a: reason\" for SHIPPABLE.`));
  }
  requirePath(target, "panel-report/verification.md", "VERIFICATION_ARTIFACT_MISSING", issues);

  const document = readJson(path.join(target, "panel-report", "findings.json"));
  const blocking = document?.findings?.filter(
    (finding) => new Set(["Block", "P0"]).has(finding.severity) && !new Set(["verified", "rejected"]).has(finding.status)
  );
  if (blocking?.length) {
    issues.push(issue("error", "BLOCKING_FINDINGS_OPEN", `${blocking.length} Block/P0 findings remain unresolved.`));
  }
}

function finish(target, issues, json, quiet = false) {
  const summary = quiet
    ? {
        errors: issues.filter((item) => item.level === "error").length,
        warnings: issues.filter((item) => item.level === "warning").length,
        passes: issues.filter((item) => item.level === "pass").length,
      }
    : printDiagnostics("Panel validate", target, issues, { json });
  return { ok: summary.errors === 0, issues, summary };
}

function requirePath(target, relative, code, issues) {
  if (!existsSync(path.join(target, relative))) issues.push(issue("error", code, `Missing ${relative}.`));
}

function topScalar(text, key) {
  return unquote(text.match(new RegExp(`^${escapeRegex(key)}:\\s*([^#\\n]+)`, "m"))?.[1]?.trim() || "");
}

function nestedScalar(text, parent, key) {
  const block = section(text, parent);
  return unquote(block.match(new RegExp(`^\\s+${escapeRegex(key)}:\\s*([^#\\n]+)`, "m"))?.[1]?.trim() || "");
}

function nestedNestedScalar(text, parent, child, key) {
  const block = section(text, parent);
  const childLines = block.split(/\r?\n/);
  const start = childLines.findIndex((line) => new RegExp(`^\\s{2}${escapeRegex(child)}:`).test(line));
  if (start < 0) return "";
  for (let index = start + 1; index < childLines.length; index++) {
    if (/^\s{2}\S/.test(childLines[index])) break;
    const match = childLines[index].match(new RegExp(`^\\s{4}${escapeRegex(key)}:\\s*([^#\\n]+)`));
    if (match) return unquote(match[1].trim());
  }
  return "";
}

function section(text, key) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^${escapeRegex(key)}:`).test(line));
  if (start < 0) return "";
  const collected = [];
  for (let index = start + 1; index < lines.length; index++) {
    if (/^[A-Za-z_][A-Za-z0-9_]*:/.test(lines[index])) break;
    collected.push(lines[index]);
  }
  return collected.join("\n");
}

function listHasItems(text, parent, key) {
  return listValues(text, parent, key).length > 0;
}

function listValues(text, parent, key) {
  const block = section(text, parent);
  const inline = block.match(new RegExp(`^\\s+${escapeRegex(key)}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (inline) return inline[1].split(",").map((value) => unquote(value.trim())).filter(Boolean);
  const lines = block.split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^\\s+${escapeRegex(key)}:\\s*$`).test(line));
  if (start < 0) return [];
  const values = [];
  for (let index = start + 1; index < lines.length; index++) {
    const match = lines[index].match(/^\s+-\s+(.+)$/);
    if (!match) break;
    values.push(unquote(match[1].trim()));
  }
  return values;
}

function matches(text, regex) {
  return [...text.matchAll(regex)].map((match) => match[1].trim());
}

function unquote(value) {
  return value.replace(/^['"]|['"]$/g, "");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isExternal(value) {
  return /^[a-z]+:\/\//i.test(String(value));
}

function rejectUnknownKeys(value, allowed, label, issues) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length) {
    issues.push(issue("error", "FINDING_UNKNOWN_FIELDS", `${label} has unsupported fields: ${unknown.join(", ")}.`));
  }
}
