# Panel agent roster

Skills are the source of truth. Collaboration law: **`COLLABORATION.md`**.

When a run is managed by the npm execution harness, `.panel/runs/<run-id>/state.json` is authoritative for phase order. Agents may create review artifacts in the active phase, but must not claim a phase complete outside `panel harness advance`. Product/code writes require an active registered permit; see `docs/harness.md`.

Every managed-run artifact must carry the active run ID using the provenance contract in `docs/harness.md`; a correct path without a matching stamp is stale and inadmissible.

## Install

```bash
npx @tysongreenan/panel init
```

Then: **Run a panel** or Cursor **`/panel`**.

---

## Protocol pack (Orchestrator declares every run)

| Pack | Load | When |
|------|------|------|
| **short** | `PANEL.md` + `playbook.md` (+ craft/motion skills as needed) | Buyer density pass, single surface, lite craft |
| **full** | short + `PANEL.full.md` + `COLLABORATION.md` + this file + `docs/personas.md` + `COPY.md` (marketing) | Multi-persona council, homepage/marketing, implement after report |

Write the choice into **`panel-report/run-state.yaml`** (`protocol: short | full`).  
Do not half-load the full crew while pretending it is a short pass.

### Shared run-state (context engineering)

At Phase 0, copy `docs/run-state.template.yaml` → `panel-report/run-state.yaml` and fill it.

Every specialist **reads** run-state before working. Orchestrator **updates** priority, preserve, brief, **design_system**, scores, approves, artifact paths.  
Handoffs reference artifacts and run-state fields — they do not re-tell the whole run (anti–telephone-game).

### Skill-use proof (anti-fake-seat rule)

Naming a seat is not enough. For every in-scope specialist, the run must show:

- which skill file(s) were loaded
- one concrete rule / checklist / framework pulled from that skill
- the artifact or recommendation where that skill changed the outcome

If a seat is named in a standard/full run but its skill is not visibly used, treat that seat as **not actually seated**.

### Minimum seat artifacts (standard/full)

Every in-scope specialist seat must have a concrete artifact path in `panel-report/`. Final-report mentions do not count as the seat artifact.

| Seat | Minimum artifact |
|------|------------------|
| Orchestrator Manager | `panel-report/council.md` |
| Product Analyst | `panel-report/product.md` |
| Empathy Mapper | `panel-report/empathy.md` |
| Journey Critic | `panel-report/journeys.md` |
| Heuristic Auditor | `panel-report/heuristics.md` |
| Design System Checker | `panel-report/design-system.md` |
| Craft Critic | `panel-report/craft.md` |
| Prose Critic | `panel-report/prose.md` |
| Isa · Marketing Copywriter | `panel-report/copy.md` |
| Motion Critic | `panel-report/motion.md` |
| Frontend Design | `panel-report/frontend.md` |
| Report Writer | `panel-report/report.md` |
| Implementation Verifier | `panel-report/verification.md` |

If a seat is in scope and its minimum artifact is missing, that seat is **invalid** even if it is mentioned elsewhere.

### Required run artifacts (standard/full)

In addition to seat artifacts, every standard/full run writes:

- `panel-report/hypotheses.md` before consensus
- `panel-report/learning.md` after verification, or after the final review decision when no implementation occurs
- `panel-report/findings.json` as the deduplicated machine-readable recommendation ledger

The Orchestrator owns both ledgers, but specialists must update the entries they challenge or validate. A conversation that changes no artifact, decision, hypothesis, or test is non-work and must not count as consultation, critique, or approval.

Start from `docs/hypotheses.template.md` and `docs/learning.template.md`; do not replace them with unstructured meeting notes.

Start structured findings from `docs/findings.template.json` and validate against `docs/findings.schema.json`. Markdown artifacts provide reasoning; `findings.json` is the canonical index for severity, confidence, evidence, ownership, persona impact, acceptance checks, and status. One user problem gets one finding ID even when several specialists support it.

### Calibration pack (define "good" before proposing)

For standard/full visual work, resolve `docs/design-calibration.md` at preflight. The Orchestrator records 2–4 approved positive references, 1–3 anti-references, and the exact transferable traits in run-state. References are evidence, not a license to clone another product.

