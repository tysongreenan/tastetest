# Council — Homepage lean review (2026-07-24)

**Target:** `web/` @ `http://localhost:3000` (+ `/report`)  
**Scope:** Current lean homepage (`home-page.tsx` + `product-preview.tsx` + footer)  
**Posture:** Review only — no implement without consensus Approves

---

## Preflight

### Orchestrator → All | preflight | proposal

**Claim:** Full GO for homepage conversion review.  
**Evidence:** Personas file present · DESIGN.md present · live browser · npm 404 confirmed · init dry-run works from repo.  
**Preserve:** `npx panel init` + labeled Copy · honesty line · Sample report path · Product path preview · skill mono list · dark close install · SiriOrb brand.

| Item | Result |
|------|--------|
| Intent | Understand → copy install → trust proof |
| Marketing vs feature | Product marketing |
| Personas | Avery / Jordan / Sam + PM seats |
| Priority negotiated | Yes (below) |
| **GO / NO-GO** | **GO** |

---

## Persona priority council

### PM-Avery → Council | priority pitch

**Pitch:** Homepage is conversion. Install must be obvious; sample understandable in minutes.  
**Non-negotiable if secondary:** Obvious install; report clear fast.

### PM-Jordan → Council | priority pitch

**Pitch:** Engineers bounce on fake npm / toy demos. Init + OSS links must look real.  
**Non-negotiable if secondary:** Real init path; skill files / GitHub credibility.

### PM-Sam → Council | priority pitch

**Pitch:** Craft of marketing predicts craft of report. Sample must look client-safe.  
**Non-negotiable if secondary:** No toy UI; sample serious.

### Council decision

| Role | Persona | Priority |
|------|---------|----------|
| **PM-Avery** | Avery | **Priority** |
| **PM-Jordan** | Jordan | Secondary |
| **PM-Sam** | Sam | Secondary |

**Why:** Conversion audit on lean launch page.  
**Secondaries keep non-negotiables.** Harm checks required from Jordan + Sam on any cut to install honesty, GitHub, or sample quality.

---

## Product Analyst → Orchestrator | product

**Purpose:** Drop skills into a repo; agent runs buyer-level UX review; output scored Markdown with file paths.

| Promised | Reality |
|----------|---------|
| `npx panel init` | **Not on npm** (404). Repo path works: `node bin/panel.js init` dry-run → writes. Honesty line present. |
| Run a panel | Documented in steps + agent panel |
| Sample report | `/report` = Acme Checkout; metadata fixed |
| Skills in repo | Mono list links to real blobs |

**Code anchors:** `web/src/components/home-page.tsx`, `product-preview.tsx`, `site-footer.tsx`, `cli/init.js`, `web/content/sample-report.md`.

---

## Empathy Mapper + Persona Managers

### Avery (Priority)

| | |
|--|--|
| JTBD | Trustworthy read + fix tonight |
| Path | Skim hero → Copy → sample → try repo |
| This run | Install + honesty ✓ · sample in hero ✓ · close band command **invisible** ✗ |

### Jordan (Secondary)

| | |
|--|--|
| JTBD | Real, re-runnable process in codebase |
| Path | GitHub · skill files · init credibility |
| This run | Skill list ✓ · honesty ✓ · mobile GitHub icon **no accessible name** · no sticky recover after scroll |

### Sam (Secondary)

| | |
|--|--|
| JTBD | Client-safe report language |
| Path | Judge craft in 5s · open sample |
| This run | Lean craft improved ✓ · preview teaches report shape ✓ · close CTA looks broken (empty command) hurts trust |

---

## Journey Critic

### J1 — Land → understand → copy install (Avery · P1)

| Step | Result |
|------|--------|
| First impression | Clear product job in H1 |
| Primary action | Install block + Copy dominates |
| Honesty | “Not on npm yet” + repo command |
| Friction | **Close band repeats install but command is white-on-white** |

**Fluidity contribution:** Hero strong; close broken.

### J2 — See sample report (Avery + Sam)

| Step | Result |
|------|--------|
| Hero CTA | “Sample report” → `/report` |
| Report chrome | Acme Checkout · fictional · not dogfood |
| Preview Report tab | Scores + P0 + path — good micro-proof |

### J3 — Skills / OSS (Jordan)

Mono file list + Browse skills/ + GitHub. Sufficient depth for lean page. Mobile How/Skills nav hidden — acceptable if Install + footer survive.

---

## Heuristic Auditor (playbook)

