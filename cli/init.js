import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Package root (repo root when developing; node_modules/@tysongreenan/panel when published) */
export const PACKAGE_ROOT = path.resolve(__dirname, "..");

/** Always installed — thin core (locked structure) */
const ROOT_SKILLS_LEAN = [
  "PANEL.md",
  "playbook.md",
  "ANTI-SLOP.md",
  "MOTION.md",
  "COPY.md",
  "PRODUCT.md",
  "EMPATHY.md",
  "JOURNEY.md",
  "REPORT.md",
];

/** Optional companion for design-system work — only with --full */
const ROOT_SKILLS_FULL_EXTRA = [
  "PANEL.full.md",
  "FRONTEND.md",
  "DESIGN.md",
  "DESIGN-SYSTEM.md",
];

/** Deep packs only with --full */
const SKILL_PACKS = [
  "ui-ux-pro-max",
  "motion",
  "stop-slop-prose",
  "marketing-copy",
  "design-md",
];

const REQUIRED_DOCS = [
  "crew-isa.md",
  "design-calibration.md",
  "findings.schema.json",
  "findings.template.json",
  "harness.md",
  "hypotheses.template.md",
  "learning.template.md",
  "personas.md",
  "run-state.template.yaml",
  "skills-audit.md",
  "verification.template.md",
];

/**
 * Onboard Panel into a project.
 * Default is lean (thin skills + agent wiring). Pass full: true for deep packs.
 * @param {{
 *   dir?: string,
 *   full?: boolean,
 *   lite?: boolean,
 *   force?: boolean,
 *   cursor?: boolean,
 *   claude?: boolean,
 *   dryRun?: boolean,
 *   upgrade?: boolean,
 *   packageVersion?: string,
 * }} opts
 */
