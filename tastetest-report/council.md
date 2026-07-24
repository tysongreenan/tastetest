# Council log — Full crew TasteTest run

**Date:** 2026-07-24  
**Target:** `web/` homepage (`http://localhost:3000`) + `/report`  
**Protocol:** `COLLABORATION.md` + `EMPATHFLOW.md` Phase 0–7 · `AGENTS.md` full crew  
**Method:** Live browser (Playwright) + static analysis + `init --dry-run` + `npm view tastetest`  
**Implement this run:** residual P0 only (`/report` chrome). Larger IA/craft = proposals pending Approves.

---

## Orchestrator → crew | Phase 0 | preflight

**Claim:** Full marketing TasteTest of TasteTest’s own site.  
**Scope:** Product marketing (homepage + sample report), not third-party app audit.  
**Intent pack:**
- README: `npx tastetest init` → agent **Run EmpathFlow** → report
- `DESIGN.md`: calm, honest, Avery-first structure (hero → problem → how → sample → trust → CTA)
- Primary conversion: copy install command
- Constraints: SmoothUI brand pieces, preserve install, no delete conversion path  
**Personas:** `docs/personas.md` ≥2, grounded, PM seats named.  
**Preserve list:**
1. `npx tastetest init` + labeled **Copy**
2. Agent prompt **Run EmpathFlow** (copyable)
3. SiriOrb brand mark; ScrambleHover on non-H1 only
4. Acme sample story (not dogfood meta as the *product sample*)
5. GitHub / open-source path
6. Sticky install after scroll  

**Secondary non-negotiables:** Jordan — init real/re-runnable; Sam — sample client-safe.

**Decision:** **GO**

---

## Persona priority council | 0C-bis

### PM-Avery | pitch
**Claim:** This is a conversion surface. Avery must leave with install + trust in minutes.  
**Evidence:** Homepage grew crew / skills / org before sample; Avery path dilutes.  
**Non-negotiable if secondary:** Install obvious; report clear in minutes.

### PM-Jordan | pitch
**Claim:** Engineer will try the CTA and open GitHub. Broken public init = instant credibility death.  
**Evidence:** `npm view tastetest` → **404**; local `init --dry-run` works (15 would-write).  
**Non-negotiable if secondary:** Init looks real; skills on GitHub not theater.

### PM-Sam | pitch
**Claim:** Designers judge craft in 5s and open sample. Chrome that says “dogfood” undercuts Acme body.  
**Evidence:** `/report` header + metadata still dogfood; 9-up portrait grid + skill grid = template DNA.  
**Non-negotiable if secondary:** Sample client-safe; no toy UI.

### Council table (signed)

| Role | Persona | Priority |
|------|---------|----------|
| **PM-Avery** | Avery (founder) | **Priority** |
| **PM-Jordan** | Jordan (eng) | Secondary |
| **PM-Sam** | Sam (designer) | Secondary |

**Why priority:** Marketing homepage conversion run; Avery is default install buyer.  
**Secondary non-negotiables:** Init honesty (Jordan); sample integrity + craft bar (Sam).  
**Harm checks required from:** PM-Jordan, PM-Sam on install labels, sample chrome, any cut to depth.

**Orchestrator + all PMs:** **Approve** table.

---

## Product Analyst → Orchestrator | Phase 1

