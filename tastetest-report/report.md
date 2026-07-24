# TasteTest Report — Homepage full crew run

**Target:** `web/` @ `http://localhost:3000` (+ `/report`)  
**Date:** 2026-07-24  
**Preflight:** **GO**  
**Grounding:** strong (`docs/personas.md` + live browser + CLI check)  
**Persona coverage:** full (priority + secondary harm pass)  
**Persona source:** `docs/personas.md` (file)  
**Council:** `tastetest-report/council.md`  
**Skills invoked:** EMPATHFLOW · COLLABORATION · AGENTS · playbook · ANTI-SLOP · MOTION (+ STANDARDS) · FRONTEND / ui-ux-pro-max · stop-slop-prose · DESIGN.md · personas.md  

---

## Executive Summary

| Score | Owner | Value |
|-------|--------|------:|
| **Fluidity** | Journey Critic | **6.5 / 10** |
| **Professionalism** | Orchestrator (gates) | **6 / 10** *(capped)* |
| **Craft / Anti-slop** | Craft Critic | **5.5 / 10** |
| **Motion** | Motion Critic | **7 / 10** · **Approve** |
| **Conversion readiness** | Journey + Empathy | **6 / 10** |
| **Prose (landing)** | Prose Critic | **~34 / 50** · borderline |

**What works:** Hero install is clear; product preview (Code → Agent → Report) teaches the product; gap demos and pipeline have real jobs; reduced-motion is wired in key components; sticky install recovers conversion after scroll.

**What fails the buyer:** (1) Public primary CTA `npx tastetest init` is **not on npm** (404) with no honesty label. (2) Full sample chrome still says **dogfood** while body is **Acme Checkout**. (3) Avery’s proof artifact is buried after a long crew/skills/org museum — structure drifted from `DESIGN.md` launch order. Craft mid-page (identical portrait + skill grids + mono eyebrows on every section) caps professionalism.

### Persona priority (this run)

| Role | Persona | Priority |
|------|---------|----------|
| **PM-Avery** | Avery (founder) | **Priority** |
| **PM-Jordan** | Jordan (eng) | Secondary |
| **PM-Sam** | Sam (designer) | Secondary |

**Why priority:** Homepage conversion audit; install + trust in minutes.  
**Secondary non-negotiables:** Jordan — real init / OSS credibility. Sam — sample client-safe, no toy craft.  
**Harm checks required from:** PM-Jordan, PM-Sam.

### Preserve list

| Item | Job |
|------|-----|
| `npx tastetest init` + labeled **Copy** | Primary conversion |
| “Run EmpathFlow” copy affordance | Step 2 after init |
| SiriOrb brand + ScrambleHover on non-critical nav | Brand motion (not H1) |
| Acme Checkout sample story | Artifact honesty |
| GitHub open-source path | Jordan trust |
| Sticky install bar | Mobile / scroll conversion |

### Top issues

1. **P0** CTA honesty — public npm package missing; CTA unlabeled  
2. **P0** `/report` chrome/metadata still “dogfood”; body is Acme  
3. **P0** Sample report demoted late (“Still want the sample report?”) after heavy meta sections — Avery JTBD hurt  
4. **P1** Craft: section-eyebrow loop + 9-up agent cards + 6-up skill cards  
5. **P1** Mobile: “Get started” nav hidden below `sm`  
6. **P2** Roster incomplete vs `AGENTS.md` (Product Analyst, Heuristic, Design System, Prose, Report Writer missing from grid)

### Quick wins

1. Fix `/report` header + meta to match Acme sample (residual from prior council)  
2. One honesty line under install until package is published  
3. Show **Get started** on mobile  
4. Rename sample CTA; move sample above or beside crew depth  

---

## Preflight status

| Item | Result |
|------|--------|
| Scope | TasteTest marketing homepage + `/report` |
| Marketing vs feature audit | **Product marketing** |
| Intent | Skill-first install → agent review → scored report |
| DESIGN.md | Present (`web/DESIGN.md`) |
| Personas | ≥2, grounded, PM seats |
| Priority negotiated | **Yes** (table above) |
| Preserve list | Built |
| **GO / NO-GO** | **GO** |

---

## Product Understanding

**Purpose:** Drop EmpathFlow / craft / motion / frontend skills into a repo; agent runs a buyer-level UX audit; output is a prioritized Markdown report.

