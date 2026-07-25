# Panel Report — Homepage audit

**Target:** `web/` @ `http://localhost:3000` (+ `/report`)  
**Date:** 2026-07-25  
**Preflight:** **GO**  
**Protocol / run class:** **full** / **full**  
**Grounding:** strong (`docs/personas.md` + live Playwright + npm/init check + `web/DESIGN.md`)  
**Persona coverage:** full (priority + secondary harm pass)  
**Council:** `panel-report/council-homepage-audit.md`  
**Run-state:** `panel-report/run-state.yaml`  
**Design system audit:** `panel-report/design-system.md`  
**Screenshots:** `panel-report/desktop-hero.png` · `desktop-full.png` · `mobile-hero.png`  
**Skills:** PANEL · PANEL.full · COLLABORATION · playbook · PRODUCT · EMPATHY · JOURNEY · ANTI-SLOP · MOTION · COPY · DESIGN-SYSTEM · FRONTEND · `web/DESIGN.md` · `docs/personas.md` · `docs/landing-copy.md`

**Consensus (audit):** **REVISE**  
**Implement (same day):** **PROCEED complete** — see `panel-report/implement-notes.md` + `desktop-full-after.png`

---

## Executive Summary

| Score | Owner | Value |
|-------|--------|------:|
| **Clarity** | Heuristic | **7.5 / 10** |
| **Density** | Heuristic + PANEL | **5.5 / 10** |
| **Hierarchy** | Heuristic | **6.5 / 10** |
| **Fluidity** | Journey Critic | **7 / 10** |
| **Professionalism** | Orchestrator (gates) | **7 / 10** |
| **Craft / Anti-slop** | Craft Critic | **7 / 10** |
| **Motion** | Motion Critic | **8 / 10** · **Approve** |
| **Conversion readiness** | Journey + Empathy | **7 / 10** |
| **Design system alignment** | Design System Checker | **drift** (doc_quality: professional) |

**Primary job of this page:** Get a skeptical founder to understand Panel and copy `npx @tysongreenan/panel init`.

**What works**

- Hero install is obvious: terminal card, real scoped command, labeled **Copy**, next-step caption.
- Product path preview (Code → Agent → Report) teaches the job without fake browser chrome.
- **Prior P0 fixed:** dark close install command is dark ink on light card (computed ~lab 5 on ~lab 99) — no longer white-on-white.
- Sample at `/report` is Acme Checkout, labeled fictional, not dogfood chrome.
- npm package is live (`@tysongreenan/panel`); init dry-run wires real files.
- Mobile: Install + GitHub remain; How/Crew hide; install still above the fold.
- Motion is purposeful and reduced-motion aware.

**What fails the buyer**

1. **Crew museum (P1 density)** — `#crew` is ~2.2k of ~3.5k main text: four portrait cards + eight specialist rows. Avery’s recovery path is delayed; DESIGN.md still bans full crew portraits on the homepage.
2. **Proof hierarchy (P1)** — “Meet the crew” is the outline secondary; “Sample report” is ghost. Proof should outrank roster for Avery + Sam.
3. **DESIGN.md drift (P1 process)** — Launch structure documents skills mono list; code + `docs/landing-copy.md` shipped crew-forward without updating the system of record.
4. **Restate tax (P2)** — “Don’t memorize skill names / Orchestrator runs the crew” appears in hero sub, How body, and step 2.

### Persona priority (this run)

| Role | Persona | Priority |
|------|---------|----------|
| **PM-Avery** | Avery (founder) | **Priority** |
| **PM-Jordan** | Jordan (eng) | Secondary |
| **PM-Sam** | Sam (designer) | Secondary |

**Why:** Homepage conversion.  
**Secondary non-negotiables:** Jordan — real init / OSS skill proof. Sam — sample client-safe; no toy craft.  
**Harm checks:** PM-Jordan on any depth cut; PM-Sam on sample weight + portrait craft.

### Top 3 problems

1. **P1** Crew roster length + portrait grid vs lean conversion (and vs DESIGN.md)  
2. **P1** Sample report underweighted vs “Meet the crew”  
3. **P1** DESIGN.md launch anatomy out of date (skills list vs crew)

### Top 3 cuts / simplifications

1. **Collapse** crew to Orchestrator highlight + mono skill file list (or compact specialist rows only) — restore Jordan proof without museum  
2. **Promote** Sample report to outline (or equal) secondary; demote/relabel Meet the crew  
3. **Trim** How body (one sentence max); keep three steps only  

### Preserve

| Item | Job |
|------|-----|
| `npx @tysongreenan/panel init` + labeled **Copy** | Primary conversion |
| Product path preview (real tabs) | Proof without museum |
| Sample → `/report` (Acme) | Avery + Sam JTBD |
| Skill / AGENTS.md links | Jordan credibility |
| SiriOrb + blue primary system | Brand |
| Dark close install band | Scroll recovery |
| InstallBlock `bg-card text-foreground` | Close contrast (prior P0 fix) |

---

## Density Notes

| | |
|--|--|
| **Overcrowded?** | Mid-page yes. Hero + how are lean; crew is not. |
| **Competing for attention** | Portrait cards + specialist blurbs compete with install recovery. |
| **Section text mass** | start ~474 · how ~485 · **crew ~2250** · close ~176 |
| **Remove/combine** | Full lead portrait grid; restated Orchestrator story; ghost npm if install already says npm |
| **vs prior lean build** | Lean skills list was density-correct. Crew-forward direction reintroduced museum risk. |

---

## Buyer Path

### Avery (priority)

1. **Land** — H1 self-evident: design-review team; anti-slop benefit.  
2. **Understand** — Sub: Orchestrator / just ask.  
3. **Install** — Terminal + Copy works; caption says Cursor/Claude.  
4. **Proof** — Product path strong; Sample is easy to miss under Meet the crew.  
5. **Scroll** — Long crew; close install works again.

