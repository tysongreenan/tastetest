# PANEL.full.md

## Panel — full multi-agent buyer review

When the user asks to “run a panel”, “do a UX review”, “Panel review”, or similar with full crew, follow these instructions precisely.

### Goal
Act as a realistic buyer or end-user. Understand the product from the codebase, generate personas + empathy maps, derive critical user goals and journeys, then rigorously evaluate whether the experience feels fluid, professional, and conversion-ready. Produce a clear, actionable Markdown report.

**You are a reviewer and coach — not a product owner of the client’s business strategy.** Improve the experience *in service of* the product’s intended install/conversion path and stated design constraints. Do not “win” the audit by deleting the product’s identity.

**Orchestrator Manager owns phase order.** No specialist runs a full critique until preflight passes. Skipping phases is a product failure, not a speed optimization.

**Persona Managers (plural):** Every persona in `docs/personas.md` (or drafted this run) has a **Persona Manager** who advocates for that person. They **collaborate** on who is **priority for this run**, but **must not erase** secondary personas. Single-persona tunnel vision is a process failure.

**Permissions & consensus:** Specialists do not act alone. See **`COLLABORATION.md`** — permission matrix, handoff protocol, persona priority council, and required consensus log **before any implement**. Domain owners hold **Approve/Veto** in their lane; Orchestrator cannot greenwash their veto.

**Companion skills** (load when in scope):

| Skill | When |
|-------|------|
| `ANTI-SLOP.md` | Visual UI — template DNA / “AI-looking” layout |
| `MOTION.md` + `skills/motion/` | Any motion, transitions, marketing animation |
| `COPY.md` + `skills/marketing-copy/` | **Isa** — StoryBrand, selling hierarchy, product-show concepts |
| `skills/stop-slop-prose/` | Microcopy anti-slop polish (after Isa sets the story) |
| `FRONTEND.md` + `skills/ui-ux-pro-max/` | Design system / premium pattern library before build |

Panel covers buyer/UX. Frontend Design grounds style in a searchable library. Anti-slop, motion, and prose still gate what ships. Full roster: `AGENTS.md`.

### Core Philosophy (Don’t Make Me Think)
- Design should be self-evident. If the user has to stop and think, we failed.
- Users scan pages; they don’t read them. Design for scanning.
- Conventions are your friends.
- Clarity beats cleverness every time.
- Omit needless words. Kill happy talk and filler.
- Navigation must always answer: Where am I? What can I do here? Where can I go next?
- Reduce cognitive load aggressively.
- Good design feels effortless. Professional products make the right action the obvious action.

---

### Failure modes to avoid (dogfood lessons)

Panel’s first self-review made the homepage *more pure* and *less useful*. Encode these mistakes:

| What went wrong | Why it hurt | Correct behavior |
|-----------------|-------------|------------------|
| **Over-corrected honesty** | Treated “CLI not fully shipped” as reason to *remove* `npx … init` copy | Keep the intended install pattern; **fix or label** it (works / partial / roadmap) |
| **Deleted the conversion path** | Replaced copy-install with abstract “2 steps” prose | Primary conversion UI stays primary; polish it |
| **Purity over intent** | Hard gates outranked landing copy, README, and user constraints | Intent and constraints are **inputs**, not optional flavor |
| **Removed components instead of giving them jobs** | SmoothUI widgets judged “demo tax” → stripped | Prefer **repurpose** (real job + clear copy) over delete |
| **Confused brand motion with false affordance** | Scramble/orb treated as defects | Decorative polish is fine; **lying controls** are not |
| **Auditor rewrote the product** | Report → rewrite that no longer matched Panel’s story | Recommend fixes that still feel like *this* product |
| **No preserve list** | Nothing marked “do not remove” | Explicitly list sacred paths before recommending cuts |
| **Narrative without craft** | Strong scroll story + template section DNA (eyebrows, 01–04 cards, fake window chrome) | Score **Craft / Anti-slop** separately; redesign structure, not only copy |
| **Explaining ≠ designing** | “Show what the product does” became four identical explanation zones | Prefer one excellent real artifact over many generic demo grids |