| Promised | Reality |
|----------|---------|
| `npx tastetest init` | Works **from this repo** (`node bin/tastetest.js init --dry-run` → 15 would-write). **Not on npm** (`npm view tastetest` → 404). |
| Run EmpathFlow / `/tastetest` | Documented; agent-skill process real in repo files |
| Sample report | `web/content/sample-report.md` = Acme Checkout (good). Page chrome lagged behind. |
| Full crew | Process in `AGENTS.md` / `COLLABORATION.md`; homepage shows 9 of ~11+ seats |

**Code anchors:** `web/src/components/home-page.tsx`, `web/src/components/marketing/*`, `cli/init.js`, `bin/tastetest.js`, `web/content/sample-report.md`, `web/src/app/report/page.tsx`.

**Constraints honored this run:** Reviewer posture only — no silent product strategy rewrite; preserve-first on install.

---

## Personas & Empathy Maps

*Loaded from `docs/personas.md`; Empathy Mapper approved quality.*

### Avery — Indie founder / vibe-coder (**Priority** · PM-Avery)

| | |
|--|--|
| **JTBD** | Clear read on whether the product feels trustworthy; fix tonight |
| **Does** | Skim hero → copy install → sample output → try repo |
| **Pains** | Vague design feedback; tools that need a PhD; empty demos |
| **Success** | Install &lt;2 min; understand report &lt;5 min |
| **Homepage must prove** | Obvious install; real sample; honest skill-first; not slop |
| **This run** | Install visible ✓ · sample too late ✗ · public CTA honesty ✗ |

### Jordan — Product engineer (**Secondary** · PM-Jordan)

| | |
|--|--|
| **JTBD** | Re-runnable review process in the codebase |
| **Does** | GitHub, skill files, init reality, sample quality |
| **Non-negotiable** | Init looks real; OSS credibility |
| **This run** | Skills/GitHub strong ✓ · public npm 404 ✗ · roster incomplete partial |

### Sam — Agency / freelance designer (**Secondary** · PM-Sam)

| | |
|--|--|
| **JTBD** | Client-safe critique format without blank doc |
| **Does** | 5-second craft judge → open sample |
| **Non-negotiable** | Sample serious; no toy UI |
| **This run** | Acme body ✓ · dogfood chrome ✗ · portrait grid template-adjacent ✗ |

---

## Critical Journeys (persona-linked)

| # | Journey | Persona | PM | Success criteria |
|---|---------|---------|----|------------------|
| **J1** | Land → understand → copy init | Avery | PM-Avery | Command + Copy obvious ≤10s |
| **J2** | Preview proof → open full sample | Avery + Sam | PM-Avery, PM-Sam | Full sample matches promise; client-safe chrome |
| **J3** | Trust depth (repo / skills / crew) | Jordan | PM-Jordan | Real files; init story credible |
| **J4** | Mobile land → install | Avery | PM-Avery | Critical CTA without desktop dead-end |

---

## Journey Critique

### J1 — Land → install — **Partial (priority)**

**Helps Avery:** H1 value prop; “Start here”; `InstallBlock` with **Copy / Copied**; “Run EmpathFlow” copies; sticky bar after ~520px scroll.  
**Hurts Avery:** Secondary hero CTAs push **Meet the crew** / GitHub before sample proof; long page before close CTA.  
**Evidence:** `home-page.tsx` hero + `StickyInstallBar`.

### J2 — Sample proof — **Fail (priority + Sam harm)**

**Helps:** Hero `ProductPreview` Report tab shows scores + P0 path; Acme body on `/report` is coherent.  
**Hurts:**  
- Page header: **“TasteTest dogfood report”** while article H1 is Acme sample.  
- Metadata description still dogfood.  
- Homepage sample entry: **“Still want the sample report?”** — sounds optional/apologetic, not proof.  
**Evidence:** `web/src/app/report/page.tsx` L8–12, L122–125; `home-page.tsx` L429–457; live Playwright.

### J3 — Jordan depth — **Partial**

**Helps:** Skills section links real GitHub blobs; org chart explains veto structure; pipeline shows init → agent → report.  
**Hurts:** Strangers who only try `npx tastetest init` get npm 404; roster omits several `AGENTS.md` seats without “highlights” framing.  
**Evidence:** `npm view tastetest` 404; `agent-roster.tsx` 9 agents; `cli/init.js` real.

### J4 — Mobile install — **Partial**

