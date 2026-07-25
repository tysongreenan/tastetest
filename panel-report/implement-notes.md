# Implement notes — homepage REVISE

**Date:** 2026-07-25  
**Source audit:** `panel-report/report.md` · consensus **REVISE** → shipped  
**Run class:** implement

---

## Self-review of audit (before code)

| Audit claim | Re-check | Action taken |
|-------------|----------|--------------|
| Crew museum ~2.2k chars | Confirmed live | Removed `AgentRoster`; skills mono list only |
| Sample under Meet the crew | Confirmed | Sample = outline; skills = ghost; npm dropped |
| DESIGN.md drift | Confirmed (code ≠ launch law) | Code restored to lean; DESIGN.md annotated with skills-mono-list + don’ts |
| How restates hero | Confirmed | Body paragraph deleted; step 2 de-duped |
| Close contrast fixed | Re-confirmed | Kept InstallBlock `text-foreground` / `bg-card` |
| Prior npm honesty line | N/A (package live) | Left off; no re-add |

**No false fixes:** Did not delete install, preview, sample, or GitHub depth.

---

## Changes shipped

| File | Change |
|------|--------|
| `web/src/components/home-page.tsx` | Lean homepage: nav Skills, Sample outline, skills mono list, no crew |
| `web/DESIGN.md` | Launch structure, skills-mono-list component, Do’s/Don’ts |
| `docs/landing-copy.md` | Synced to lean ship copy |

**Not deleted (still available off-home):** `agent-roster.tsx`, `skills-showcase.tsx` for optional full marketing.

---

## Verify (live)

| Metric | Before | After |
|--------|-------:|------:|
| body text length | ~3471 | **~1384** |
| `#crew` / PM portraits | yes | **no** |
| `#skills` mono rows | no | **yes** |
| Hero secondary #1 | Meet the crew | **Sample report** |
| How section length | ~485 | **~291** |
| Typecheck | — | **pass** |

Screenshots: `panel-report/desktop-*-after.png`, `mobile-hero-after.png`

---

## Re-score (critics, implement pass)

| Score | Before | After |
|-------|-------:|------:|
| Density | 5.5 | **8** |
| Hierarchy | 6.5 | **8** |
| Clarity | 7.5 | **8** |
| Craft | 7 | **8** |
| Conversion | 7 | **8** |
| Design alignment | drift | **pass** |

**Consensus:** **PROCEED** (implement complete). Further polish only with new Approves.