---

### Preserve-first rule (mandatory)

Before recommending removal of any primary CTA, install command, pricing block, signup, or user-requested library/pattern:

1. **Name the buyer job** it serves (e.g. “import skill into codebase”).
2. Prefer this order: **Clarify → Label honesty → Fix behavior → Relocate → Remove (last resort)**.
3. If removing, state **what replaces it** for the same job — never leave a hole.

**Never remove** a documented primary install/conversion path solely because implementation is incomplete. Incomplete → honesty label + implement path in recommendations, not UI amputation.

---

### Manager preflight (mandatory — Phase 0)

**Orchestrator Manager runs this first. No journey critique, craft audit, motion review, or UI rewrite until Phase 0 is complete.**

#### 0A — Scope
- What is under review (URL, routes, repo area)?
- Is this **product marketing / positioning** for the company that owns the repo, or a **feature/app audit**?
- User constraints this session (libraries, preserve install CTA, etc.)

#### 0B — Intent pack (must capture)
- README / landing / `docs/*` promised flows  
- `DESIGN.md` (or note missing)  
- Primary conversion path (install, signup, buy…)  
- **Who is this for?** → see 0C  

#### 0C — Personas / ICP gate (blocking)

| Check | Pass if |
|-------|---------|
| Personas exist | `docs/personas.md` or `PERSONAS.md` with **≥2** personas (who, context, JTBD, pains, gains) **or** Empathy Mapper just produced them in this run |
| Grounded | Each persona has a **code or product anchor** (route, feature, job) — not names only |
| **Persona Managers seated** | One **Persona Manager** assigned per persona (name them: e.g. “PM-Avery”, “PM-Jordan”) |
| Priority not assumed | Priority is **negotiated** in 0C-bis — default file “primary” is a starting proposal, not law |

**If personas are missing:**

1. **STOP** specialist audits (no craft/motion/full journey scores yet).  
2. Run **Empathy Mapper only** → draft personas into the report **and** write/update `docs/personas.md` when the task is building or dogfooding **this** product’s marketing.  
3. Orchestrator + Persona Managers **review** personas (not empty stereotypes: “User”, “Admin”).  
4. Run **0C-bis** priority council.  
5. Only then proceed to journeys and critique.

**If the user asks only for a quick craft pass** on one component: preflight may be **lite** (intent + preserve list only), but the report must say `Preflight: lite — personas not established`. Full Panel / homepage / marketing work = **full preflight, no exceptions**.

#### 0C-bis — Persona priority council (blocking on full runs)

After personas exist, **do not** silently pick one human and ignore the rest.

1. **Seat Persona Managers** — one advocate per persona. Their job is that person’s success criteria, pains, and veto on harm.  
2. **Each Persona Manager states:**
   - Why *their* persona should be priority for *this* run (scope, funnel stage, risk)  
   - What must **not** be broken for them even if they are not priority  
3. **Council negotiates priority for this run** (not forever):
   - **Priority persona** — conversion and journey #1 scoring weight  
   - **Secondary personas** — explicit “keep in mind” list with non-negotiables  
   - **Out of scope this run** (optional) — only with written reason; never silent drop  
4. **Multi-persona impact check** (required on every major proposal later):
   - Does this help priority?  
   - Does it **harm** any secondary? If yes → revise or get that Persona Manager’s Approve  
5. **Record in report + council log:**

```markdown
### Persona priority (this run)
| Role | Persona | Priority |
|------|---------|----------|
| PM-<Name> | … | Priority / Secondary / Deferred |
**Why priority:** …
**Secondary non-negotiables:** …
**Harm checks required from:** PM-… 
```

**Tunnel vision ban:** Designing or scoring only for the priority persona while harming secondaries without their Manager’s Approve is a **failed run**. Cap Professionalism ≤ 6 and mark `Persona coverage: weak`.

#### 0D — Preserve list
Primary CTA, install command, brand, user-requested patterns — named before any “fix.”  
Also list **secondary persona non-negotiables** from 0C-bis.

#### 0E — Go / No-go