| Gate | Score | Note |
|------|------:|------|
| Self-evident | 8 | Product job clear |
| Scan path | 8 | Short page |
| Primary action | 9 hero / 3 close | Close fails |
| No fake chrome | 8 | Tabs real; no traffic lights |
| Density | 9 | Earns place |
| Honesty | 8 | npm labeled |

**Hard gate:** Close install fails “obvious next action” and contrast.

---

## Design System Checker

**Loaded:** `web/DESIGN.md` launch order (lines ~180–194).

| Spec | Shipped |
|------|---------|
| Hero + install + preview | ✓ |
| Three steps | ✓ |
| Skills mono list | ✓ |
| Dark close install | ✓ (contrast bug) |
| Off homepage: crew / org / gap demos | ✓ removed |

**Drift:** Earlier DESIGN.md sections still describe Problem split, sticky install bar, sample band, crew — not on current homepage. Update DESIGN.md or restore surfaces intentionally.  
**max-w:** Shipped `max-w-5xl` vs some DESIGN notes `max-w-6xl` — minor.

---

## Craft Critic (ANTI-SLOP)

| Check | Result |
|-------|--------|
| Glance test | Pass — UX review in repo |
| Template test | Better — no card museum |
| Density | Pass |
| Hierarchy | Hero pass · close fail |

**Score: 7.5 / 10** (would be 8.5 without close contrast).  
No identical agent grids. Soft blue wash is brand-allowed. Gradient text limited to H1 phrase.

---

## Prose Critic (stop-slop-prose)

| Surface | Note |
|---------|------|
| H1 | Specific, scannable |
| Lead | Concrete nouns (scores, paths, tonight) |
| Steps | Three short lines — good |
| Skills | Filenames only — intentional lean |

| Dimension | /10 |
|-----------|----:|
| Directness | 8 |
| Rhythm | 7 |
| Trust | 8 |
| Authenticity | 8 |
| Density | 9 |
| **Total** | **40 / 50** |

---

## Motion Critic

| Motion | Verdict | Why |
|--------|---------|-----|
| Hero fade/y | Keep | Orientation |
| Gradient breathing | Keep | Ambient; reduced-motion static |
| SiriOrb | Keep | Brand |
| Preview tab auto-cycle | Keep (watch) | Teaches path; manual override real |
| Agent typing | Keep | Feedback; disabled when reduceMotion |
| Tab crossfade | Keep | State change |

**Motion: Approve · 8 / 10**

---

## Frontend Design brief (answered before proposals)

### Frontend Design → Managers | design brief | question

**Surface:** homepage (lean launch)

**Answers:**
- **Orchestrator:** Priority Avery. Preserve install + honesty + sample. Reduce > decorate. Fix close contrast first.
- **PM-Avery:** Feel calm/fast. Trust = real install + real report. Bounce = invisible CTA, npm lie. Sparse OK. Motion minimal.
- **PM-Jordan:** Product-grade (Linear-adjacent). Trust = mono skills + real init. Bounce = toy demos / broken CTA. Depth in GitHub. Motion purposeful only.
- **PM-Sam:** Refined type/density. Trust = preview + sample look serious. Bounce = empty install field, sloppy contrast. Motion rare.

**Library:** Light landing search only (funnel / install patterns). **DESIGN.md wins** over App Store mockup patterns.

### Proposals (reduction-first — not implement yet)

1. **Fix** close `InstallBlock` ink on dark band (add `text-foreground` on command code, or invert card tokens).  
2. **Clarify** GitHub nav: `aria-label="GitHub"` when label hidden.  
3. **Optional merge:** none required — page is already lean.  
4. **Do not add** crew/org/problem museum back without new council.

**Impact**
- Priority (Avery): help — close CTA works again  
- Secondary (Jordan): help — a11y GitHub  
- Secondary (Sam): help — close no longer looks broken  

---

## Consensus: ship report (review only)

- **Proposal:** Publish homepage lean Panel report; recommend P0 close contrast fix before any redesign.
- **Approves:** Orchestrator ✓ · Craft ✓ · Motion ✓ · Journey ✓ · Prose ✓ · PM-Avery ✓ · PM-Jordan ✓ · PM-Sam ✓  
- **Implement:** **not authorized** this turn — review only. User may request fix.

## Consensus: P0 close install contrast (if implement later)

- **Proposal:** Make `npx panel init` visible on dark close band; keep Copy + honesty.
- **Required Approves:** Orchestrator · Journey · Craft · PM-Avery (+ PM-Sam harm pass)
- **Status:** Proposed — awaiting implement request
