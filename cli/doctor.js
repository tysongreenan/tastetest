import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { hashPath, hasAny, issue, printDiagnostics, readJson } from "./diagnostics.js";
import { HarnessRuntime } from "./harness.js";

const CORE_FILES = [
  "PANEL.md",
  "playbook.md",
  "ANTI-SLOP.md",
  "MOTION.md",
  "COPY.md",
  "PRODUCT.md",
  "EMPATHY.md",
  "JOURNEY.md",
  "REPORT.md",
  "AGENTS.md",
  "COLLABORATION.md",
];

const REQUIRED_DOCS = [
  "docs/personas.md",
  "docs/design-calibration.md",
  "docs/hypotheses.template.md",
  "docs/learning.template.md",
  "docs/verification.template.md",
  "docs/findings.schema.json",
  "docs/findings.template.json",
  "docs/harness.md",
  "panel-report/run-state.template.yaml",
];

const FULL_FILES = [
  "PANEL.full.md",
  "FRONTEND.md",
  "DESIGN.md",
  "DESIGN-SYSTEM.md",
  "skills/ui-ux-pro-max",
  "skills/motion",
  "skills/stop-slop-prose",
  "skills/marketing-copy",
  "skills/design-md",
];

export function doctorProject({ dir, packageVersion, json = false }) {
  const target = path.resolve(dir || process.cwd());
  const issues = [];
  if (!existsSync(target)) {
    issues.push(issue("error", "PROJECT_MISSING", `Project directory does not exist: ${target}`));
    const summary = printDiagnostics("Panel doctor", target, issues, { json });
    return { ok: false, issues, summary };
  }

  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (nodeMajor < 18) {
    issues.push(issue("error", "NODE_UNSUPPORTED", `Node ${process.versions.node} is unsupported; Panel requires Node 18+.`));
  } else {
    issues.push(issue("pass", "NODE_SUPPORTED", `Node ${process.versions.node} satisfies the Node 18+ requirement.`));
  }

  const manifestPath = path.join(target, ".panel", "manifest.json");
  const manifest = readJson(manifestPath);
  if (!manifest) {
    issues.push(
      issue(
        "warning",
        "MANIFEST_MISSING",
        "No valid .panel/manifest.json; install version and local modifications cannot be verified.",
        "npx @tysongreenan/panel@latest upgrade"
      )
    );
  } else if (manifest.version !== packageVersion) {
    issues.push(
      issue(
        "warning",
        "VERSION_STALE",
        `Project has Panel ${manifest.version}; this CLI is ${packageVersion}.`,
        "npx @tysongreenan/panel@latest upgrade"
      )
    );
  } else {
    issues.push(issue("pass", "VERSION_CURRENT", `Panel ${packageVersion} is recorded.`));
  }

  checkPaths(target, CORE_FILES, "CORE_FILE_MISSING", issues);
  checkPaths(target, REQUIRED_DOCS, "PROTOCOL_FILE_MISSING", issues);

  const full = manifest?.mode === "full" || hasAny(target, ["FRONTEND.md", "skills/ui-ux-pro-max"]);
  if (full) checkPaths(target, FULL_FILES, "FULL_PACK_INCOMPLETE", issues);
  else issues.push(issue("pass", "PACK_LEAN", "Lean pack detected; full-only files are not required."));

  if (manifest?.hashes) {
    const modified = [];
    const missing = [];
    for (const [relative, expectedHash] of Object.entries(manifest.hashes)) {
      const destination = path.join(target, relative);
      if (!existsSync(destination)) missing.push(relative);
      else if (hashPath(destination) !== expectedHash) modified.push(relative);
    }
    if (missing.length) {
      issues.push(
        issue(
          "error",
          "MANAGED_FILES_DELETED",
          `${missing.length} managed paths are missing: ${missing.slice(0, 4).join(", ")}${missing.length > 4 ? "…" : ""}`,
          "npx @tysongreenan/panel@latest upgrade"
        )
      );
    }
    if (modified.length) {
      issues.push(
        issue(
          "warning",
          "LOCAL_CUSTOMIZATIONS",
          `${modified.length} managed paths differ from the installed version: ${modified.slice(0, 4).join(", ")}${modified.length > 4 ? "…" : ""}`,
          "Run upgrade --dry-run; upgrade will back these up before replacing them."
        )
      );
    } else if (!missing.length) {
      issues.push(issue("pass", "MANAGED_FILES_INTACT", "Managed Panel files match the install manifest."));
    }
  }

  const runState = path.join(target, "panel-report", "run-state.yaml");
  if (existsSync(runState)) {
    const text = readFileSync(runState, "utf8");
    for (const key of ["preflight:", "protocol:", "run_class:", "artifacts:"]) {
      if (!text.includes(key)) {
        issues.push(issue("error", "RUN_STATE_MALFORMED", `run-state.yaml is missing ${key.slice(0, -1)}.`));
      }
    }
    if (!issues.some((item) => item.code === "RUN_STATE_MALFORMED")) {
      issues.push(issue("pass", "RUN_STATE_READABLE", "panel-report/run-state.yaml has the core fields."));
    }
  } else {
    issues.push(
      issue(
        "warning",
        "RUN_STATE_NOT_STARTED",
        "No active panel-report/run-state.yaml. This is expected before the first run.",
        "Copy panel-report/run-state.template.yaml to panel-report/run-state.yaml when starting a run."
      )
    );
  }

  const browserReady = hasAny(target, [
    "node_modules/.bin/playwright",
    "node_modules/@playwright/test",
    ".playwright-mcp",
  ]);
  issues.push(
    browserReady
      ? issue("pass", "BROWSER_TOOLING_FOUND", "Local browser verification tooling was detected.")
      : issue(
          "warning",
          "BROWSER_TOOLING_UNCONFIRMED",
          "No local Playwright installation was detected. In-app browser tooling may still satisfy verification.",
          "Confirm a real browser is available before an implement run."
        )
  );

  const currentRunPath = path.join(target, ".panel", "current-run.json");
  if (existsSync(currentRunPath)) {
    try {
      const runtime = HarnessRuntime.open({ projectRoot: target });
      const harnessState = runtime.status();
      issues.push(issue("pass", "HARNESS_RUN_INTACT", `Harness run ${harnessState.runId} is ${harnessState.status} at ${harnessState.currentPhase}.`));
      if (existsSync(path.join(target, ".panel", "runs", harnessState.runId, "write.lock"))) {
        issues.push(
          issue(
            "warning",
            "HARNESS_RUN_LOCKED",
            `Harness run ${harnessState.runId} has a writer lock.`,
            "Confirm no Panel process is active before removing a stale write.lock."
          )
        );
      }
    } catch (error) {
      issues.push(issue("error", "HARNESS_RUN_INVALID", error.message, "Restore the run from trusted artifacts or start a new run ID."));
    }
  }

  const summary = printDiagnostics("Panel doctor", target, issues, { json });
  return { ok: summary.errors === 0, issues, summary };
}

function checkPaths(target, paths, code, issues) {
  const missing = paths.filter((entry) => !existsSync(path.join(target, entry)));
  if (missing.length) {
    issues.push(
      issue(
        "error",
        code,
        `Missing required paths: ${missing.join(", ")}`,
        "npx @tysongreenan/panel@latest upgrade"
      )
    );
  } else {
    issues.push(issue("pass", `${code}_NONE`, `${paths.length} required paths are present.`));
  }
}