| Status | Meaning |
|--------|---------|
| **GO** | Intent + personas + **Persona Managers seated** + **priority negotiated** + preserve list |
| **NO-GO** | Missing personas, or priority never negotiated on a full review — preflight + persona work only |

**Orchestrator never:**
- Skips to craft/UI redesign before personas + priority council  
- Picks a single persona in silence (“we’ll just do Avery”) without secondary non-negotiables  
- Lets Frontend/Craft ship copy that maps only to priority and breaks a secondary non-negotiable  
- Lets any role implement without Approves in `COLLABORATION.md`  
- Breaks a domain or **Persona Manager Veto** without user override on the record  

**Persona Managers never:**
- Rubber-stamp harm to their persona to “move faster”  
- Demand every screen optimize only for them when they lost priority negotiation fairly  

---

### Council rules (talk → consensus → act)

1. **Propose** — domain role or Persona Manager writes a short proposal (claim + evidence).  
2. **Consult** — required peers **and relevant Persona Managers** object or approve.  
3. **Consensus log** — Approves / vetoes / **priority persona** / **secondary harm check** / preserve list.  
4. **Only then Execute** — implement or publish scores.  

If one model plays all roles, **still write** proposals and consensus (or `panel-report/council.md`). Silent multi-role telepathy is forbidden. **Label each Persona Manager** when speaking for that human.

**Conflict defaults:** Craft > Frontend on slop · Motion > Frontend on animation · Persona Managers own their human’s truth · Empathy Mapper owns map quality · Orchestrator mediates priority · unresolved → BLOCK and ask user.

---

### Phase order (Orchestrator enforces — do not reorder)

```
0. Preflight (intent, personas, seat Persona Managers, priority council, preserve) → GO/NO-GO
1. Product understanding (if not done in 0)
2. Personas finalized + priority table signed
3. Critical journeys (from ALL in-scope personas’ jobs; weight priority)
4. Journey critique + hard gates (score priority first; note secondary friction)
5. Design / craft / motion / prose / frontend
   - Frontend Design **must interview Orchestrator + all Persona Managers** for visual prefs (FRONTEND.md Step 0) before any library search or redesign
   - Then multi-persona impact check on proposals
6. Report + recommendations (by persona where useful)
7. Council consensus then fixes — never fix before Approves
```

**Rule:** Journeys are derived **from** personas. Scores without personas are **ungrounded** — mark report `Grounding: weak` and cap Professionalism ≤ 6.  
**Rule:** No specialist **executes** without required Approves — including **Persona Manager Approves** when their non-negotiable is touched.  
**Rule:** Priority ≠ only customer. Secondary personas stay in the room.

---

### Intent & constraints intake (part of Phase 0)

Capture and honor:

- README / landing copy / `docs/*` promised flows
- `DESIGN.md` and brand decisions
- Explicit user constraints this session (e.g. “use SmoothUI”, “CLI copy is primary”)
- What the product is *trying* to be, not only what is cleanest abstractly
- **Priority persona** (this run) and their #1 JTBD  
- **Secondary personas** and their non-negotiables  

If the audit would contradict those, **call the tension out** in the report instead of silently “winning.”

---

### Hard gates (fail → cap professionalism ≤ 6)

Check every time. These flag *problems* — they do not automatically authorize *deletion*.

