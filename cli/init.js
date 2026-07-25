import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
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
const ROOT_SKILLS_FULL_EXTRA = ["FRONTEND.md"];

/** Deep packs only with --full */
const SKILL_PACKS = [
  "ui-ux-pro-max",
  "motion",
  "stop-slop-prose",
  "marketing-copy",
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
 * }} opts
 */
export async function initProject(opts = {}) {
  const target = path.resolve(opts.dir || process.cwd());
  const force = Boolean(opts.force);
  const dryRun = Boolean(opts.dryRun);
  // Default: lean. --full installs packs. --lite is accepted as alias for lean (legacy).
  const full = opts.full === true && opts.lite !== true;
  const wantCursor = opts.cursor !== false;
  const wantClaude = opts.claude !== false;

  const log = [];

  console.log("");
  console.log("  Panel onboarding");
  console.log("  ────────────────");
  console.log(`  Target: ${target}`);
  console.log(
    `  Mode:   ${full ? "full (thin skills + deep packs)" : "lean (thin skills only)"}`
  );
  if (dryRun) console.log("  Dry run — no files will be written");
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
    const r = copyOne(src, dest, { force, dryRun });
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
      const r = copyOne(src, dest, { force, dryRun });
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
      const r = copyDir(src, dest, { force, dryRun });
      log.push(r);
      console.log(`    ${r.status.padEnd(8)} skills/${pack}/`);
    }
    const readmeSrc = path.join(PACKAGE_ROOT, "skills", "README.md");
    if (existsSync(readmeSrc)) {
      const dest = path.join(target, "skills", "README.md");
      if (!dryRun) mkdirSync(path.dirname(dest), { recursive: true });
      const r = copyOne(readmeSrc, dest, { force, dryRun });
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
    log.push(writeText(ruleDest, cursorRuleContent({ full }), { force, dryRun }));
    log.push(writeText(cmdDest, cursorCommandContent(), { force, dryRun }));
    console.log(`    ${log.at(-2).status.padEnd(8)} .cursor/rules/panel.mdc`);
    console.log(`    ${log.at(-1).status.padEnd(8)} .cursor/commands/panel.md`);
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
    log.push(writeText(skillDest, claudeSkillContent({ full }), { force, dryRun }));
    console.log(`    ${log.at(-1).status.padEnd(8)} .claude/skills/panel/SKILL.md`);
  }

  // 6) Onboarding note
  const onboardDest = path.join(target, "ONBOARDING.md");
  log.push(
    writeText(onboardDest, onboardReadmeContent({ full }), { force, dryRun })
  );
  console.log(`  → ${log.at(-1).status.padEnd(8)} ONBOARDING.md (how to run)`);

  // 7) Report folder + shared run-state template
  const reportDir = path.join(target, "panel-report");
  if (!dryRun) mkdirSync(reportDir, { recursive: true });
  const keep = path.join(reportDir, ".gitkeep");
  if (!dryRun && !existsSync(keep)) writeFileSync(keep, "");
  console.log("  →         panel-report/");

  const runStateSrc = path.join(PACKAGE_ROOT, "docs", "run-state.template.yaml");
  if (existsSync(runStateSrc)) {
    const runStateDest = path.join(reportDir, "run-state.template.yaml");
    const r = copyOne(runStateSrc, runStateDest, { force, dryRun });
    log.push(r);
    console.log(`  → ${r.status.padEnd(8)} panel-report/run-state.template.yaml`);
  }

  // Collaboration law + roster (needed for full multi-agent protocol)
  for (const name of ["AGENTS.md", "COLLABORATION.md"]) {
    const src = path.join(PACKAGE_ROOT, name);
    if (!existsSync(src)) continue;
    const dest = path.join(target, name);
    const r = copyOne(src, dest, { force, dryRun });
    log.push(r);
    console.log(`  → ${r.status.padEnd(8)} ${name}`);
  }

  const written = log.filter((x) => x.status === "wrote").length;
  const skipped = log.filter((x) => x.status === "skip").length;
  const would = log.filter((x) => x.status === "would").length;

  console.log("");
  console.log("  ────────────────");
  console.log(
    dryRun
      ? `  Dry run: ${would} would write, ${skipped} skip`
      : `  Done: ${written} written, ${skipped} skipped (already existed)`
  );
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
    console.log("    npx @tysongreenan/panel init --full");
  }
  console.log("");
  console.log("  Load map: PANEL + playbook · craft → ANTI-SLOP · motion → MOTION · sell → COPY (Isa)");
  console.log("  Docs: ONBOARDING.md · PANEL.md · docs/crew-isa.md");
  console.log("");

  return { ok: true, log, target, full };
}

function copyOne(src, dest, { force, dryRun }) {
  if (existsSync(dest) && !force) {
    return { status: "skip", dest };
  }
  if (dryRun) return { status: "would", dest };
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return { status: "wrote", dest };
}

function copyDir(src, dest, { force, dryRun }) {
  if (existsSync(dest) && !force) {
    return { status: "skip", dest };
  }
  if (dryRun) return { status: "would", dest };
  mkdirSync(path.dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true, force: true });
  return { status: "wrote", dest };
}

function writeText(dest, body, { force, dryRun }) {
  if (existsSync(dest) && !force) {
    return { status: "skip", dest };
  }
  if (dryRun) return { status: "would", dest };
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, body, "utf8");
  return { status: "wrote", dest };
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

- Cursor: **\`/panel\`** · \`.cursor/rules/panel.mdc\`
- Claude Code: \`.claude/skills/panel/\`

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

## Re-run

\`\`\`bash
npx @tysongreenan/panel init --force
npx @tysongreenan/panel init --full --force
\`\`\`
`;
}