**Helps:** Hero install full-width; sticky compact install on scroll.  
**Hurts:** Nav **Get started** is `hidden sm:inline-flex` — no primary nav CTA on ~390px.  
**Evidence:** Playwright mobile snapshot; `home-page.tsx` L194–199.

---

## Design System & Heuristic Evaluation (Hard gates)

| # | Gate | Result | Notes |
|---|------|--------|-------|
| 1 | CTA honesty | **Fail** | Prefer fix/publish or **label**; do not remove install UX |
| 2 | False affordances | **Pass** | Tabs, pipeline, Before/After change real state |
| 3 | Heading semantics | **Pass** | One H1; scramble not on H1 |
| 4 | Primary action visibility | **Partial** | Desktop strong; mobile nav weak (sticky mitigates) |
| 5 | Demos earn place | **Pass** | Gap demos teach hierarchy/components/errors/flows |
| 6 | Show the artifact | **Partial** | Mini report OK; full sample late + chrome mismatch |
| 7 | Mobile parity | **Partial** | Sticky OK; Get started hidden |
| 8 | Anti-slop craft | **Fail band** | Craft 5.5 → professionalism capped |
| 9 | Motion craft | **Approve** | See Motion section |
| 10 | Prose craft | **Borderline** | ~34/50 |

**Professionalism capped at 6** until CTA honesty and craft structure improve (preserve-first — not by deleting install).

---

## Frontend Design System

### Design brief (Step 0 — answered)

| Manager | Feel | Bounce if… | Depth | Motion |
|---------|------|------------|-------|--------|
| Orchestrator | Calm, precise, honest | False CTA; dogfood chrome | Proof early | Purposeful |
| PM-Avery | Clear, fast | Install unclear; report buried | Sparse | Minimal |
| PM-Jordan | Product-grade / terminal real | Toy demos; fake npm | Skills OK | Minimal |
| PM-Sam | Refined craft | Template grids; unserious sample | Artifact first | Purposeful |

### Library consult (`ui-ux-pro-max`)

Query: `developer tools SaaS minimal` → product domain.

| Recommendation | Decision |
|----------------|----------|
| Glassmorphism | **Rejected** (Craft + DESIGN.md) |
| Dark OLED + IDE skin | **Rejected** as primary brand |
| Minimalism / Minimal & Direct + Demo | **Accepted** north star |
| Micro-SaaS flat + motion-driven | Partial — motion already constrained by MOTION.md |

**Stack:** Next.js + shadcn button + SmoothUI (orb, copy, scramble) — keep with jobs.

### Structure drift vs DESIGN.md

| DESIGN.md launch order | Live page |
|------------------------|-----------|
| Hero + install | ✓ |
| Problem | ✓ (gap demos — stronger) |
| How (3 steps) | ✓ (interactive pipeline) |
| Report sample | Demoted late + weak CTA copy |
| Trust strip | Expanded into crew + skills + org (heavy) |
| Final install | ✓ |

---

## Craft / Anti-slop Evaluation

**Score: 5.5 / 10** · Craft Critic

### Pattern hits (`ANTI-SLOP.md`)

| Pattern | Where | Severity |
|---------|-------|----------|
| Tiny uppercase mono eyebrow on every major section | The gap / Workflow / The crew / Skills pack / Structure | High |
| Identical card grid (icon/title/body) | Skills showcase 3×2 | High |
| Identical portrait + text cards | Agent roster 3×3 | High |
| Stock AI headshots as “team” without craft variety | `/public/agents/*` | Medium (Sam) |
| Apologetic proof framing | “Still want the sample report?” | Medium |
| Template-adjacent section rhythm | Repeated `eyebrow → H2 → muted p → grid` | High |

### What is *not* slop

- Hero composition with real install + working product tabs  
- Gap demos with Before/After that change meaning  
- No traffic-light fake browser chrome  
- No H1-as-control  
- Dark final CTA band is intentional contrast, not another gray card  

### Slop test

1. Screenshot mid-page crew/skills → **yes, AI landing risk**  
2. Template swap logo → mid sections would sell another SaaS → **yes**  
3. Section sameness → **yes (2+ major)**  
4. Artifact honesty → **partial** (Acme body good; chrome bad)  
5. Focal point per viewport → hero yes; mid-page no single climax  
6. Restraint → page over-explains process vs one strong sample  

**Rule applied:** Fix must change **structure**, not only labels inside the same grids.

---

## Motion Evaluation

**Verdict: Approve · 7 / 10** · Motion Critic

