# Panel agent roster

Skills are the source of truth. Collaboration law: **`COLLABORATION.md`**.

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
| **standard** | Single page or flow UX | Orchestrator + Product + Journey + Heuristic + **priority PM only** + relevant critics |
| **full** | Homepage / marketing redesign / multi-surface | Full roster + **all** Persona Managers + **Isa (copy)** + design brief |
| **implement** | After report PROCEED | Only Approves required for touched surfaces; one **Executor**; critics re-score only |

Full crew is **expensive** — default to **standard** unless the surface is conversion-critical marketing or the user asks for full.

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
| 10 | **Frontend Design** | `FRONTEND.md` + `web/DESIGN.md` | Brief first · load DESIGN.md · then library proposals only |
| 11 | **Report Writer** | `REPORT.md` | Assemble; multi-persona coverage; no invented scores |

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
5. Frontend Design **asks** Orchestrator + all PMs for visual prefs (design brief)
   then library search · Craft · Motion · Prose · Isa · Design System
   (multi-persona impact on each proposal)
         ▼
6. Report
         ▼
7. Consensus log (evidence-cited Approves) → implement only if Approves met
   → one Executor applies plan; critics re-score (no mid-edit redesign)
```

**Parallel rule:** Workers in a fan-out must have **non-overlapping** tasks. Interdependent work stays serial in the pipeline.

**Frontend Design cannot invent taste.** No ui-ux-pro-max search or redesign until managers answer the brief (`FRONTEND.md` Step 0) **and** `design_system.status` is `loaded` or `missing-drafted` when UI is in scope (Step 0b / root `DESIGN.md`).

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
| Visual Approve without DESIGN.md section cite | Approve **void** — re-score |
| New UI pattern shipped without DESIGN.md update | Design System **drift/fail** until doc matches code |
| `doc_quality: rewrite` or `alignment: fail` | Design System Checker **Veto** visual implement until fixed |
| Implement without Approves | **BLOCK** |
| Harm secondary without PM Approve | **Persona coverage: weak** |

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
