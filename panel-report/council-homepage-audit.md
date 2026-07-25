# Council log — Homepage audit 2026-07-25

**Protocol:** full · **Run class:** full · **Preflight:** GO  
**Target:** `web/` @ `http://localhost:3000` (+ `/report`)  
**Mode:** Audit only (no implement this run)

---

## Phase 0 — Preflight

### Orchestrator → Crew | Phase 0 | proposal

**Scope:** Marketing homepage conversion + craft density.  
**Intent:** Skeptical first-time buyer copies `npx @tysongreenan/panel init`, understands “just ask,” sees real report shape.  
**Preserve:** install command + Copy · sample `/report` · product preview · GitHub · brand system · dark close install.  
**Design system:** `web/DESIGN.md` required.

### Persona priority (this run)

| Role | Persona | Priority |
|------|---------|----------|
| **PM-Avery** | Avery (founder) | **Priority** |
| **PM-Jordan** | Jordan (eng) | Secondary |
| **PM-Sam** | Sam (designer) | Secondary |

**Why priority:** Homepage conversion audit — install path is the product job.  
**Secondary non-negotiables:** Jordan — real init / OSS credibility. Sam — sample client-safe; no toy craft.  
**Harm checks required from:** PM-Jordan, PM-Sam on any roster cut or sample demotion.

### Orchestrator | approve
Preflight **GO**. Full pack loaded. Personas seated. Priority negotiated.

---

## Product Analyst

### One-liner
Panel is a buyer-level UX review crew that installs into your repo via skills; you say “Run a panel” and get a scored report with file paths.

### Promised vs shipped

| Promise | Where | Evidence | Status |
|---------|-------|----------|--------|
| One-command install | Hero, close, README | `npx @tysongreenan/panel init`; npm package exists (0.2.1 published; local 0.2.2) | **shipped** (minor version lag) |
| Just ask / Orchestrator | Hero, how, steps | Copy + product path Agent tab | **shipped** (skill-first / agent-run) |
| Scored report + file paths | Preview Report tab, `/report` | Real sample Acme; labeled fictional | **shipped** |
| Full managed crew in package | Crew section, AGENTS | Roster + skill chips → GitHub | **shipped** (UI heavy) |
| Not AI slop (meta) | H1 | Craft solid; crew portraits AI-adjacent | **partial** |

### Copy ban list
- Do not claim CLI is a separate SaaS dashboard.
- Do not invent user counts / logos.
- Do not imply humans are the illustrated portraits (Known gaps: illustrative).

### Benefits Isa may use
- Install once; say Run a panel.  
- Report with scores + file paths.  
- Skills live in-repo; Orchestrator loads them.

---

## Empathy / Persona Managers

### PM-Avery (priority) | pitch
Priority: time-poor founder. Hero install is correct. **Hurt:** scrolling a long portrait museum before dark close recovery. “Meet the crew” as outline CTA competes with install decision.

**Non-negotiable:** Keep install + caption + sample path.

### PM-Jordan | pitch
Priority claim: eng needs proof skills are real files. Crew skill chips help. **Non-negotiable:** If roster collapses, keep mono skill list or chips + GitHub — not empty “trust us.”

### PM-Sam | pitch
Priority claim: designers bounce on toy marketing. Portraits are polished but stock-AI adjacent. **Non-negotiable:** Sample report stays first-class; currently ghost under “Meet the crew.”

---

## Journey Critic

### Paths

| # | Journey | Persona | Result |
|---|---------|---------|--------|
| 1 | Land → understand → copy init | Avery | **Pass** — H1 + install above fold; Copy labeled |
| 2 | Sample report shape | Avery+Sam | **Partial** — `/report` good; hero Sample is secondary ghost |
| 3 | Scroll recovery install | Avery | **Pass** — close command readable (prior P0 fixed) |
| 4 | OSS / skills depth | Jordan | **Pass with tax** — depth exists as long roster |

**Fluidity: 7 / 10**  
Friction: mid-page crew length; restated “don’t memorize skill names” (hero + how + step 2).

---

## Heuristic Auditor