| Before | After | Why |
|--------|-------|-----|
| `transition-all` on gap toggles / skill hover cards | Prefer explicit properties | Escalation: avoid `transition: all` |
| Auto-rotate product tabs + pipeline (~3s) | Keep; disable under `useReducedMotion` (already) | Marketing frequency OK |
| Sticky install enter 0.22s custom ease-out | Keep | Sub-300ms UI |
| Hero entrance y+opacity ~0.32s | Keep | Marketing OK |
| SiriOrb continuous ambient | Keep; CSS `@media (prefers-reduced-motion)` present | Brand; rare |
| Portrait `scale(1.02)` hover | Prefer hover media gate | Touch false-hover |

**No Block triggers:** no `scale(0)`, no ease-in UI, no keyboard animation, reduced-motion respected on Framer paths.

---

## Prose / microcopy

**Score ~34 / 50** · Prose Critic (borderline fail under 35)

| Dimension | /10 |
|-----------|----:|
| Directness | 7 |
| Rhythm | 6 |
| Trust | 6 |
| Authenticity | 6 |
| Density | 7 |

**Strong:** Hero body (“Your code works. The product still feels off…”) — specific, buyer-facing.  
**Weak:**
- “The cool skills the agents actually use” — filler adjectives  
- “Still want the sample report?” — soft, optional  
- Report chrome “dogfood report” — wrong product story for sample  
- Binary contrast habit in gap H2 is intentional brand; acceptable  

---

## Prioritized Recommendations

| Pri | Tag | Action | Persona | Preserve-first note |
|-----|-----|--------|---------|---------------------|
| **P0** | `label` | Under install: honesty until npm publish | Avery, Jordan | **Do not remove** `npx` line — clarify |
| **P0** | `fix` | `/report` header + `metadata` → Acme sample (not dogfood) | Avery, Sam | **Done** this run |
| **P0** | `relocate` | Promote full sample; kill apologetic CTA copy | Avery, Sam | Keep crew for Jordan |
| **P1** | `fix` | Mobile: show Get started in nav | Avery | |
| **P1** | `redesign-structure` | Break identical grids; drop eyebrow monotony | Sam | Vary anatomy, don’t delete |
| **P1** | `copy-edit` | Skills H2 + sample H2 | Avery, Sam | |
| **P2** | `label` | Roster: “Highlights” or add seats | Jordan | |
| **P2** | `motion-fix` | Replace `transition-all` | — | |
| **P2** | `fix` | DESIGN.md structure after IA | — | |

---

## Fix specs (what to ship)

*Concrete target state. Implement from these, not from the problem titles alone.*

### Fix 1 — Install honesty (P0 · `label`)

**File:** `web/src/components/home-page.tsx` — under both `InstallBlock` uses (hero + sticky optional; final CTA too).  
**Do not change:** the command string `npx tastetest init` or the Copy button.

| | |
|--|--|
| **Before** | Install block only. Stranger runs `npx` → npm 404. No path that works today. |
| **After** | Same install block. One line of helper copy **under** it. |

**Copy (exact):**

```text
Package not on npm yet. From this repo: node bin/tastetest.js init
```

Or two-line variant if space:

```text
Works today from the repo. npm publish pending.
node bin/tastetest.js init --dir /path/to/your-app
```

**Acceptance:** Avery can still copy the primary command in one click. Jordan sees a working path without opening README. Gate “CTA honesty” → Pass (labeled).

---

### Fix 2 — `/report` chrome (P0 · `fix`) — **DONE**

| | |
|--|--|
| **Before** | Header “TasteTest dogfood report”; meta describes dogfood. |
| **After** | Header “Acme Checkout — EmpathFlow report”; meta describes fictional Acme sample. |

**Shipped:** `web/src/app/report/page.tsx`.

---

### Fix 3 — Promote sample + rewrite CTA (P0 · `relocate` + `copy-edit`)

**Files:** `web/src/components/home-page.tsx` (section order + copy).  
**Intent:** Avery hits full sample **before** crew museum. Jordan still gets crew/skills later.

#### 3a — Page order (target)

```
1. Hero + install + product preview     (keep)
2. Problem / gap demos                  (keep)
3. How / pipeline                       (keep)
4. ★ Sample report (full weight)        ← move here, expand
5. Crew                                 (keep, after sample)
6. Skills                               (keep)
7. Org structure                        (keep or collapse later)
8. Final install CTA                    (keep)
```