export async function initProject(opts = {}) {
  const target = path.resolve(opts.dir || process.cwd());
  const upgrade = Boolean(opts.upgrade);
  const force = Boolean(opts.force || upgrade);
  const dryRun = Boolean(opts.dryRun);
  const packageVersion = opts.packageVersion || "unknown";
  // Default: lean. --full installs packs. --lite is accepted as alias for lean (legacy).
  const manifest = readManifest(target);
  const inferredFull = manifest?.mode === "full" || isFullInstall(target);
  const full = opts.lite === true ? false : opts.full === true || (upgrade && inferredFull);
  const wantCursor = opts.cursor !== false;
  const wantClaude = opts.claude !== false;

  const log = [];

  console.log("");
  console.log(`  Panel ${upgrade ? "upgrade" : "onboarding"}`);
  console.log("  ────────────────");
  console.log(`  Target: ${target}`);
  console.log(
    `  Mode:   ${full ? "full (thin skills + deep packs)" : "lean (thin skills only)"}`
  );
  if (dryRun) console.log("  Dry run — no files will be written");
  const backupRoot = upgrade
    ? path.join(target, ".panel", "backups", backupStamp())
    : null;
  console.log("");

  if (!existsSync(target)) {
    if (!dryRun) mkdirSync(target, { recursive: true });
  }

  // 1) Thin skill entry files (always)
  console.log("  → Core skills");
  for (const name of ROOT_SKILLS_LEAN) {
    const src = path.join(PACKAGE_ROOT, name);
    const dest = path.join(target, name);
    if (!existsSync(src)) {
      console.warn(`    ! missing in package: ${name}`);
      continue;
    }
    const r = copyOne(src, dest, { force, dryRun, upgrade, backupRoot, target, manifest });
    log.push(r);
    console.log(`    ${r.status.padEnd(8)} ${name}`);
  }

  // 2) Optional FRONTEND.md (design-system path; only with --full)
  if (full) {
    console.log("  → Optional design-system entry");
    for (const name of ROOT_SKILLS_FULL_EXTRA) {
      const src = path.join(PACKAGE_ROOT, name);
      const dest = path.join(target, name);
      if (!existsSync(src)) {
        console.warn(`    ! missing in package: ${name}`);
        continue;
      }
      const r = copyOne(src, dest, { force, dryRun, upgrade, backupRoot, target, manifest });
      log.push(r);
      console.log(`    ${r.status.padEnd(8)} ${name}`);
    }
  }

  // 3) Deep packs
  if (full) {
    console.log("  → Deep packs (ui-ux-pro-max, motion, prose)");
    for (const pack of SKILL_PACKS) {
      const src = path.join(PACKAGE_ROOT, "skills", pack);
      const dest = path.join(target, "skills", pack);
      if (!existsSync(src)) {
        console.warn(`    ! missing pack: skills/${pack}`);
        continue;
      }
      const r = copyDir(src, dest, { force, dryRun, upgrade, backupRoot, target, manifest });
      log.push(r);
      console.log(`    ${r.status.padEnd(8)} skills/${pack}/`);
    }
    const readmeSrc = path.join(PACKAGE_ROOT, "skills", "README.md");
    if (existsSync(readmeSrc)) {
      const dest = path.join(target, "skills", "README.md");
      if (!dryRun) mkdirSync(path.dirname(dest), { recursive: true });
      const r = copyOne(readmeSrc, dest, { force, dryRun, upgrade, backupRoot, target, manifest });
      log.push(r);
      console.log(`    ${r.status.padEnd(8)} skills/README.md`);
    }
  } else {
    console.log("  → Skipping deep packs (use --full for ui-ux-pro-max, motion, prose)");
  }

  // 4) Cursor wiring
  if (wantCursor) {
    console.log("  → Cursor (rules + command)");
    const ruleDest = path.join(target, ".cursor", "rules", "panel.mdc");
    const cmdDest = path.join(target, ".cursor", "commands", "panel.md");
    const fullCmdDest = path.join(target, ".cursor", "commands", "panel-full.md");
    log.push(writeText(ruleDest, cursorRuleContent({ full }), { force, dryRun, upgrade, backupRoot, target, manifest }));
    log.push(writeText(cmdDest, cursorCommandContent(), { force, dryRun, upgrade, backupRoot, target, manifest }));
    log.push(writeText(fullCmdDest, fullAuditCommandContent(), { force, dryRun, upgrade, backupRoot, target, manifest }));
    console.log(`    ${log.at(-3).status.padEnd(8)} .cursor/rules/panel.mdc`);
    console.log(`    ${log.at(-2).status.padEnd(8)} .cursor/commands/panel.md`);
    console.log(`    ${log.at(-1).status.padEnd(8)} .cursor/commands/panel-full.md`);
  }

  // 5) Claude Code wiring
  if (wantClaude) {
    console.log("  → Claude Code skill");
    const skillDest = path.join(
      target,
      ".claude",
      "skills",
      "panel",
      "SKILL.md"
    );
    log.push(writeText(skillDest, claudeSkillContent({ full }), { force, dryRun, upgrade, backupRoot, target, manifest }));
    console.log(`    ${log.at(-1).status.padEnd(8)} .claude/skills/panel/SKILL.md`);
    const commandDest = path.join(target, ".claude", "commands", "panel-full.md");
    log.push(writeText(commandDest, fullAuditCommandContent(), { force, dryRun, upgrade, backupRoot, target, manifest }));
    console.log(`    ${log.at(-1).status.padEnd(8)} .claude/commands/panel-full.md`);
  }

  // 6) Onboarding note
  const onboardDest = path.join(target, "ONBOARDING.md");
  log.push(
    writeText(onboardDest, onboardReadmeContent({ full }), { force, dryRun, upgrade, backupRoot, target, manifest })
  );
  console.log(`  → ${log.at(-1).status.padEnd(8)} ONBOARDING.md (how to run)`);

  // 7) Report folder + shared run-state template
  const reportDir = path.join(target, "panel-report");
  if (!dryRun) mkdirSync(reportDir, { recursive: true });
  const keep = path.join(reportDir, ".gitkeep");
  if (!dryRun && !existsSync(keep)) writeFileSync(keep, "");
  console.log("  →         panel-report/");

  console.log("  → Protocol docs");
  for (const name of REQUIRED_DOCS) {
    const src = path.join(PACKAGE_ROOT, "docs", name);
    const dest = path.join(target, "docs", name);
    if (!existsSync(src)) {
      console.warn(`    ! missing in package: docs/${name}`);
      continue;
    }
    const r = copyOne(src, dest, { force, dryRun, upgrade, backupRoot, target, manifest });
    log.push(r);
    console.log(`    ${r.status.padEnd(8)} docs/${name}`);
  }

  const runStateSrc = path.join(PACKAGE_ROOT, "docs", "run-state.template.yaml");
  if (existsSync(runStateSrc)) {
    const runStateDest = path.join(reportDir, "run-state.template.yaml");
    const r = copyOne(runStateSrc, runStateDest, { force, dryRun, upgrade, backupRoot, target, manifest });
    log.push(r);
    console.log(`  → ${r.status.padEnd(8)} panel-report/run-state.template.yaml`);
  }

  // Collaboration law + roster (needed for full multi-agent protocol)
  for (const name of ["AGENTS.md", "COLLABORATION.md"]) {
    const src = path.join(PACKAGE_ROOT, name);
    if (!existsSync(src)) continue;
    const dest = path.join(target, name);
    const r = copyOne(src, dest, { force, dryRun, upgrade, backupRoot, target, manifest });
    log.push(r);
    console.log(`  → ${r.status.padEnd(8)} ${name}`);
  }

  const written = log.filter((x) => x.status === "wrote").length;
  const skipped = log.filter((x) => x.status === "skip").length;
  const would = log.filter((x) => x.status === "would").length;
  const backedUp = log.filter((x) => x.backedUp).length;

  if (!dryRun && (upgrade || skipped === 0)) {
    writeManifest(target, { version: packageVersion, mode: full ? "full" : "lean" }, log);
    writePanelGitignore(target);
  }

  console.log("");
  console.log("  ────────────────");
  console.log(
    dryRun
      ? `  Dry run: ${would} would write, ${skipped} skip`
      : `  Done: ${written} written, ${skipped} skipped (already existed)`
  );
  if (upgrade && backedUp > 0) {
    console.log(`  Backup: ${path.relative(target, backupRoot)} (${backedUp} changed paths)`);
  }
  console.log("");
  console.log("  Next steps");
  console.log("  1. Open this project in Cursor or Claude Code");
  console.log("  2. Run a review:");
  console.log("");
  console.log("       Run a panel");
  console.log("       Do a Panel review");
  if (wantCursor) {
    console.log("");
    console.log("     Cursor: type /panel  (custom command)");
  }
  if (wantClaude) {
    console.log(
      "     Claude Code: invoke the panel skill, or say Run a panel"
    );
  }
  if (!full) {
    console.log("");
    console.log("  Deep packs later:");
    console.log(
      `    npx @tysongreenan/panel${upgrade ? "@latest upgrade" : " init"} --full`
    );
  }
  console.log("");
  console.log("  Load map: PANEL + playbook · craft → ANTI-SLOP · motion → MOTION · sell → COPY (Isa)");
  console.log("  Docs: ONBOARDING.md · PANEL.md · docs/crew-isa.md");
  console.log("");

  return { ok: true, log, target, full };
}

