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

const ROOT_SKILLS = [
  "EMPATHFLOW.md",
  "playbook.md",
  "ANTI-SLOP.md",
  "MOTION.md",
  "FRONTEND.md",
  "AGENTS.md",
  "COLLABORATION.md",
];

/**
 * Full onboarding when someone runs `npx tastetest init`
 * @param {{
 *   dir?: string,
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
  const lite = Boolean(opts.lite);
  const dryRun = Boolean(opts.dryRun);
  const wantCursor = opts.cursor !== false;
  const wantClaude = opts.claude !== false;

  const log = [];
  const actions = [];

  console.log("");
  console.log("  TasteTest onboarding");
  console.log("  ────────────────────");
  console.log(`  Target: ${target}`);
  console.log(`  Mode:   ${lite ? "lite (entry skills only)" : "full (skills + packs)"}`);
  if (dryRun) console.log("  Dry run — no files will be written");
  console.log("");

  if (!existsSync(target)) {
    if (!dryRun) mkdirSync(target, { recursive: true });
    actions.push(`mkdir ${target}`);
  }

  // 1) Root skill entry files
  console.log("  → Skill entry files");
  for (const name of ROOT_SKILLS) {
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

  // 2) Skill packs
  if (!lite) {
    console.log("  → Skill packs (motion, prose, ui-ux-pro-max)");
    const packs = ["motion", "stop-slop-prose", "ui-ux-pro-max"];
    for (const pack of packs) {
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
    // skills/README.md
    const readmeSrc = path.join(PACKAGE_ROOT, "skills", "README.md");
    if (existsSync(readmeSrc)) {
      const dest = path.join(target, "skills", "README.md");
      if (!dryRun) mkdirSync(path.dirname(dest), { recursive: true });
      const r = copyOne(readmeSrc, dest, { force, dryRun });
      log.push(r);
      console.log(`    ${r.status.padEnd(8)} skills/README.md`);
    }
  } else {
    console.log("  → Skipping skill packs (--lite)");
  }

  // 3) Cursor wiring
  if (wantCursor) {
    console.log("  → Cursor (rules + command)");
    const ruleDest = path.join(target, ".cursor", "rules", "tastetest.mdc");
    const cmdDest = path.join(target, ".cursor", "commands", "tastetest.md");
    const ruleBody = cursorRuleContent();
    const cmdBody = cursorCommandContent();
    log.push(writeText(ruleDest, ruleBody, { force, dryRun }));
    log.push(writeText(cmdDest, cmdBody, { force, dryRun }));
    console.log(`    ${log.at(-2).status.padEnd(8)} .cursor/rules/tastetest.mdc`);
    console.log(`    ${log.at(-1).status.padEnd(8)} .cursor/commands/tastetest.md`);
  }

  // 4) Claude Code wiring
  if (wantClaude) {
    console.log("  → Claude Code skill");
    const skillDest = path.join(
      target,
      ".claude",
      "skills",
      "tastetest",
      "SKILL.md"
    );
    log.push(writeText(skillDest, claudeSkillContent(), { force, dryRun }));
    console.log(`    ${log.at(-1).status.padEnd(8)} .claude/skills/tastetest/SKILL.md`);
  }

  // 5) Onboarding note in project
  const onboardDest = path.join(target, "TASTETEST.md");
  log.push(
    writeText(onboardDest, onboardReadmeContent({ lite }), { force, dryRun })
  );
  console.log(`  → ${log.at(-1).status.padEnd(8)} TASTETEST.md (how to run)`);

  // 6) Report folder
  const reportDir = path.join(target, "tastetest-report");
  if (!dryRun) mkdirSync(reportDir, { recursive: true });
  const keep = path.join(reportDir, ".gitkeep");
  if (!dryRun && !existsSync(keep)) writeFileSync(keep, "");
  console.log("  →         tastetest-report/");

  // Summary
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
    console.log("     Claude Code: invoke the tastetest skill, or say Run EmpathFlow");
  }
  console.log("");
  console.log("  Specialists: anti-slop · motion critic · frontend design");
  console.log("  Docs: TASTETEST.md · AGENTS.md · EMPATHFLOW.md");
  console.log("");

  return { ok: true, log, target };
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
    // If dest exists and not force, skip whole pack
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

function cursorRuleContent() {
  return `---
description: TasteTest / EmpathFlow — buyer-level UX review, craft, motion, frontend design
globs:
alwaysApply: false
---

# TasteTest

When the user asks to run EmpathFlow, TasteTest, a UX review, empathy audit, anti-slop, motion critic, or frontend design review, follow the project skill files:

1. Read and follow \`EMPATHFLOW.md\` — **Manager Phase 0 preflight first** (personas/ICP gate).
2. If full review and no \`docs/personas.md\`: draft personas, NO-GO on full craft/UI rewrite until GO.
3. Companions: \`ANTI-SLOP.md\`, \`MOTION.md\`, \`FRONTEND.md\`, \`AGENTS.md\`, \`playbook.md\`, \`skills/\`.
4. Preserve-first: do not delete the product's install/conversion path to "pass" an audit.
5. Report: preflight status, primary persona, scores, evidence, P0/P1/P2.

Natural language triggers: "Run EmpathFlow", "Do a TasteTest review", "anti-slop", "review animations", "frontend design system".
`;
}

function cursorCommandContent() {
  return `---
description: Run TasteTest / EmpathFlow buyer-level UX review on this project
---

Run a full TasteTest (EmpathFlow) review on this codebase.

1. EMPATHFLOW.md — Orchestrator preflight; seat **Persona Managers**; **priority council**.
2. COLLABORATION.md — permissions; multi-persona impact; consensus before implement.
3. If docs/personas.md missing: draft personas; NO-GO until GO + priority negotiated.
4. **Frontend Design must interview Orchestrator + all PMs** for visual prefs before library/search or redesign (FRONTEND.md Step 0).
5. Do not optimize only for one persona — secondaries keep non-negotiables.
6. Before code: Consensus log (Approves, multi-persona impact, preserve list).
7. AGENTS.md roster. Preserve install/CTA. Report to tastetest-report/report.md.

If the user named a URL or path, focus the review there. Otherwise review the main app/UI entrypoints.
`;
}

function claudeSkillContent() {
  return `---
name: tastetest
description: >
  Buyer-level UX review (EmpathFlow / TasteTest). Use when the user says Run EmpathFlow,
  TasteTest, UX review, anti-slop, motion critic, or frontend design review.
---

# TasteTest

Follow the project-root skill files (installed by \`npx tastetest init\`):

1. **Primary:** \`EMPATHFLOW.md\` Phase 0 + \`COLLABORATION.md\` (permissions/consensus).
2. Load or create \`docs/personas.md\` before full critique when missing.
3. Specialists need Approves before execute — Frontend never ships alone.
4. **Roster:** \`AGENTS.md\`.

## Output

\`tastetest-report/report.md\` + consensus log if implementing.

## Hard rules

- Manager owns order; domain owners hold Veto in their lane.
- Consensus before implement on full runs.
- Preserve-first on install/CTA.
`;
}

function onboardReadmeContent({ lite }) {
  return `# TasteTest is installed

This project was onboarded with \`npx tastetest init\`.

## Run a review

In **Cursor**, **Claude Code**, or another coding agent with this repo open:

\`\`\`
Run EmpathFlow
\`\`\`

or:

\`\`\`
Do a TasteTest review
\`\`\`

The **Manager** runs preflight first: intent, preserve list, and **personas**.
If \`docs/personas.md\` is missing, the agent must draft personas before a full critique
(or mark \`Preflight: lite\` only for a narrow one-component pass).

### Cursor

- Command: **\`/tastetest\`** (see \`.cursor/commands/tastetest.md\`)
- Rule: \`.cursor/rules/tastetest.mdc\`

### Claude Code

- Skill: \`.claude/skills/tastetest/\`
- Or say: Run EmpathFlow

### Specialists

| Say | Skill |
|-----|--------|
| anti-slop / craft pass | \`ANTI-SLOP.md\` |
| motion critic / review animations | \`MOTION.md\` |
| frontend design / design system | \`FRONTEND.md\` + \`skills/ui-ux-pro-max/\` |

## Files

| Path | Role |
|------|------|
| \`EMPATHFLOW.md\` | Primary review process |
| \`AGENTS.md\` | Full agent roster |
| \`playbook.md\` | Evaluation criteria |
| \`ANTI-SLOP.md\` / \`MOTION.md\` / \`FRONTEND.md\` | Companion skills |
${lite ? "| *(lite install — re-run without `--lite` for full packs)* | |\n" : "| `skills/` | Motion, prose, ui-ux-pro-max packs |\n"}| \`tastetest-report/\` | Put reports here |

## Re-run onboarding

\`\`\`bash
npx tastetest init --force
\`\`\`

## Python (optional)

\`\`\`bash
python -m empathflow run
\`\`\`

(Automated crew is still evolving; agent + skills is the supported path.)
`;
}