**Friction (real only):** Crew length after already understanding “just ask”; sample not the loudest secondary.

### Jordan

- Skill chips on cards + AGENTS.md link = credible.  
- npm package + real command = good.  
- Risk of cut: if roster dies without mono skill list, eng loses file-level proof.

### Sam

- `/report` is client-safe.  
- Portraits are refined but AI-stock adjacent — OK if secondary; weak if they *are* the product story.  
- Ghost Sample CTA is the main harm.

---

## Product truth (Product Analyst)

| Promise | Status |
|---------|--------|
| One-command install | **shipped** (npm 0.2.1; local package.json 0.2.2 lag) |
| Run a panel → scored report | **shipped** (skill-first / agent-run) |
| Crew with skills in package | **shipped** (UI over-proves) |
| Sample report shape | **shipped** |

**Ban:** inventing social proof; calling portraits real employees; implying a hosted SaaS panel UI.

---

## Design system

- **path:** `web/DESIGN.md` · **status:** loaded  
- **alignment:** **drift** · **doc_quality:** professional  
- Full matrix: `panel-report/design-system.md`  
- **Gate:** no further layout expansion until code and Launch structure agree (cut *or* council-approved doc amend).

---

## Craft findings

```markdown
- Pattern: Mid-page portrait card grid (equal anatomy)
- Evidence: #crew LeadCard ×4 + COUNCIL rows; full-page screenshot
- User cost: Avery delayed; Sam may read “AI headshot product”
- Smallest fix: Keep Orchestrator only + list specialists; or skills mono list
- Verify: crew section textLen < ~800; sample CTA visual weight ≥ Meet the crew

- Pattern: Secondary CTA hierarchy
- Evidence: Meet the crew = outline; Sample report = ghost
- User cost: Proof buried vs roster curiosity
- Smallest fix: Swap variants (Sample outline; Crew ghost or text link)
- Verify: screenshot hero secondary row

- Pattern: (resolved) Close-band command contrast
- Evidence: code color lab~5 on card lab~99
- User cost: n/a — fixed
- Smallest fix: keep InstallBlock text-foreground on bg-card
```

---

## Motion findings

| Item | Keep/Fix/Delete | Reason |
|------|-----------------|--------|
| Hero entrance | Keep | ≤300ms, reduced-motion |
| Preview auto-cycle | Keep | Teaches path; tabs real |
| Typing agent prompt | Keep | Demo state; static if reduced |
| Orb | Keep | Brand, not affordance |
| Portrait hover scale | Keep | fine-pointer only |

**Motion: Approve** for current ship.

---

## Accessibility smoke

| Check | Result |
|-------|--------|
| One H1 | Pass |
| GitHub accessible name | Pass (`aria-label="GitHub"`) |
| Install Copy labeled | Pass |
| Close command contrast | Pass (post-fix) |
| Preview tabs are buttons | Pass |
| Agent images | `alt=""` with adjacent name text — OK if names visible |

---

## Recommendations (reduction-first)

Every fix: what changes · what is removed · why for a skeptical buyer.

### 1. Collapse crew (delete / merge) — **P1**

- **Change:** Replace four portrait lead cards + long specialist list with either:  
  - **Preferred:** Orchestrator one-liner + mono skill file list + “Full roster → AGENTS.md”, **or**  
  - **Alt:** Compact specialist rows only (no lead portrait grid).  
- **Remove:** Portrait museum as default homepage depth.  
- **Why:** Avery already got the story in the hero; Jordan still needs file proof; DESIGN.md already chose skills list over crew portraits.  
- **Impact:** Avery help · Jordan neutral if skills remain · Sam help.

### 2. Reweight secondary CTAs (clarify) — **P1**

- **Change:** Sample report → outline/primary-secondary; Meet the crew → ghost or text; optional drop npm link (install bar already says npm).  
- **Remove:** Equal-ish three-way choice under hero.  
- **Why:** Proof before roster (DESIGN Do’s).  
- **Impact:** Avery help · Sam help · Jordan neutral.

### 3. Sync DESIGN.md (restructure doc) — **P1 process**

- **Change:** Either restore lean anatomy in code **or** amend Launch homepage structure + Overview to document approved compact crew.  
- **Remove:** Lying “source of truth” that contradicts ship.  
- **Why:** Agents and humans diverge until fixed; Design System drift blocks clean implement.

### 4. Trim How restates (shorten) — **P2**

- **Change:** How H2 + three steps only; drop or one-line the body paragraph.  
- **Remove:** Third retelling of “don’t memorize skill names.”  
- **Why:** Scanners already got it in the hero.

### 5. Version honesty (label) — **P3**

- **Change:** Align package.json with published npm (or note pre-release).  
- **Why:** Jordan will check.

---

## What not to do

- Do not delete install or close band.  
- Do not re-add gap demos / org pyramid / sticky install without a new full council.  
- Do not “fix density” by adding more explanation sections.  
- Do not implement REVISE items without Approves on layout (Craft + Design System + all PMs + Journey + Isa for marketing).

---

## Implement gate (when you want to ship fixes)

Required Approves for homepage layout change:

Orchestrator · PM-Avery · PM-Jordan · PM-Sam · Journey · Craft · Motion · Design System Checker · Isa  

**This run decision: REVISE** — report only.

---

## Artifact index

| Path | Role |
|------|------|
| `panel-report/run-state.yaml` | Shared context |
| `panel-report/design-system.md` | Design System Checker |
| `panel-report/council-homepage-audit.md` | Consensus log |
| `panel-report/copy.md` | Isa notes |
| `panel-report/desktop-*.png` / `mobile-hero.png` | Live evidence |