1. **CTA honesty** — Primary CTA’s promise matches reality *or* is labeled (e.g. “coming soon”) and not the only path. Prefer fixing the backend/`init` over removing the install UX.
2. **False affordances** — No Play without video, tabs that don’t switch, filters that don’t filter. Fix the control or the label; don’t nuke the whole section if the section’s job is valid.
3. **Heading semantics** — Main H1 isn’t a fake control. Motion on part of the title is OK if structure stays a real heading.
4. **Primary action visibility** — Strongest visual weight + **visible text** (not icon-only) for conversion actions.
5. **Demos earn their place** — Interactive chrome should teach, preview, or filter something real. If not: give it a job or demote — delete only if it blocks the primary path.
6. **Show the artifact** — Products that produce reports/exports should preview them.
7. **Mobile parity** — Critical nav/CTAs available without a desktop-only dead end.
8. **Anti-slop (craft)** — Run `ANTI-SLOP.md` slop test. If craft score ≤ 5, professionalism cannot exceed 6. Template DNA (identical cards, fake browser chrome, eyebrow-every-section) is P0 when it materially damages the primary surface or trust; otherwise classify it P1/P2 by the shared severity rules.
9. **Motion craft** — Run `MOTION.md`. Feel-breaking easing, `scale(0)`, animated keyboard/high-frequency actions, or missing reduced-motion → cap professionalism ≤ 6. Prefer delete over decorate.
10. **Marketing narrative (Isa)** — On homepage/landing, fill SB7 + product-show options via `COPY.md` before Frontend redesign.  
11. **Prose craft** — Run `skills/stop-slop-prose/` on visible copy after story is right. Marketing/report text that scores &lt; 35/50 on stop-slop dimensions should be revised (not only UI).

---

### Fix guardrails (when implementing or suggesting patches)

0. **Consensus first** — write Approves per `COLLABORATION.md`; no drive-by multi-file redesigns.
1. **One job per recommendation** — e.g. “add Copy label to CLI button,” not “replace hero with new IA.”
2. **Minimum viable fix** — smallest change that clears the *UX* gate — unless craft also failed; then the fix must change **structure**, not only labels.
3. **Component library respect** — If the project chose a component set, keep using it unless it *cannot* serve the job; then say why.
4. **Before/after job check** — After a fix, the buyer can still complete: understand → try/install → see proof.
5. **No silent product changes** — Report must list “preserved intentionally” and “changed.”
6. **Second-pass sanity** — If a fix removes the primary CTA, brand mark, or install command, **stop and revise the fix**.
7. **No slop-for-slop rewrites** — Replacing one template section with another template section is not a fix. See `ANTI-SLOP.md` bans.
8. **When implementing UI**, follow `ANTI-SLOP.md` build mode (anti-references, varied section anatomy, slop test before done). **Craft Critic Approve required.**
9. **When touching motion**, follow `MOTION.md` remedial hierarchy. **Motion Critic Approve required.**
10. **When writing or editing marketing copy**, seat **Isa** (`COPY.md`) for SB7 + product-show; then prose stop-slop + **Prose Critic Approve**; persona-facing headlines need **priority PM** / Empathy Mapper consult.

---

### Process

**0. Orchestrator preflight** (see above) → **GO** or **NO-GO**  
   - On NO-GO: deliver preflight status + persona draft only; stop.
   - On GO: include **Persona Managers** + **priority table** + secondary non-negotiables.

1. **Understand the product** (if gaps remain after 0)
   - Scan routes, pages, components, forms, navigation, tokens, README, package.json, landing docs.
   - **Design System Checker:** `DESIGN-SYSTEM.md` + `skills/design-md/` — resolve path, audit alignment + doc_quality, write `design_system` in run-state + `panel-report/design-system.md`. If missing on client, draft starter (`missing-drafted`).
   - Infer purpose, features, user goals.
   - Note promised vs implemented features.
   - Confirm **preserve list**.

2. **Personas finalized + priority council** (blocking)
   - Prefer load `docs/personas.md` / `PERSONAS.md` if present; else Empathy Mapper drafts 2–3.
   - Full empathy maps: Who + context · JTBD · Says/Thinks/Does/Feels · Pains & Gains · Code anchors  
   - **Seat a Persona Manager per persona.**  
   - **Negotiate** priority for this run; record secondary non-negotiables (never only one name).  
   - For the product’s own marketing site: **persist** personas to `docs/personas.md`.  
   - Orchestrator **signs off** before step 3.

3. **Define critical user journeys**
   - Each journey maps to a persona’s JTBD (cite which persona + which Persona Manager).
   - Cover **priority** journeys first; include **≥1 journey or success check per secondary** in scope.
   - Always include: first impression, **primary try/install**, proof/evaluation when relevant.
   - Success criteria per journey.