Move the `#report` block to sit **immediately after** `#how` (pipeline), **before** `#crew`.

#### 3b — Sample section chrome (not a one-liner strip)

**Before (apologetic):**

- H2: `Still want the sample report?`
- Button: `Open sample`

**After (proof, primary):**

| Element | Spec |
|---------|------|
| Eyebrow (optional, once) | `Sample output` — not uppercase mono on every section |
| H2 | `What a run looks like` |
| Body | `Acme Checkout — scores, P0s, file paths. Fictional product; real report shape.` |
| Primary button | `Read full sample` → `/report` |
| Optional secondary | Link “Copy install” → `#start` |
| Layout | Split: left copy + right **static excerpt** of 3 score chips + one P0 row (reuse ReportPanel visual from `product-preview.tsx`, no auto-loop required) |

**Hero secondary CTAs (replace):**

| Before | After |
|--------|--------|
| `Meet the crew` → `#crew` | `See sample report` → `#report` (or `/report`) |
| `Star on GitHub` | Keep as ghost |

**Acceptance:** From hero, Avery reaches full sample in ≤2 clicks without scrolling through 9 agent cards. Sam sees client-safe framing, not “still want…?”.

---

### Fix 4 — Mobile Get started (P1 · `fix`)

**File:** `web/src/components/home-page.tsx` header nav.

| | |
|--|--|
| **Before** | `className="... hidden ... sm:inline-flex"` on Get started |
| **After** | Always visible. On narrow screens: shorter label OK. |

**Spec:**

```tsx
// Remove `hidden` and `sm:inline-flex` restriction
// Keep: size sm, rounded-full, primary button
// Mobile label: "Start" or "Install" if "Get started" wraps
className={cn(buttonVariants({ size: "sm" }), "ml-1 inline-flex h-8 gap-1 rounded-full px-3 sm:px-3.5")}
```

**Nav on mobile target:** `How` · `Skills` · `GitHub` · **Start** (primary). Crew can stay `sm+` only.

**Acceptance:** 390px width shows a primary nav control that jumps to `#start`. Sticky bar remains as backup.

---

### Fix 5 — Skills + sample copy (P1 · `copy-edit`)

| Location | Before | After |
|----------|--------|--------|
| Skills H2 | `The cool skills the agents actually use` | `Skills that gate the review` |
| Skills body | “The cool skills…” energy | `Craft, motion, patterns, prose — files on GitHub, upstream packs credited.` |
| Sample H2 | `Still want the sample report?` | `What a run looks like` (see Fix 3) |
| Sample button | `Open sample` | `Read full sample` |

**Acceptance:** Prose stop-slop ≥ 35/50 on these lines; no “cool” / “actually” / “still want”.

---

### Fix 6 — Craft structure (P1 · `redesign-structure`)

**Goal:** Mid-page fails slop test. Change anatomy, not only adjectives.

#### 6a — Section eyebrows

| Before | After |
|--------|--------|
| Every block: mono uppercase `THE GAP` / `WORKFLOW` / `THE CREW` / … | **At most 2** sections keep a kicker. Others: H2 only + stronger first sentence. |

Suggested keepers: problem section only, or none.

#### 6b — Agent roster (don’t delete; restructure)

| Before | After |
|--------|--------|
| 9 identical `photo + name + role + blurb + chips` cards | **Lead row:** Orchestrator + 3 PMs as larger horizontal/profile strip (different layout) |
| | **Then:** “Craft council” as compact list or 2-col text+link rows (no full portrait grid) for Journey, Craft, Motion, Frontend, Empathy |
| | Or: tabs “Managers / Critics / Process” with one portrait focus at a time |

**Copy add:** subhead `Nine seats. Not one freestyle model.` under H2.

#### 6c — Skills showcase

| Before | After |
|--------|--------|
| 6 equal `icon + badge + title + pitch + link` cards | **Featured 2** (EmpathFlow + Anti-slop) as larger asymmetric cards |
| | Remaining 4 as dense mono file list with one-line pitch + external link (not the same card shell) |

**Acceptance:** Screenshot mid-page — stranger less likely to tag “AI SaaS template.” Section skeletons differ.

---

### Fix 7 — Roster honesty (P2 · `label`)

**File:** `agent-roster.tsx` or parent section in `home-page.tsx`.

| Before | After |
|--------|--------|
| Implied full team of 9 | Eyebrow or subhead: `Highlights from the full crew` + link `AGENTS.md on GitHub` for complete list |