Frontend, Craft, Motion, and Design System must cite the relevant calibration trait in their artifacts. If the pack is missing, they may audit the existing product and draft it before redesign; they may not silently invent a visual direction.

### Implementation proof (rendered experience, not code presence)

Every standard/full UI implementation seats an **Implementation Verifier** after the Executor. The verifier must inspect the running product in a real browser and write `panel-report/verification.md` with:

- desktop and mobile screenshots for each touched surface
- default, hover, focus-visible, active/pressed, loading, empty, error, disabled, and success states when applicable
- keyboard path, focus order, overflow, readable zoom, and reduced-motion checks
- WCAG 2.4.11 Focus Not Obscured evidence at desktop and mobile with sticky/persistent overlays present; a completely hidden focused component blocks `PASS`
- comparison against the approved proposal, preserve list, DESIGN.md, and calibration traits
- regressions found, owner, fix status, and final `PASS | REVISE | BLOCK`

Source review, DOM inspection, tests, or a build passing may support this evidence but cannot replace rendered browser proof. A missing applicable state must be marked `n/a` with a reason, not omitted.

If the running product or browser is unavailable, the verifier records `BLOCK` with the exact blocker. It must never substitute static inspection and emit `PASS`.

Use `docs/verification.template.md` as the minimum verification shape. Capture before-state or approved-proposal evidence before implementation whenever visual regression comparison is in scope.

### Design system (visual alignment — reliable)

| Step | Owner | Action |
|------|-------|--------|
| Resolve path | Orchestrator Phase 0 | Root [`DESIGN.md`](DESIGN.md) → usually `web/DESIGN.md` |
| **Own DESIGN.md health** | **Design System Checker** | Skill: [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) + [`skills/design-md/`](skills/design-md/) |
| Load + audit | Design System Checker | `status`, constraints, `alignment`, **`doc_quality`**, artifact `panel-report/design-system.md` |
| Load for proposals | Frontend Design Step 0b | Must not re-score alignment; cites sections only |
| Propose UI | Frontend Design | Cite DESIGN.md sections; library loses on conflict |
| Ship | Executor | Same change updates DESIGN.md if pattern is new (**Checker Approves**) |
| Approve visual | Craft + **Design System Checker** (+ Frontend as required) | Evidence names a **DESIGN.md section** |