4. **Test to the max**
   - Browser tools + URL when available; else deep static analysis (note limit).
   - Run **Hard gates**, **Preserve-first**, **ANTI-SLOP.md**, **MOTION.md**, and **prose stop-slop** when in scope.
   - Judge fluidity, hierarchy, professionalism, **craft**, **motion**, copy quality, empty/error/loading, cognitive load.
   - Critique through **priority persona** first, then **secondary harm pass** (each Persona Manager).

5. **Output a structured report**
   - Executive Summary (Fluidity, Professionalism, **Craft / Anti-slop**, **Motion**, conversion readiness 1–10 · top issues · quick wins)
   - **Preflight status** (GO/NO-GO, persona source, **priority table**, Persona Managers)
   - Product Understanding (**include Preserve list + constraints**)
   - Personas & Empathy Maps (**priority + secondaries**; each with Manager)
   - Critical Journeys (**persona-linked**; multi-persona coverage)
   - Journey Critique (evidence; note which persona is hurt/helped)
   - **Design system health** (Design System Checker: alignment · doc_quality · matrix · constraints · ship gate)
   - Design System & Heuristic Evaluation (Hard gates pass/fail; cite design_system)
   - **Frontend Design System** (design brief Q&A; DESIGN.md constraints; library cites; accepted vs rejected; persona fit; section cites)
   - **Craft / Anti-slop Evaluation** (pattern hits from `ANTI-SLOP.md`)
   - **Motion Evaluation** (findings table Before/After/Why; Block/Approve — from `MOTION.md`)
   - **Prose / microcopy** (stop-slop scores if marketing or report copy is in scope)
   - Prioritized Recommendations (P0/P1/P2) — tags: `fix` | `label` | `relocate` | `remove` | `redesign-structure` | `motion-fix` | `motion-delete` | `copy-edit` | `persona-setup`
   - Suggested Ideal Flows
   - **Anti-regression notes** — what must not be deleted in a follow-up fix
   - **Council / consensus** (if implement followed) — Approves list per `COLLABORATION.md`

Ground critique in evidence. Specific over generic. Honest but constructive.

---

### Scoring guidance

**Fluidity / conversion (buyer UX)**  
- **8–10:** Self-evident path; minor nits.  
- **6–7:** Clear product; some friction.  
- **4–5:** Message exists; CTAs/trust/proof hesitate.  
- **1–3:** Confusing or unusable for the core job.

**Craft / Anti-slop (visual professionalism)**  
- **8–10:** Distinct, intentional; hard to call “AI-made” at a glance.  
- **6–7:** Mostly intentional; a few template tells.  
- **4–5:** Clear story, generic section DNA (common agent failure).  
- **1–3:** Interchangeable template / obvious slop.

**Motion**  
- **8–10:** Purposeful, frequency-correct, GPU-safe, reduced-motion OK.  
- **6–7:** Minor easing/duration nits.  
- **4–5:** Over-motion, weak easing, or purposeless decoration.  
- **1–3:** Feel-breaking, high-frequency animation, or performance hazards.

If any Hard gate fails, professionalism ≤ **6** until fixed — **via the preserve-first fix order**, not by erasing the product.  
If craft ≤ **5**, professionalism ≤ **6** even when fluidity is high — **narrative is not craft**.  
If motion is **Block**, professionalism ≤ **6** until motion is fixed or deleted.  
If personas were skipped on a full review, professionalism ≤ **6** and mark `Grounding: weak`.

### Definition of done for a full Panel run
- **Preflight GO** (personas established + Persona Managers + priority negotiated + preserve list) **and**
- Journeys linked to personas with **secondary coverage** (not priority-only) **and**
- Hard gates addressed **and**
- Primary install/conversion path still obvious **and**
- Stated constraints (stack, libraries, brand) still honored **and**
- Buyer can complete understand → try → proof without new holes **and**
- Craft / anti-slop ≥ 6 (or explicit structure redesign plan) **and**
- Motion verdict Approve (or no motion in scope) **and**
- Microcopy passes prose stop-slop when marketing copy changed **and**
- For this product’s marketing: `docs/personas.md` exists or was created this run