function copyOne(src, dest, options) {
  const { force, dryRun } = options;
  if (existsSync(dest) && !force) {
    return { status: "skip", dest };
  }
  if (dryRun) return { status: "would", dest };
  const backedUp = backupChanged(dest, options);
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return { status: "wrote", dest, backedUp };
}

function copyDir(src, dest, options) {
  const { force, dryRun } = options;
  if (existsSync(dest) && !force) {
    return { status: "skip", dest };
  }
  if (dryRun) return { status: "would", dest };
  const backedUp = backupChanged(dest, options);
  mkdirSync(path.dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true, force: true });
  return { status: "wrote", dest, backedUp };
}

function writeText(dest, body, options) {
  const { force, dryRun } = options;
  if (existsSync(dest) && !force) {
    return { status: "skip", dest };
  }
  if (dryRun) return { status: "would", dest };
  const backedUp = backupChanged(dest, options);
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, body, "utf8");
  return { status: "wrote", dest, backedUp };
}

function backupChanged(dest, { upgrade, backupRoot, target, manifest }) {
  if (!upgrade || !existsSync(dest)) return false;
  const relative = path.relative(target, dest);
  const previousHash = manifest?.hashes?.[relative];
  const currentHash = hashPath(dest);
  if (previousHash && previousHash === currentHash) return false;
  const backupDest = path.join(backupRoot, relative);
  mkdirSync(path.dirname(backupDest), { recursive: true });
  if (statSync(dest).isDirectory()) cpSync(dest, backupDest, { recursive: true });
  else copyFileSync(dest, backupDest);
  return true;
}

function hashPath(targetPath) {
  const hash = createHash("sha256");
  if (statSync(targetPath).isDirectory()) {
    for (const file of walkFiles(targetPath)) {
      hash.update(path.relative(targetPath, file));
      hash.update(readFileSync(file));
    }
  } else {
    hash.update(readFileSync(targetPath));
  }
  return hash.digest("hex");
}

function walkFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(entryPath));
    else if (entry.isFile()) files.push(entryPath);
  }
  return files;
}

function readManifest(target) {
  const manifestPath = path.join(target, ".panel", "manifest.json");
  if (!existsSync(manifestPath)) return null;
  try {
    return JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    return null;
  }
}