**Owner:** only **Design System Checker** may set `alignment` / `doc_quality` or propose structural DESIGN.md rewrites.  
**Block** Frontend library search, redesign, and visual implement if `design_system.status` is null/`missing-blocked` while UI is in scope.  
**Veto:** Checker vetoes layout/homepage ship when `alignment: fail` or `doc_quality: rewrite`.  
Agent contract: [`web/DESIGN.md`](web/DESIGN.md#agent-contract-all-visual-seats).

---

## Run classes (scale seats to the job)

| Class | When | Seats (approx) |
|-------|------|----------------|
| **lite** | One component / focus ring / tiny craft fix | Orchestrator + 1 domain critic |
| **standard** | Single page or flow UX; section modernization; directional visual refresh without homepage rewrite | Orchestrator + Product + Journey + Heuristic + **priority PM only** + relevant critics |
| **full** | Homepage / marketing redesign / multi-surface | Full roster + **all** Persona Managers + **Isa (copy)** + design brief |
| **implement** | After report PROCEED | Only Approves required for touched surfaces; one **Executor**; critics re-score only |

Full crew is **expensive** — default to **standard** unless the surface is conversion-critical marketing, spans multiple surfaces, changes the selling narrative, or the user asks for full.

Set `run_class` in run-state at preflight. Skipping run-class selection on a multi-role run is a process failure.

---

## Core crew

| # | Agent | Skill | Job |
|---|--------|-------|-----|
| 1 | **Orchestrator Manager** | `PANEL.md` | Preflight, phase order, mediate, report ship |
| 1b | **Persona Managers (×N)** | `docs/personas.md` | One per persona — advocate, negotiate priority, veto harm |
| 2 | **Product Analyst** | `PRODUCT.md` | Promised vs shipped · copy ban list · benefits Isa may use |
| 3 | **Empathy Mapper** | `EMPATHY.md` | Maps + quality; seat PM-* |
| 4 | **Journey Critic** | `JOURNEY.md` | Flows for **all** in-scope personas; persona-as-success measure |
| 5 | **Heuristic Auditor** | `playbook.md` | Hard gates · Occam · a11y smoke · states |
| 6 | **Design System Checker** | `DESIGN-SYSTEM.md` + `skills/design-md/` · living `web/DESIGN.md` | **Owns** DESIGN.md currency + professional quality · alignment · veto stale/fail |
| 7 | **Craft Critic** | `ANTI-SLOP.md` | Visual craft · evidence-based anti-slop · +/− refs · DESIGN.md don’ts |
| 8 | **Prose Critic** | `skills/stop-slop-prose/` | Anti-slop writing polish |
| 8b | **Isa · Marketing Copywriter** | `COPY.md` + `skills/marketing-copy/` | StoryBrand · DMMT · WHO/WHY/WHAT · PAS · product-show · CTA |
| 9 | **Motion Critic** | `MOTION.md` + `skills/motion/` | Motion |
| 10 | **Frontend Design** | `FRONTEND.md` + `web/DESIGN.md` + Impeccable `4.x` when installed | Brief first · load DESIGN.md · optional Impeccable mode/playbook/craft-floor · then library proposals |
| 11 | **Report Writer** | `REPORT.md` | Assemble; multi-persona coverage; no invented scores |
| 12 | **Implementation Verifier** | `playbook.md` + browser evidence | Post-build state, responsive, interaction, a11y, visual-regression proof |

### Panel default Persona Managers

| Seat | Persona | Non-negotiable if secondary |
|------|---------|------------------------------|
| **PM-Avery** | Avery (founder) | Obvious install; report clear in minutes |
| **PM-Jordan** | Jordan (eng) | Real init / OSS credibility |
| **PM-Sam** | Sam (designer) | Sample looks serious, not a toy |

---

## Phase order (Orchestrator enforces)

```
0. Preflight
   ├─ run_class + protocol pack → write run-state.yaml
   ├─ Intent + preserve list
   ├─ Personas exist? (standard/full)
   ├─ Seat Persona Managers (PM-*)
   ├─ Declare in-scope specialist skills + expected artifacts
   └─ Priority council → Priority / Secondary / Deferred
         │
         GO
         ▼
1–2. Product + maps
         ▼
3. Journeys (all in-scope PMs; weight priority)
         ▼
4. Critique — parallel read wave when possible
   (craft ∥ motion ∥ prose ∥ heuristics on frozen journey artifacts)
   then Orchestrator / Report Writer merges; any Block holds
         ▼
4b. **Marketing surfaces:** Isa (COPY) — SB7 map · scan hierarchy · product-show options
   (before Frontend redesign; Prose polishes after story is right)
         ▼
5. Frontend Design **asks** Orchestrator + seated PMs for visual prefs (design brief)
   then loads DESIGN.md · optional Impeccable 4.x surface mode/playbook · library search · Craft · Motion · Prose · Isa · Design System
   (`standard`: Orchestrator + priority PM by default; `full`: all PMs; may propose new sections when a persona-needed page job is missing)
         ▼
5b. Cross-critique — adjacent specialists challenge frozen proposals
   → each challenge must mutate a proposal/hypothesis/test or explicitly uphold it with evidence
         ▼
6. Hypothesis ledger + Report
         ▼
7. Consensus log (evidence-cited Approves + hypothesis IDs) → implement only if Approves met
   → one Executor applies plan; critics re-score (no mid-edit redesign)
         ▼
8. Implementation Verifier checks the rendered UI at desktop + mobile
   → fixes are verified again → PASS is required for SHIPPABLE
         ▼
9. Learning loop — compare predicted vs observed outcomes
   → update learning.md and the correct system of record; seed unresolved tests for next run
```

**Parallel rule:** Workers in a fan-out must have **non-overlapping** tasks. Interdependent work stays serial in the pipeline.

**Frontend Design cannot invent taste.** No ui-ux-pro-max search or redesign until the required managers answer the brief (`FRONTEND.md` Step 0) **and** `design_system.status` is `loaded` or `missing-drafted` when UI is in scope (Step 0b / root `DESIGN.md`). This blocks arbitrary taste-making, not persona-grounded structural direction or section-level modernization in `standard`.

### Priority council (not single-persona tunnel vision)

1. Each **Persona Manager** pitches for priority **this run**.  
2. Council sets **Priority** + **Secondary non-negotiables**.  
3. Later work must check: help priority? **hurt secondary?** → that PM must Approve.  
4. File “primary” is a **proposal**, re-negotiated each full run.

### Blocking

| Missing | Result |
|---------|--------|
| Personas | **NO-GO** |
| Priority never negotiated (full run) | **NO-GO** |
| Design brief unanswered (full UI work) | Frontend **BLOCKED** — no library/search/redesign |
| `design_system.status` not loaded/drafted (UI in scope) | Frontend + Executor **BLOCKED** — no invent taste |
| In-scope specialist skill not loaded / evidenced | Seat is **invalid** — do not count its score, approve, or recommendation |
| In-scope specialist minimum artifact missing | Seat is **invalid** — do not count its score, approve, or recommendation |
| Visual Approve without DESIGN.md section cite | Approve **void** — re-score |
| New UI pattern shipped without DESIGN.md update | Design System **drift/fail** until doc matches code |
| `doc_quality: rewrite` or `alignment: fail` | Design System Checker **Veto** visual implement until fixed |
| Implement without Approves | **BLOCK** |
| Harm secondary without PM Approve | **Persona coverage: weak** |
| Generic recommendation with no surface, evidence, expected effect, or acceptance check | Recommendation **void** |
| Proposal has no hypothesis ID and falsifiable test | Proposal **incomplete** — no consensus |
| Required cross-critique causes no recorded mutation or evidence-based uphold | Consultation **void** |
| UI implementation without rendered browser proof | **BLOCKED** — implemented, not SHIPPABLE |
| Required state omitted without an `n/a` reason | Verification **incomplete** |
| Visual regression or preserve-list regression unresolved | **REVISE** or **BLOCK** |
| Confirmed learning not routed to a system of record | Run **incomplete** — do not close learning loop |
| `panel validate` reports any error | Run **invalid** — never claim SHIPPABLE |

### Failed-run definition

A run fails even if every document exists when the shipped result is generic, visibly regresses the product, misses an applicable interaction state, contradicts the approved direction, or cannot prove a better persona journey in the browser. Process compliance is necessary; outcome quality is the release gate.

### Homepage / marketing redesign Approves

Orchestrator · **all Persona Managers** · Journey · Craft · Motion · **Design System Checker** · **Isa**  
(+ Prose if long-form polish). Frontend proposes layout only; Isa owns selling narrative; Checker owns DESIGN.md health.

---

## Talk + consensus

Handoffs and consensus templates: **`COLLABORATION.md`**.

Before implement, always include **multi-persona impact**.

---

## Skills map

| Path | Domain |
|------|--------|
| `PANEL.md` | **Default** buyer review — reduction bias, density-first (short) |
| `PANEL.full.md` | Full multi-agent crew (personas, council, craft/motion gates) |
| `COLLABORATION.md` | Permissions, Persona Managers, consensus |
| `PRODUCT.md` | Product Analyst — promised vs shipped |
| `EMPATHY.md` | Empathy Mapper — maps + PM seats |
| `JOURNEY.md` | Journey Critic — paths + persona success measure |
| `playbook.md` | Heuristic Auditor — DMMT, Occam, a11y, states |
| `REPORT.md` | Report Writer — assemble only |
| `docs/personas.md` | Product humans + PM seats |
| `docs/crew-isa.md` | Isa hire brief |
| `docs/skills-audit.md` | Why these skills (X + market sources) |
| `DESIGN.md` (root) | Router → marketing system path |
| `DESIGN-SYSTEM.md` | **Design System Checker** seat — audit / quality / gates |
| `web/DESIGN.md` | Marketing design system + **Agent contract** (living SoT) |
| `skills/design-md/` | Deep pack: AUDIT · QUALITY · STARTER |
| `ANTI-SLOP` / `MOTION` / `FRONTEND` / `COPY` | Domain skills |
| `skills/marketing-copy/` | Isa deep pack: SB7, DMMT, product-show, frameworks-x |
| `skills/*` | Deep packs |
