# Panel Report — Homepage (lean launch)

**Target:** `web/` @ `http://localhost:3000` (+ `/report`)  
**Date:** 2026-07-24  
**Preflight:** **GO**  
**Grounding:** strong (`docs/personas.md` + live Playwright + CLI/npm check)  
**Persona coverage:** full (priority + secondary harm pass)  
**Council:** `panel-report/council-homepage-lean.md`  
**Skills:** PANEL · COLLABORATION · playbook · ANTI-SLOP · MOTION · FRONTEND · stop-slop-prose · `web/DESIGN.md` · `docs/personas.md`

---

## Executive Summary

| Score | Owner | Value |
|-------|--------|------:|
| **Fluidity** | Journey Critic | **7.5 / 10** |
| **Professionalism** | Orchestrator (gates) | **7.5 / 10** |
| **Craft / Anti-slop** | Craft Critic | **7.5 / 10** |
| **Motion** | Motion Critic | **8 / 10** · **Approve** |
| **Conversion readiness** | Journey + Empathy | **7 / 10** *(hero strong; close broken)* |
| **Prose (landing)** | Prose Critic | **40 / 50** |

**Primary job of this page:** Get a skeptical founder to understand Panel and copy `npx panel init` (or the honest repo fallback).

**What works:** Lean structure matches the launch order in `DESIGN.md`. Hero install is obvious; honesty line labels npm reality; product path preview teaches Code → Agent → Report; sample lives in the hero; no crew/org card museum; prose is short and concrete.

**What fails the buyer:** The dark **“Start in your repo”** band re-offers install, but **`npx panel init` is white text on a white card** (computed color ~lab 98 on light surface). Visually the command is missing — only `$` and **Copy** show. That is a P0 conversion/craft defect on the final CTA.

### Persona priority (this run)

| Role | Persona | Priority |
|------|---------|----------|
| **PM-Avery** | Avery (founder) | **Priority** |
| **PM-Jordan** | Jordan (eng) | Secondary |
| **PM-Sam** | Sam (designer) | Secondary |

**Why:** Homepage conversion audit.  
**Secondary non-negotiables:** Jordan — real init / OSS credibility. Sam — sample client-safe; no toy craft.  
**Harm checks:** PM-Jordan, PM-Sam on honesty, GitHub, sample, and close CTA quality.

### Top 3 problems

1. **P0** Close install command invisible (white-on-white) — `home-page.tsx` dark band token remap misses command `code` color  
2. **P1** Mobile GitHub control: icon `aria-hidden`, label `hidden sm:inline` → link has no accessible name  
3. **P1** DESIGN.md mid-file still describes Problem / sticky install / crew / sample band while launch section + code are lean — doc drift

### Top 3 cuts/simplifications

*(Page is already reduction-biased. Prefer fix over add.)*

1. **Fix** close-band ink (do not delete the second install — recovery CTA earns its place once readable)  
2. **Relabel** mobile GitHub with `aria-label` (no new section)  
3. **Trim** DESIGN.md stale mid-page anatomy so system doc matches ship

### Preserve

| Item | Job |
|------|-----|
| `npx panel init` + labeled **Copy** | Primary conversion |
| “Not on npm yet” + `node bin/panel.js init` | Honesty until publish |
| Product path preview (real tabs) | Proof without museum |
| Sample report → `/report` (Acme) | Avery + Sam JTBD |
| Skills mono list + GitHub | Jordan credibility |
| SiriOrb + blue primary system | Brand |
| Dark close install band | Re-offer conversion |

---

## Density Notes

| | |
|--|--|
| **Overcrowded?** | No. Four jobs: convert, teach path, list skills, re-offer install. |
| **Competing for attention** | Hero gradient + preview + install — balanced; install still wins. |
| **Remove/combine** | Nothing essential to cut. Do not re-add crew/org/gap demos without council. |
| **vs prior dense build** | Large win — prior report’s “museum after sample” is gone. |

---

## Buyer Path

### Avery (priority)

1. **Land** — H1 self-evident: UX review in the repo.  
2. **Understand** — Lead: buyer stance + scores + file paths.  
3. **Install** — Terminal card + Copy; honesty prevents npm 404 rage.  
4. **Proof** — Sample report CTA + preview Report tab.  
5. **Scroll recover** — Close band should re-offer install → **fails** (command invisible).

**Friction (real only):** Close CTA looks empty/broken; undermines trust after a clean hero.

### Jordan

- Skills list + blob links + Browse skills/ → credible.  
- Honesty about npm → good.  
- Mobile: Install survives; How/Skills nav hidden (OK for lean); GitHub icon lacks name (a11y).  
- Init from repo works (`node bin/panel.js init --dry-run`).

### Sam

- Craft is calmer than prior portrait grids.  
- Sample page chrome is Acme, not dogfood.  
- Empty-looking final install is a craft fail that reads as “they don’t ship their own quality bar.”

---

## Product Understanding

| Promised | Reality |
|----------|---------|
| `npx panel init` | Not on npm (404). Honesty present. Repo init real. |
| Run a panel | Step 2 + agent panel |
| Sample report | `web/content/sample-report.md` Acme Checkout; `/report` metadata correct |
| Skills pack | Linked skill files exist in repo |

**Shipped page order:** Nav → Hero+install+preview → Three steps → Skills list → Dark close → Footer.  
Matches `DESIGN.md` “Launch homepage structure.”

---

## Personas & Empathy Maps