**Claim:** Product = skill packs + crew process dropped into a repo; agent runs review; output = Markdown report.  
**Promised:** `npx tastetest init`, Cursor `/tastetest`, Claude skill, report with scores/P0s/paths.  
**Shipped:** CLI `init` real in-repo; marketing site rich; **not on npm**.  
**Surfaces:** `home-page.tsx`, marketing/*, `content/sample-report.md`, `cli/init.js`.  
**Orchestrator:** approve.

---

## Empathy Mapper → Orchestrator | Phase 2

**Claim:** File personas quality OK; maps grounded; do not invent new humans this run.  
**Seats:** PM-Avery, PM-Jordan, PM-Sam active.  
**Orchestrator + all PMs + Journey:** approve maps as grounding.

---

## Journey Critic → Empathy + Orchestrator + PMs | Phase 3 | journey list

| # | Journey | Persona / PM | Success |
|---|---------|--------------|---------|
| J1 | Land → understand → copy init | Avery / PM-Avery | Command + Copy ≤10s |
| J2 | Preview proof → open full sample | Avery+Sam | Sample matches promise; client-safe |
| J3 | Trust depth (GitHub / skills / crew) | Jordan | Real files, real init story |
| J4 | Mobile land → install | Avery | Primary path without desktop-only dead end |

**Approves:** Empathy ✓ · PM-Avery ✓ · PM-Jordan ✓ (J3) · PM-Sam ✓ (J2) · Orchestrator ✓

---

## Journey Critic | Phase 4 | critique

| Journey | Verdict | Evidence |
|---------|---------|----------|
| J1 | **Partial** | Hero install strong; sticky helps; page length + “Meet the crew” compete with try path |
| J2 | **Fail** | Body Acme ✓; chrome “TasteTest dogfood report” + meta dogfood; sample buried (“Still want…?”) |
| J3 | **Partial** | Skills link GitHub; crew incomplete vs `AGENTS.md`; public npm 404 |
| J4 | **Partial** | Install in hero; **Get started** nav `hidden sm:inline-flex`; sticky recovers |

---

## Heuristic Auditor | Phase 4 | hard gates

| Gate | Result |
|------|--------|
| CTA honesty | **Fail** — public `npx tastetest init` 404; not labeled |
| False affordances | **Pass** — tabs/pipeline/Before-After real |
| Heading semantics | **Pass** — real H1 |
| Primary action visibility | **Pass** desktop; **Partial** mobile nav |
| Demos earn place | **Pass** (gap/pipeline/preview have jobs) |
| Show the artifact | **Partial** — mini report in hero; full sample late + chrome mismatch |
| Mobile parity | **Partial** — sticky OK; Get started hidden |
| Anti-slop craft | **Fail band** — craft ≤5.5; professionalism cap |
| Motion craft | **Approve** with nits |
| Prose craft | **Borderline** (~34/50) |

**Orchestrator:** scores accepted for report ship.

---

## Frontend Design → Managers | design brief | question

**Surface:** homepage marketing (full run review; not free redesign)  
**Priority this run:** Avery  
**Secondary non-negotiables:** Jordan init honesty; Sam sample + craft  
**Preserve:** install, orb, Acme sample story, GitHub  

### Answers

| Seat | Feel | Trust / bounce | References | Depth | Motion |
|------|------|----------------|------------|-------|--------|
| **Orchestrator** | Calm, precise, buyer-honest (`DESIGN.md`) | Bounce on false CTA / dogfood chrome | Minimal & Direct > glass | Prefer proof early; depth after | Purposeful only |
| **PM-Avery** | Clear, fast, not flashy | Bounce if install unclear or report buried | Linear-simple landing | Sparse > crew museum | Minimal |
| **PM-Jordan** | Product-grade, terminal real | Bounce on toy demos / fake npm | Linear / Raycast / Vercel docs | Built-out skills OK | Minimal |
| **PM-Sam** | Refined type, density, craft | Bounce on identical portrait grids, AI stock faces as “team” | Reference-quality sections | One excellent artifact > four grids | Purposeful only |

**Frontend Design:** brief complete → library may be consulted.

---

## Frontend Design | Phase 5 | library + proposals

**Search:** `developer tools SaaS minimal` → product domain  
**Library primary:** Glassmorphism / Dark OLED  
**Decision:**
| Pick | Status | Why |
|------|--------|-----|
| Glassmorphism | **Rejected** | Craft + DESIGN.md |
| Dark OLED IDE | **Rejected** (primary) | Brand is light / typography-first |
| Minimal & Direct + Demo | **Accepted** north star | Avery + DESIGN.md |
| Bento as only proof | **Rejected** | Can become slop without real artifact |

**Proposals (not implemented without Approves):**
1. **P0** Fix `/report` chrome + metadata to Acme sample (residual prior council)  
2. **P0** Label install path until npm publish (`From this repo: node bin/…` or honesty line)  
3. **P1** Promote sample earlier; demote or progressive-disclose crew/org  
4. **P1** Show Get started on mobile  
5. **P1** Break skill/crew identical grids; reduce mono eyebrows  
6. **P2** Complete roster or label “highlights”  
7. **P2** Prose: kill “cool” / “Still want…?”  

**Impact**
- Priority Avery: help on 1–4  
- Secondary Jordan: help on 2, 6; hurt if we strip skills without depth path → keep footer/GitHub  
- Secondary Sam: help on 1, 5; hurt if we remove portraits without better craft → redesign structure not delete proof of crew  

---

## Craft Critic | Phase 5

**Skill:** `ANTI-SLOP.md`  
**Score:** **5.5 / 10**  
**Hits:** Uppercase mono eyebrows on major sections; 9× identical team cards; 6× identical skill cards; AI portrait stock as “team”; sample demoted.  
**Passes:** No traffic-light chrome; product preview tabs real; gap demos teach; hero not H1-as-control.  
**Veto domain:** Any “fix” that only rewrites copy inside same grids without structure change.  
**Craft Critic:** approve score for report.

---

## Motion Critic | Phase 5

**Skill:** `MOTION.md` + STANDARDS  
**Verdict:** **Approve** · **7 / 10**

| Before | After | Why |
|--------|-------|-----|
| `transition-all` on gap demo toggles / skill cards | Animate only color/opacity/transform needed | Escalation: avoid `transition: all` |
| Auto tab/pipeline loop 2.8–3.2s | Keep; already respects `useReducedMotion` | Marketing frequency OK |
| Sticky bar y/opacity 0.22s EASE | Keep | Sub-300ms, ease-out curve |
| Portrait hover scale 1.02 | Gate `@media (hover: hover)` if not already | Touch false-hover |
| Continuous SiriOrb | Keep; CSS reduced-motion present | Brand, rare ambient |

**Motion Critic + Orchestrator:** Approve motion for ship scores.

---

## Prose Critic | Phase 5

**Skill:** stop-slop-prose  
**Score:** ~**34 / 50** (borderline fail &lt;35)

| Dimension | /10 | Notes |
|-----------|----:|-------|
| Directness | 7 | Hero body solid |
| Rhythm | 6 | Section openers metronomic |
| Trust | 6 | “dogfood” chrome; soft sample CTA |
| Authenticity | 6 | “cool skills… actually” |
| Density | 7 | Some filler |

**Rewrite targets:** skills H2; sample CTA H2; report page chrome strings.  
**Prose Critic:** approve score.

---

## Design System Checker | Phase 5

**Skill:** `web/DESIGN.md`  
**Claim:** Tokens (blue primary, Space Grotesk + DM Sans, radius) largely honored.  
**Drift:** Launch structure (sample early, short page) vs current long crew museum.  
**DESIGN.md:** update structure note after IA consensus, not ad-hoc.  
**Orchestrator:** note accepted.

---

## Consensus: residual sample chrome fix (implement this run)

- **Proposal:** Align `/report` page chrome + metadata with Acme sample body (prior council incomplete).  
- **From:** Journey Critic + PM-Sam + Report Writer  
- **Approves:** Orchestrator ✓ · PM-Avery ✓ · PM-Jordan ✓ · PM-Sam ✓ · Journey ✓ · Craft ✓ (label only) · Prose ✓ · Motion N/A  
- **Objections resolved:** none  
- **Rejected alternatives:** Revert body to dogfood (hurts Avery/Sam)  
- **Priority persona this run:** Avery  
- **Multi-persona impact:** Priority help · Jordan neutral · Sam help  
- **Preserve list intact?** yes  
- **Decision:** **PROCEED** (chrome/meta only)

---

## Consensus: homepage IA + npm honesty (do not implement without re-open)

- **Proposal:** Install honesty label + promote sample + craft structure pass (see report P0/P1).  
- **Approves needed for full homepage redesign:** Orchestrator · all PMs · Journey · Craft · Motion · (+ Prose if copy-heavy)  
- **Decision:** **BLOCK implement** until user asks to execute; scores ship in report.

---

## Report Writer → Orchestrator | Phase 6

**Claim:** Full report assembled with multi-persona coverage, hard gates, craft/motion/prose, recommendations.  
**Path:** `tastetest-report/report.md`  
**Coverage check:** Avery priority + Jordan/Sam secondary harm — present.  
**Orchestrator:** **Approve ship report.**

---

## Execute | residual chrome fix

**Files:** `web/src/app/report/page.tsx`  
**Changed:** metadata title/description; header eyebrow + H1 → Acme sample framing.  
**Preserved:** Acme body content; Home/GitHub links; install path untouched.

---

## Consensus: ship fix specs (user approved)

- **Proposal:** Implement Fix specs 1–8 from report (honesty, sample promote, mobile Start, copy, craft structure, motion nits, DESIGN.md).  
- **From:** User: “yes”  
- **Approves:** User override ✓ · Orchestrator ✓ · PM-Avery ✓ · PM-Jordan ✓ · PM-Sam ✓ · Journey ✓ · Craft ✓ · Motion ✓ · Prose ✓  
- **Priority persona:** Avery  
- **Multi-persona impact:** Avery help · Jordan help (honesty + AGENTS link) · Sam help (sample + craft)  
- **Preserve list intact?** yes (`npx` kept, labeled)  
- **Decision:** **PROCEED**

### Execute | fix pack

| Fix | Files | Status |
|-----|-------|--------|
| 1 Honesty | `home-page.tsx` InstallHonesty | ✓ |
| 3 Sample promote + copy | `home-page.tsx` section order + SampleExcerpt | ✓ |
| 4 Mobile Start | header nav always visible | ✓ |
| 5 Skills/sample copy | skills H2, sample H2 | ✓ |
| 6 Craft structure | `agent-roster.tsx`, `skills-showcase.tsx`, fewer eyebrows | ✓ |
| 7 Roster honesty | “highlights” + AGENTS.md link | ✓ |
| 8 Motion | gap-demos, pipeline-demo, skills, portraits | ✓ |
| 9 DESIGN.md | launch structure | ✓ |
| Footer | sample earlier in product links | ✓ |

**Preserved:** `npx tastetest init` + Copy · Run EmpathFlow · orb · Acme story · sticky · GitHub