function writeManifest(target, details, log) {
  const hashes = {};
  for (const item of log) {
    if (!item.dest || !existsSync(item.dest)) continue;
    hashes[path.relative(target, item.dest)] = hashPath(item.dest);
  }
  const manifestPath = path.join(target, ".panel", "manifest.json");
  mkdirSync(path.dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, `${JSON.stringify({ ...details, installedAt: new Date().toISOString(), hashes }, null, 2)}\n`, "utf8");
}

function writePanelGitignore(target) {
  const gitignorePath = path.join(target, ".panel", ".gitignore");
  if (!existsSync(gitignorePath)) writeFileSync(gitignorePath, "backups/\n", "utf8");
}

function isFullInstall(target) {
  return existsSync(path.join(target, "FRONTEND.md")) || existsSync(path.join(target, "skills", "ui-ux-pro-max"));
}

function backupStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function cursorRuleContent({ full }) {
  return `---
description: Panel — buyer-level UX review, craft, motion
globs:
alwaysApply: false
---

# Panel

**Lean core always on. Heavy packs optional. Reduction over addition.**

1. \`PANEL.md\` is source of truth (buyer job + reduction bias).
2. Load \`playbook.md\` with every panel run.
3. UI / craft → + \`ANTI-SLOP.md\`. Motion → + \`MOTION.md\`.
4. Marketing / StoryBrand / sell / product demo → + \`COPY.md\` (Isa)${full ? " + \`skills/marketing-copy\`" : " (deep pack: `init --full`)"}.
5. Design system / colors / type → + \`FRONTEND.md\` + \`skills/ui-ux-pro-max\` only${full ? "" : " (needs `npx @tysongreenan/panel init --full`)"}.
6. Prefer delete / merge / cut. Preserve install / primary CTA.

## Load map

| User says | Load |
|-----------|------|
| Run a panel / Panel review | \`PANEL.md\` + \`playbook.md\` |
| UI / craft / anti-slop | + \`ANTI-SLOP.md\` |
| Animations / motion | + \`MOTION.md\` |
| Marketing / landing / StoryBrand | + \`COPY.md\` (Isa) |
| Design system / colors / type | + \`FRONTEND.md\` + \`skills/ui-ux-pro-max\` |

## Priority of truth

1. PANEL · 2. ANTI-SLOP · 3. MOTION · 4. playbook · 5. COPY (marketing) · 6. heavy packs (only when needed)
`;
}

function cursorCommandContent() {
  return `---
description: Run a Panel buyer-level UX review on this project
---

Run a Panel review on this codebase.

1. Follow \`PANEL.md\` (reduction bias, density-first). Use \`playbook.md\`.
2. Prefer cuts over additions. Do not add marketing text to “fix” density.
3. Craft issues → \`ANTI-SLOP.md\`. Motion → \`MOTION.md\`.
4. Marketing / landing sell → seat **Isa** with \`COPY.md\` (+ \`skills/marketing-copy\` if present).
5. Do not load \`FRONTEND.md\` or \`skills/ui-ux-pro-max\` unless design-system work is in scope.
6. Preserve install / primary CTA. Report to \`panel-report/report.md\`.

If the user named a URL or path, focus there. Otherwise review the main app/UI entrypoints.
`;
}

function fullAuditCommandContent() {
  return `---
description: Run the complete Panel harness audit across every user-facing page
---

Run a **full Panel review** of every user-facing page using the npm execution harness.

1. Start a managed \`full\` run and follow the authoritative phase order in \`.panel/runs/<run-id>/state.json\`.
2. Audit desktop and mobile for product promise, persona journeys, UX heuristics, visual craft, copy, motion, accessibility, interaction states, and design-system consistency.
3. Load every in-scope specialist skill and record skill-use proof. If an active Impeccable skill is installed, read its version; use only major version 4, run its context script for the concrete surface, choose \`Persuade | Operate | Read | Experience\`, load one owning playbook (or \`reference/new-work.md\`), and load \`reference/craft-floor.md\` immediately before UI edits. Treat it as advisory to Panel and \`DESIGN.md\`; skip stale or missing installs without blocking the run.
4. Write every required seat artifact plus \`hypotheses.md\`, \`findings.json\`, and \`learning.md\` under \`panel-report/\` with active-run provenance.
5. Cross-critique material findings. Every challenge must mutate, reject, or uphold a hypothesis with evidence.
6. Inspect the running product in a real browser. Capture applicable states and desktop/mobile evidence; never substitute source review for rendered proof. For Impeccable-guided work, keep visual iteration bounded to one batched inspection/fix pass and at most one confirmation pass.
7. Produce a deduplicated, prioritized fix plan with concrete surfaces, persona impact, acceptance checks, owners, and evidence.
8. Do **not** modify product code until consensus is \`PROCEED\`, all required approvals are recorded, and the harness issues a registered write permit.
9. If implementation is requested after consensus, use one executor, consume the permit, verify fixes in the browser, run \`panel validate\`, and close the learning loop.

If any required page, browser, persona, design-system source, artifact, approval, or evidence is unavailable, record the exact blocker instead of claiming the run passed.
`;
}