**Or** add missing seats (Product Analyst, Heuristic Auditor, Design System, Prose Critic, Report Writer) as compact text rows under the grid.

---

### Fix 8 — Motion nits (P2 · `motion-fix`)

| File | Before | After |
|------|--------|--------|
| `gap-demos.tsx` | `transition-all duration-200` | `transition-[background-color,color,border-color,box-shadow,border-radius] duration-200` (or only props that change) |
| `skills-showcase.tsx` | `transition-all` on cards | `transition-[border-color,box-shadow] duration-200` |
| `pipeline-demo.tsx` | `transition-all` on step buttons | `transition-[border-color,background-color,box-shadow]` |

**Acceptance:** Motion Critic still Approve; no `transition: all`.

---

### Fix 9 — DESIGN.md (P2)

After Fixes 3–6 land, update `web/DESIGN.md` “Launch homepage structure” to match shipped order (sample before crew).

---

## Implement order (suggested commits)

1. Fix 1 — honesty label (smallest honesty gate)  
2. Fix 4 — mobile Start  
3. Fix 5 + 3b — copy + sample CTA rewrite  
4. Fix 3a — move sample section in DOM  
5. Fix 6 — craft structure (biggest visual)  
6. Fix 7–8 — polish  

**Approves for 1, 4, 5, 3b:** Orchestrator + PM-Avery + Prose (copy) + Journey.  
**Approves for 3a + 6 (homepage structure):** full marketing set — Orchestrator · all PMs · Journey · Craft · Motion.

---

## Suggested Ideal Flows

### Avery (priority)

1. Land → read H1 + one sentence  
2. Copy `npx tastetest init` (or labeled local equivalent)  
3. See mini report in preview → open **full Acme sample** (honest chrome)  
4. Optional: crew depth  
5. Sticky/footer re-copy install  

### Jordan

1. Skim install honesty  
2. Open GitHub / skills/  
3. Confirm init wiring list matches pipeline demo  

### Sam

1. 5s craft scan — varied sections, serious sample  
2. Read Acme P0s with file paths  
3. Decide client-safe  

---

## Anti-regression notes

**Do not delete in a follow-up fix:**
- Install command + Copy labels  
- Run EmpathFlow copy path  
- SiriOrb / brand blue / Space Grotesk  
- Gap demos (repurpose, don’t strip)  
- Acme sample body  
- Sticky install  
- GitHub link  

**Dogfood process reports** stay in `tastetest-report/` — not as the marketing “sample output” chrome.

---

## Council / consensus

| Decision | Status |
|----------|--------|
| Report ship (scores + recs) | **PROCEED** — Orchestrator + score owners |
| `/report` chrome fix | **PROCEED** — **done** (`report/page.tsx` meta + header) |
| Homepage IA redesign + npm label | **BLOCK** implement until user requests execute with full Approves |
| Delete install / strip SmoothUI | **Veto** (preserve-first; dogfood retro) |

### Post-council implement (this run)

| Item | Done |
|------|------|
| `/report` header → Acme Checkout EmpathFlow report | ✓ |
| Metadata description → Acme sample (not dogfood) | ✓ |
| npm honesty label under install | ✓ |
| Sample promoted after How; full-weight section | ✓ |
| Hero CTA → See sample report | ✓ |
| Mobile Start nav always visible | ✓ |
| Skills/sample copy stop-slop | ✓ |
| Craft: lead managers + compact council; featured skills | ✓ |
| Motion `transition-all` removed | ✓ |
| DESIGN.md structure updated | ✓ |

**J2 after fixes:** Pass (chrome + early sample + proof excerpt).  
**CTA honesty:** Pass with label (npm unpublished path documented).  
Full talk protocol: `tastetest-report/council.md`.

---

## Definition of done (this run)

| Criterion | Status |
|-----------|--------|
| Preflight GO + PMs + priority | ✓ |
| Journeys multi-persona | ✓ |
| Hard gates scored | ✓ |
| Install path still obvious in UI | ✓ (honesty gap remains) |
| Constraints honored | ✓ |
| Craft ≥6 or redesign plan | Plan in P1 (score 5.5) |
| Motion Approve | ✓ |
| Prose when marketing in scope | Scored; rewrites proposed |
| `docs/personas.md` exists | ✓ |

---

*End of report. Implement only with consensus log Approves per `COLLABORATION.md`.*
