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
/** Package root (repo root when developing; node_modules/tastetest when published) */
export const PACKAGE_ROOT = path.resolve(__dirname, "..");

/** Always installed — thin core (locked structure) */
const ROOT_SKILLS_LEAN = [
  "EMPATHFLOW.md",
  "playbook.md",
  "ANTI-SLOP.md",
  "MOTION.md",
];

/** Optional companion for design-system work — only with --full */
const ROOT_SKILLS_FULL_EXTRA = ["FRONTEND.md"];

/** Deep packs only with --full */
const SKILL_PACKS = ["ui-ux-pro-max", "motion", "stop-slop-prose"];

/**
 * Onboard TasteTest into a project.
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
  console.log("  TasteTest onboarding");
  console.log("  ────────────────────");
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
    const ruleDest = path.join(target, ".cursor", "rules", "tastetest.mdc");
    const cmdDest = path.join(target, ".cursor", "commands", "tastetest.md");
    log.push(writeText(ruleDest, cursorRuleContent({ full }), { force, dryRun }));
    log.push(writeText(cmdDest, cursorCommandContent(), { force, dryRun }));
    console.log(`    ${log.at(-2).status.padEnd(8)} .cursor/rules/tastetest.mdc`);
    console.log(`    ${log.at(-1).status.padEnd(8)} .cursor/commands/tastetest.md`);
  }

  // 5) Claude Code wiring
  if (wantClaude) {
    console.log("  → Claude Code skill");
    const skillDest = path.join(
      target,
      ".claude",
      "skills",
      "tastetest",
      "SKILL.md"
    );
    log.push(writeText(skillDest, claudeSkillContent({ full }), { force, dryRun }));
    console.log(`    ${log.at(-1).status.padEnd(8)} .claude/skills/tastetest/SKILL.md`);
  }

  // 6) Onboarding note
  const onboardDest = path.join(target, "TASTETEST.md");
  log.push(
    writeText(onboardDest, onboardReadmeContent({ full }), { force, dryRun })
  );
  console.log(`  → ${log.at(-1).status.padEnd(8)} TASTETEST.md (how to run)`);

  // 7) Report folder + shared run-state template
  const reportDir = path.join(target, "tastetest-report");
  if (!dryRun) mkdirSync(reportDir, { recursive: true });
  const keep = path.join(reportDir, ".gitkeep");
  if (!dryRun && !existsSync(keep)) writeFileSync(keep, "");
  console.log("  →         tastetest-report/");

  const runStateSrc = path.join(PACKAGE_ROOT, "docs", "run-state.template.yaml");
  if (existsSync(runStateSrc)) {
    const runStateDest = path.join(reportDir, "run-state.template.yaml");
    const r = copyOne(runStateSrc, runStateDest, { force, dryRun });
    log.push(r);
    console.log(`  → ${r.status.padEnd(8)} tastetest-report/run-state.template.yaml`);
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
  console.log("  ────────────────────");
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
  console.log("       Run EmpathFlow");
  console.log("       Do a TasteTest review");
  if (wantCursor) {
    console.log("");
    console.log("     Cursor: type /tastetest  (custom command)");
  }
  if (wantClaude) {
    console.log(
      "     Claude Code: invoke the tastetest skill, or say Run EmpathFlow"
    );
  }
  if (!full) {
    console.log("");
    console.log("  Deep packs later:");
    console.log("    npx @tysongreenan/tastetest init --full");
  }
  console.log("");
  console.log("  Load map: EMPATHFLOW + playbook · craft → ANTI-SLOP · motion → MOTION");
  console.log("  Docs: TASTETEST.md · EMPATHFLOW.md");
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
description: TasteTest / EmpathFlow — buyer-level UX review, craft, motion
globs:
alwaysApply: false
---

# TasteTest

**Lean core always on. Heavy packs optional. Reduction over addition.**

1. \`EMPATHFLOW.md\` is source of truth (buyer job + reduction bias).
2. Load \`playbook.md\` with every EmpathFlow run.
3. UI / craft → + \`ANTI-SLOP.md\`. Motion → + \`MOTION.md\`.
4. Design system / colors / type → + \`FRONTEND.md\` + \`skills/ui-ux-pro-max\` only${full ? "" : " (needs `npx @tysongreenan/tastetest init --full`)"}.
5. Prefer delete / merge / cut. Preserve install / primary CTA.

## Load map

| User says | Load |
|-----------|------|
| Run EmpathFlow / TasteTest | \`EMPATHFLOW.md\` + \`playbook.md\` |
| UI / craft / anti-slop | + \`ANTI-SLOP.md\` |
| Animations / motion | + \`MOTION.md\` |
| Design system / colors / type | + \`FRONTEND.md\` + \`skills/ui-ux-pro-max\` |

## Priority of truth

1. EMPATHFLOW · 2. ANTI-SLOP · 3. MOTION · 4. playbook · 5. heavy packs (only when needed)
`;
}

function cursorCommandContent() {
  return `---
description: Run TasteTest / EmpathFlow buyer-level UX review on this project
---

Run a TasteTest (EmpathFlow) review on this codebase.

1. Follow \`EMPATHFLOW.md\` (reduction bias, density-first). Use \`playbook.md\`.
2. Prefer cuts over additions. Do not add marketing text to “fix” density.
3. Craft issues → \`ANTI-SLOP.md\`. Motion → \`MOTION.md\`.
4. Do not load \`FRONTEND.md\` or \`skills/ui-ux-pro-max\` unless design-system work is in scope.
5. Preserve install / primary CTA. Report to \`tastetest-report/report.md\`.

If the user named a URL or path, focus there. Otherwise review the main app/UI entrypoints.
`;
}

function claudeSkillContent({ full }) {
  return `---
name: tastetest
description: >
  Buyer-level UX review (EmpathFlow / TasteTest). Use when the user says Run EmpathFlow,
  TasteTest, UX review, anti-slop, or motion critic.
---

# TasteTest

**Lean core always on. Heavy packs optional. Reduction over addition.**

1. **Source of truth:** \`EMPATHFLOW.md\` + \`playbook.md\`
2. UI / craft → + \`ANTI-SLOP.md\` · Motion → + \`MOTION.md\`
3. Design system / colors / type → + \`FRONTEND.md\` + \`skills/ui-ux-pro-max/\`${full ? "" : " (needs `init --full`)"}
4. Priority of truth: EMPATHFLOW → ANTI-SLOP → MOTION → playbook → packs
5. Delete before add. Preserve install/CTA.

## Output

\`tastetest-report/report.md\`
`;
}

function onboardReadmeContent({ full }) {
  return `# TasteTest is installed

This project was onboarded with \`npx @tysongreenan/tastetest init${full ? " --full" : ""}\`.

**Lean core always on. Heavy packs optional. Reduction over addition.**

## Run a review

\`\`\`
Run EmpathFlow
\`\`\`

### What to load

| User says | Load |
|-----------|------|
| Run EmpathFlow / TasteTest | \`EMPATHFLOW.md\` + \`playbook.md\` |
| UI / craft / anti-slop | + \`ANTI-SLOP.md\` |
| Animations / motion | + \`MOTION.md\` |
| Design system / colors / type | + \`FRONTEND.md\` + \`skills/ui-ux-pro-max\` |

### Priority of truth

1. \`EMPATHFLOW.md\` — buyer job + reduction bias  
2. \`ANTI-SLOP.md\` — does this look AI-made?  
3. \`MOTION.md\` — Emil motion standard  
4. \`playbook.md\` — shared principles  
5. Heavy packs — only when explicitly needed  

### Cursor / Claude

- Cursor: **\`/tastetest\`** · \`.cursor/rules/tastetest.mdc\`
- Claude Code: \`.claude/skills/tastetest/\`

## Files

| Path | Role |
|------|------|
| \`EMPATHFLOW.md\` | Core — always on |
| \`playbook.md\` | Don’t Make Me Think + density |
| \`ANTI-SLOP.md\` | Craft / anti-template |
| \`MOTION.md\` | Motion (when anything moves) |
${
  full
    ? `| \`FRONTEND.md\` | Design-system work only |
| \`skills/\` | Deep packs (ui-ux-pro-max, motion, prose) |
`
    : `| *(lean)* | \`npx @tysongreenan/tastetest init --full\` for packs + FRONTEND |
`
}| \`AGENTS.md\` | Roster · run classes · protocol pack |
| \`COLLABORATION.md\` | Handoffs · Approves · consensus |
| \`tastetest-report/\` | Reports + \`run-state.template.yaml\` |

### Full multi-agent runs

1. Copy \`tastetest-report/run-state.template.yaml\` → \`run-state.yaml\`  
2. Set \`run_class\` + \`protocol\`  
3. No implement without consensus **PROCEED** (see \`COLLABORATION.md\`)

## Re-run

\`\`\`bash
npx @tysongreenan/tastetest init --force
npx @tysongreenan/tastetest init --full --force
\`\`\`
`;
}