*From `docs/personas.md`; PM seats seated.*

### Avery — Priority

| | |
|--|--|
| **Says** | “Is this another AI toy?” |
| **Does** | Hero → Copy → sample → try |
| **Needs** | Obvious install; honest status; report shape |
| **This run** | Hero ✓ · honesty ✓ · close ✗ |

### Jordan — Secondary

| | |
|--|--|
| **Says** | “Show me the repo, not a SaaS tour.” |
| **Needs** | Real init; skills; GitHub |
| **This run** | Skills ✓ · honesty ✓ · mobile GH a11y weak |

### Sam — Secondary

| | |
|--|--|
| **Says** | “If marketing is sloppy, I won’t trust the report.” |
| **Needs** | Serious sample; intentional craft |
| **This run** | Sample ✓ · lean craft ✓ · close contrast ✗ |

---

## Critique scores (detail)

### Heuristic Auditor

| Gate | 1–10 | Note |
|------|-----:|------|
| Self-evident | 8 | |
| Density | 9 | |
| Hierarchy (hero) | 9 | |
| Hierarchy (close) | 3 | Invisible primary text |
| Professionalism | 7.5 | Capped by close + a11y |
| Fake affordances | 8 | Preview tabs work |

### Craft (ANTI-SLOP)

- Glance: pass  
- Template: improved (no 9-up agents, no identical skill cards)  
- Hard ban check: no traffic-light chrome; gradient text limited; wash is brand-blue not rainbow  
- **Defect:** Final conversion card fails hierarchy/contrast  

### Motion

Keep ambient orb/wash; keep preview cycle with reduced-motion off-ramp; no Block. **Approve.**

### Prose

Landing is already short. No essay rewrites needed. Optional: none (do not lengthen).

### Design system

Launch structure aligned. Update older DESIGN.md sections that still list Problem / sticky install / crew as if live.

---

## Recommendations (reduction-first)

1. **Fix — close install ink**  
   - **What:** Ensure command `code` (and `$`) use dark ink on the light card inside the dark band. Easiest: add `text-foreground` on the command row in `InstallBlock`, or extend the dark-band selector list.  
   - **Removes:** Invisible text (nothing added).  
   - **Why:** Skeptical buyer must re-read the command before copy; empty field destroys trust.

2. **Clarify — mobile GitHub name**  
   - **What:** `aria-label="GitHub"` on the header GitHub link.  
   - **Removes:** Silent control.  
   - **Why:** Jordan + a11y baseline; icon-only without name fails heuristics.

3. **Restructure (docs only) — DESIGN.md drift**  
   - **What:** Align mid-file anatomy with lean launch list; mark sticky install / crew as optional full-marketing, not current ship.  
   - **Removes:** Conflicting agent instructions.  
   - **Why:** Frontend Design and Design System Checker must share one truth.

4. **Do not add**  
   - New sections, testimonials, extra badges, crew portraits, or sticky bar until P0 is fixed and a new council prioritizes recovery chrome.

---

## Frontend Design proposals (brief answered)

See council for full manager answers. **No redesign authorized.** Only:

| # | Proposal | Type | Impact |
|---|----------|------|--------|
| 1 | Close-band contrast fix | Fix | Avery help · Sam help · Jordan neutral |
| 2 | GitHub `aria-label` | Clarify | Jordan help · others neutral |
| 3 | DESIGN.md sync | Docs | Process integrity |

Library search (landing funnel patterns) does **not** override DESIGN.md. No App Store mockup or extra step colors.

---

## Consensus log

### Consensus: publish this report

- **Approves:** Orchestrator ✓ · Journey ✓ · Craft ✓ · Motion ✓ · Prose ✓ · Heuristic ✓ · Design System ✓ · PM-Avery ✓ · PM-Jordan ✓ · PM-Sam ✓  
- **Implement:** **no** — review only  

### Consensus: implement report fixes (user requested)

- **Proposal:** Fix P0 close contrast · P1 GitHub `aria-label` · P1 DESIGN.md / FRONTEND.md lean sync.  
- **Approves:** Orchestrator ✓ · Journey ✓ · Craft ✓ · PM-Avery ✓ · PM-Sam harm pass ✓ · PM-Jordan ✓ (a11y)  
- **Status:** **Done** (2026-07-24 implement pass)

| Issue | Fix |
|-------|-----|
| P0 close white-on-white | `InstallBlock` card + command use explicit `text-foreground` |
| P1 mobile GitHub name | `aria-label="GitHub"` on header link |
| P1 doc drift | `web/DESIGN.md` + `FRONTEND.md` launch order aligned to lean ship |

**Post-fix verify:** close command color ~lab(5) dark on light card; GH aria-label present; screenshot `panel-close-band-after.png`.

---

## Evidence

| Check | Result |
|-------|--------|
| Live URL | `http://localhost:3000` 200 |
| npm | `npm view panel` → 404 |
| Init | `node bin/panel.js init --dry-run` → would-write/skip OK |
| Close `code` color | ~lab(98) light on light card — invisible |
| Hero `code` color | ~lab(5) dark — visible |
| `/report` title | Sample report — Acme Checkout · Panel |
| Screenshots | `panel-homepage-viewport.png`, `panel-homepage-full.png`, `panel-mobile-hero.png`, `panel-close-band.png` |

---

## Definition of success (this run)

Page is **lighter and clearer** than the prior dense homepage. One hard fail remains: final install command must be readable. Fix that before expanding the page.