function claudeSkillContent({ full }) {
  return `---
name: panel
description: >
  Buyer-level UX review (Panel). Use when the user says Run a panel,
  Panel review, UX review, anti-slop, or motion critic.
---

# Panel

**Lean core always on. Heavy packs optional. Reduction over addition.**

1. **Source of truth:** \`PANEL.md\` + \`playbook.md\`
2. UI / craft → + \`ANTI-SLOP.md\` · Motion → + \`MOTION.md\`
3. Marketing / StoryBrand / sell → + \`COPY.md\` (Isa)${full ? " + \`skills/marketing-copy/\`" : ""}
4. Design system / colors / type → + \`FRONTEND.md\` + \`skills/ui-ux-pro-max/\`${full ? "" : " (needs `init --full`)"}
5. Priority of truth: PANEL → ANTI-SLOP → MOTION → playbook → COPY → packs
6. Delete before add. Preserve install/CTA.

## Output

\`panel-report/report.md\`
`;
}

function onboardReadmeContent({ full }) {
  return `# Panel is installed

This project was onboarded with \`npx @tysongreenan/panel init${full ? " --full" : ""}\`.

**Lean core always on. Heavy packs optional. Reduction over addition.**

## Run a review

\`\`\`
Run a panel
\`\`\`

### What to load

| User says | Load |
|-----------|------|
| Run a panel / Panel review | \`PANEL.md\` + \`playbook.md\` |
| UI / craft / anti-slop | + \`ANTI-SLOP.md\` |
| Animations / motion | + \`MOTION.md\` |
| Marketing / StoryBrand / sell | + \`COPY.md\` (Isa) |
| Design system / colors / type | + \`FRONTEND.md\` + \`skills/ui-ux-pro-max\` |

### Priority of truth

1. \`PANEL.md\` — buyer job + reduction bias  
2. \`ANTI-SLOP.md\` — does this look AI-made?  
3. \`MOTION.md\` — Emil motion standard  
4. \`playbook.md\` — shared principles  
5. \`COPY.md\` — marketing sell (Isa)  
6. Heavy packs — only when explicitly needed  

### Cursor / Claude

- Cursor: **\`/panel\`** (quick) · **\`/panel-full\`** (complete harness)
- Claude Code: **\`/panel-full\`** · \`.claude/skills/panel/\`

## Files

| Path | Role |
|------|------|
| \`PANEL.md\` | Core — always on |
| \`playbook.md\` | Don’t Make Me Think + density |
| \`ANTI-SLOP.md\` | Craft / anti-template |
| \`MOTION.md\` | Motion (when anything moves) |
| \`COPY.md\` | Isa — marketing / StoryBrand / product-show |
| \`PRODUCT.md\` / \`EMPATHY.md\` / \`JOURNEY.md\` / \`REPORT.md\` | Specialist seats |
${
  full
    ? `| \`FRONTEND.md\` | Design-system work only |
| \`skills/\` | Deep packs (ui-ux-pro-max, motion, prose, marketing-copy) |
`
    : `| *(lean)* | \`npx @tysongreenan/panel init --full\` for packs + FRONTEND + marketing-copy refs |
`
}| \`AGENTS.md\` | Roster · run classes · protocol pack |
| \`COLLABORATION.md\` | Handoffs · Approves · consensus |
| \`panel-report/\` | Reports + \`run-state.template.yaml\` |

### Full multi-agent runs

1. Copy \`panel-report/run-state.template.yaml\` → \`run-state.yaml\`  
2. Set \`run_class\` + \`protocol\`  
3. No implement without consensus **PROCEED** (see \`COLLABORATION.md\`)

### Health checks

\`npx @tysongreenan/panel doctor\` checks installation health.
\`npx @tysongreenan/panel validate\` must pass before claiming **SHIPPABLE**.

## Re-run

\`\`\`bash
npx @tysongreenan/panel@latest upgrade
npx @tysongreenan/panel@latest upgrade --full
\`\`\`

Upgrade backs up locally changed managed files under \`.panel/backups/\` before replacing them.
`;
}
