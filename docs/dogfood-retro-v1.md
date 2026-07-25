# Dogfood retro — why Panel failed its first self-review

## What happened

1. **Audit (pass 1):** Homepage scored ~5–5.5. Real issues found (fake Play video, icon-only copy, weak primary color, no sample report, mobile nav).
2. **Fix (pass 1):** Applied hard gates aggressively. Homepage got “purer” but **lost the obvious install path** (`npx panel init` copy) and **gutted SmoothUI usage** that the product had intentionally adopted.
3. **Human feedback:** “Looks better” only after restore — CLI copy + components with real jobs.

The *findings* were mostly right. The *remediation policy* was wrong.

---

## What the product (Panel skill) did wrong

### 1. Hard gates without a preserve list
Gates said “CTA honesty” and “demos must earn place.” The agent interpreted that as **delete the CLI CTA** and **strip demos**, instead of **label/fix** and **repurpose**.

### 2. Auditor became product owner
Panel is supposed to help *this* product feel fluid. Pass-1 rewrote Panel’s story (skill-only prose) instead of polishing the story in the README/landing copy (CLI import into the repo).

### 3. Incomplete implementation ≠ bad UX pattern
`npx panel init` not shipping yet is an **implementation gap**. Copy-to-install is still the **right convention** for dev tools. The correct move: keep the pattern, wire `init`, or label roadmap — not hide the pattern.

### 4. No fix-order ladder
There was no rule: clarify → label → fix → relocate → remove. So “remove” won because it was the fastest way to make the audit green.

### 5. Component judgment without jobs
SmoothUI widgets were scored as “AI slop / demo tax.” Missing step: *What job could this component do for the buyer?* NumberFlow as gut-check score, tags as playbook lenses, copy as install — all valid once framed.

### 6. Brand motion ≠ false affordance
Scramble/orb were treated adjacent to “Play video.” One lies; one is personality. The skill didn’t separate them clearly enough.

### 7. No anti-regression check
After fixes, nobody asked: *Can the buyer still complete understand → install → proof?* Pass-1 broke install obviousness.

---

## Guardrails now in the product

| Guardrail | Where |
|-----------|--------|
| Preserve-first rule + fix order | `PANEL.md` |
| Failure-mode table (over-correction, purity over intent) | `PANEL.md` |
| Intent & constraints intake | `PANEL.md` process step 1 |
| Fix guardrails + definition of done | `PANEL.md` |
| Anti-patterns for reviewers | `playbook.md` |
| Gates diagnose, don’t authorize deletion | `playbook.md` + `PANEL.md` |

---

## How to use this in future runs

When Panel recommends a fix:

1. Does it protect the **primary conversion path**?
2. Does it honor **README / DESIGN / user constraints**?
3. Is it the **minimum** change that clears the gate?
4. After the fix, can a buyer still **install in one glance**?

If any answer is no, revise the recommendation before implementing.