| Gate | Score | Note |
|------|------:|------|
| Clarity | 7.5 | 3s: design-review crew in repo; install clear |
| Density | 5.5 | Crew ~2.2k chars of ~3.5k body — fails “every block earns” |
| Hierarchy | 6.5 | Install wins hero; Sample loses to Meet the crew |
| Trust | 7.5 | Real npm link; honest sample chrome; no fake metrics |
| A11y smoke | 8 | GitHub `aria-label`; one H1; close contrast OK |

No hard gate ≤4. Density is soft block on “expand further.”

---

## Design System Checker

See `panel-report/design-system.md`.  
**alignment: drift** · **doc_quality: professional**  
Hold visual implement that increases roster without DESIGN.md sync.

---

## Craft Critic

**Score: 7 / 10**

| Finding | Evidence | User cost | Smallest fix |
|---------|----------|-----------|--------------|
| Prior P0 fixed | Close `code` lab~5 on card lab~99 | — | Keep InstallBlock `text-foreground` |
| Portrait card soup risk | 4 lead cards same anatomy | Sam: template taste | Cap at Orchestrator + compact PMs or list rows |
| Sample underweighted | Meet the crew outline vs Sample ghost | Avery/Sam miss proof | Swap visual weight |
| Positive refs | Linear/Raycast-adjacent install, calm blue | — | Keep |

**Positives this run:** light canvas, real install, product path without traffic lights.  
**Bans:** do not add gap demos / org pyramid / logo cloud.

---

## Motion Critic

**Score: 8 / 10 · Approve**

| Motion | Verdict | Reason |
|--------|---------|--------|
| Hero fade/slide | Keep | Short, reduced-motion gated |
| Gradient breathing | Keep | Atmosphere; non-interactive |
| Preview tab cycle | Keep | Teaches path; clickable; reduced-motion off |
| Typing “Run a panel” | Keep | State demo; reduced-motion static |
| Orb | Keep | Brand only |
| Portrait hover scale | Keep | hover:fine gated |

No Block.

---

## Isa · Marketing Copywriter

**SB7 (shipped)**

1. Character: founder whose UI looks like AI slop  
2. Problem: demos bounce; vague feedback  
3. Guide: Orchestrator + seated skills in-repo  
4. Plan: Init → Just ask → Ship P0s  
5. CTA: copy install  
6. Failure: keep shipping slop / guessing  
7. Success: report with file paths tonight  

**Scan issues**
- H1 is strong WHAT+benefit.  
- Sub + How + Step 2 triple-stack “don’t memorize skill names.”  
- Secondary hierarchy: Meet the crew > Sample — wrong for proof.

**Product-show:** Product path tabs = good. Crew portraits = weaker show than sample artifact.

---

## Prose Critic

Landing prose is mostly concrete. Cut candidates: How body paragraph (restates hero). Avoid “fights for” repetition in three PM blurbs if roster stays (agency cadence).

---

## Frontend Design

**Audit-only** — no library search (Step 0 brief satisfied for audit: managers answered via PMs above).  
If implement later: load DESIGN constraints; **do not** invent new section types until Design System drift resolved.

---

## Multi-persona impact (recommendations)

| Proposal | Avery | Jordan | Sam |
|----------|-------|--------|-----|
| Collapse roster → Orchestrator + skills mono list | help | neutral if skills remain | help |
| Promote Sample over Meet the crew | help | neutral | help |
| Delete install close | hurt | hurt | hurt — **ban** |
| Expand crew further | hurt | help | hurt — **ban without council** |

---

## Consensus

| Role | Vote |
|------|------|
| Orchestrator | **REVISE** |
| PM-Avery | REVISE (density) |
| PM-Jordan | REVISE (preserve skills proof) |
| PM-Sam | REVISE (sample hierarchy) |
| Journey | REVISE |
| Craft | REVISE |
| Motion | Approve ship motion as-is |
| Design System | REVISE (doc/code sync) |
| Isa | REVISE (CTA hierarchy + trim restates) |

### Decision: **REVISE**

**Do not implement** until a short fix plan is agreed. Preferred reduction order in `panel-report/report.md`.

---

## Prior run delta

| Prior (lean report 2026-07-24) | Now |
|--------------------------------|-----|
| Close install white-on-white P0 | **Fixed** |
| Lean skills mono list | **Replaced by full crew roster** |
| TasteTest branding / bare npx | Panel + `@tysongreenan/panel` |
| Not on npm honesty | npm package live |
