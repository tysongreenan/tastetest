# FRONTEND.md

## Panel Frontend Design agent — premium pattern library

When designing, redesigning, or reviewing **frontend UI** (pages, components, color, type, layout, stack-specific patterns), load this skill and use the search library.

**Library:** `skills/ui-ux-pro-max/`  
**Upstream:** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (MIT)  
**What it is:** Searchable design intelligence — styles, palettes, font pairings, product-type patterns, landing structures, UX rules, stack guidance. Think “visual comparisons / pattern bank from premium app categories,” not one screenshot dump.

---

### When to run

- New page or marketing section  
- “Make this look like a real product”  
- Color / type / layout decisions  
- Stack-specific UI (Next.js, shadcn, React, etc.)  
- Panel **Frontend Design** agent step  

**Not alone.** After library recommendations, still run:

| Skill | Why |
|-------|-----|
| **`web/DESIGN.md`** | **Project source of truth** — tokens, type, components, page order (load before inventing UI) |
| **`DESIGN-SYSTEM.md`** + `skills/design-md/` | **Design System Checker** owns doc health — you cite sections; you do not set alignment/doc_quality |
| `ANTI-SLOP.md` | Library can suggest trendy templates that still read as AI slop |
| `MOTION.md` | Motion must meet Emil frequency/easing bar |
| `PANEL.md` | Buyer jobs and conversion honesty |
| `COPY.md` (Isa) | Marketing pages: scan-layer copy locked before layout invent |
| `docs/personas.md` | Who the UI is for; PM visual prefs |

**Positive + negative references (with Craft):** name what good looks like and what slop to ban this run. Blank “make it premium” → default AI SaaS look.

---

### Project design system card (Panel marketing)

**Full system:** [`web/DESIGN.md`](web/DESIGN.md) — read it for any `web/` UI work.  
**Tokens / fonts in code:** `web/src/app/globals.css` · `web/src/app/layout.tsx`.

Library search is a **comparison bank**, not a license to replace Panel’s brand. When library and `DESIGN.md` conflict → **`DESIGN.md` + Craft win**.

| Dimension | Panel default (summary) |
|-----------|------------------------------|
| **Feel** | Calm, precise, buyer-honest. Dev-tool adjacent — not enterprise research-lab, not glass/dark IDE. |
| **Canvas** | Cool near-white `background`; flat UI; soft blue hero wash only |
| **Primary** | Blue `oklch(0.45 0.2 265)` — CTAs, Copy, focus ring |
| **Type** | Space Grotesk (headings) · DM Sans (body) · Geist Mono (commands/paths) |
| **CTAs** | Pill `rounded-full` primary blue; install = terminal card + labeled **Copy** |
| **Conversion** | `npx @tysongreenan/panel init` · labeled Copy · dark close re-offer |
| **Proof** | `ProductPreview` (Code → Agent → Report) · Sample → `/report` (Acme — not dogfood chrome) |
| **Depth** | Skills mono file list + GitHub · crew/org live off-homepage unless council re-opens |
| **Motion** | Ambient orb OK; preview tab cycle OK; no fake affordances · `MOTION.md` |
| **Ban** | Glassmorphism, traffic-light chrome, eyebrow-every-section, identical card grids, icon-only primary, white-on-white install command |

**Launch page order (do not reorder without council):**  
Hero+install+preview → Three steps → Skills mono list → Dark final install · Sample at `/report`.

**When implementing or proposing:** name the `DESIGN.md` section you followed (Colors / Components / Iteration guide). If you invent a new pattern, update `web/DESIGN.md` in the same change.

---

### How to search (from Panel repo root)

```bash
# Full design system (start here for new pages)
python3 skills/ui-ux-pro-max/scripts/search.py \
  "developer tools SaaS modern minimal" --design-system -p "Panel" -f markdown

# Domain deep-dives
python3 skills/ui-ux-pro-max/scripts/search.py "hero social-proof" --domain landing
python3 skills/ui-ux-pro-max/scripts/search.py "trust blue" --domain color
python3 skills/ui-ux-pro-max/scripts/search.py "tech startup" --domain typography
python3 skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Stack guidelines
python3 skills/ui-ux-pro-max/scripts/search.py "suspense streaming" --stack nextjs
python3 skills/ui-ux-pro-max/scripts/search.py "button dialog" --stack shadcn
```

**Domains:** `product` · `style` · `color` · `typography` · `google-fonts` · `landing` · `ux` · `icons` · `gsap` · `chart` · `react` · `web`  

**Stacks:** `nextjs` · `react` · `shadcn` · `html-tailwind` · `vue` · `svelte` · `astro` · … (see skill)

Persist a design system into the project (optional):

```bash
python3 skills/ui-ux-pro-max/scripts/search.py \
  "developer tool UX review" --design-system --persist \
  -p "Panel" --output-dir . -f markdown
```

Creates `design-system/<slug>/MASTER.md` (skip if exists unless `--force`).

---

### Agent workflow (blocking order)

**Frontend Design may not open the pattern library or invent a visual direction until Step 0 is done.**

#### 0. Ask the managers (mandatory)

Before any `--design-system` search, mock, or redesign proposal, Frontend Design **interviews** the required managers for the run class:

- `standard` section/page visual refresh: Orchestrator + **priority PM**
- `standard` change touching a secondary non-negotiable: add that PM
- `full` homepage / marketing / multi-surface redesign: Orchestrator + **every seated Persona Manager**

Write this handoff (transcript or `panel-report/council.md`):

```markdown
### Frontend Design → Orchestrator + Persona Managers | design brief | question

**Ask:** Visual preferences for this surface (page/section).

For each Persona Manager:
1. What should this UI **feel** like for your persona? (calm / dense / bold / terminal / editorial …)
2. What would make them **trust** or **bounce** visually?
3. Any **reference sites** or anti-references?
4. Depth preference: sparse vs built-out sections / interactive demos?
5. Motion preference: minimal vs expressive (still subject to MOTION.md)?

Orchestrator:
6. Priority persona this run?
7. Non-negotiables from secondary PMs?
8. Preserve list (install CTA, brand, …)?
9. Constraints (stack, library, dark/light)?
```

**Each required Persona Manager must answer** (not “whatever looks good”).
**Orchestrator confirms** priority + any secondary non-negotiables in scope.

Frontend Design must also ask one structural question:

10. Which page/section jobs are missing today for your persona: orientation, proof, trust, comparison, or next-step clarity?

If required answers are missing → Frontend Design **stops** and posts `BLOCKED: design brief incomplete` — no library search, no UI implement.

#### 0b. Load project DESIGN.md (mandatory when UI is in scope)

1. Resolve path via root **`DESIGN.md`** (Panel dogfood → **`web/DESIGN.md`**).  
2. Read the **full** system file (not H1 skim). Honor **Agent contract** at top of `web/DESIGN.md`.  
3. Extract and write into `panel-report/run-state.yaml` → `design_system`:

| Field | Value |
|-------|--------|
| `path` | resolved path |
| `status` | `loaded` (or `missing-drafted` if client gap) |
| `constraints` | 3–5 bullets (tokens, layout order, bans, preserve UI) |
| `sections_cited` | e.g. Colors, Components, Do’s and Don’ts |

Must extract at minimum:

- Preserve list touchpoints (install, sample, GitHub, orb rules)  
- Color / type / radius tokens to reuse  
- Component inventory to extend vs invent  
- Launch structure if homepage  
- Known gaps  

If `status` is still null/`missing-blocked` → post `BLOCKED: design_system not loaded` — no library search, no layout invent.

If `DESIGN.md` is missing on a **client** project under review: Design System Checker (or Frontend) drafts a starter from tokens + patterns, sets `status: missing-drafted`, notes the gap in the report. Do **not** paste Panel’s brand kit as the client’s system.

#### 1. Translate brief → search keywords

Map manager answers into multi-word queries (product + tone + density), e.g.  
`developer tools SaaS calm premium sparse` vs `developer tools product demo interactive dense`.

Bias keywords toward **`DESIGN.md` overview** when dogfooding Panel (e.g. `developer tools minimal light blue CTA typography-first` — not `enterprise green coral research lab`).

#### 2. Library search

Detect stack (`package.json`, etc.) — never assume.  
Run `--design-system` with those keywords.  
Supplement: landing / color / typography / ux / gsap as needed.  
Stack guidelines.

#### 3. Multi-persona fit

For each major visual choice:

| Choice | Priority PM | Secondary PMs | Hurt anyone? | DESIGN.md align? |
|--------|-------------|-----------------|--------------|------------------|
| … | help/neutral/hurt | … | if hurt → revise or get that PM Approve | cite section or “new — needs DESIGN.md update” |

For each proposed new section or major restructure:

| Structural change | Missing job served | Priority PM | Secondary PMs | What is reduced/merged to pay for it? | DESIGN.md align? |
|------------------|--------------------|-------------|----------------|----------------------------------------|------------------|
| … | proof / trust / orientation / comparison / next-step clarity | … | … | … | cite section or “new — needs DESIGN.md update” |

#### 4. Gate

**DESIGN.md** + ANTI-SLOP + MOTION + preserve list.  
If library says glassmorphism and craft / DESIGN.md say no → **craft + DESIGN.md win**.

#### 5. Propose (not ship)

Present: design brief summary · **DESIGN.md constraints honored** · library cites · accepted vs rejected · section plan.  
Frontend Design is allowed to propose a **more modern feel** for an existing section in `standard` runs without escalating to `full`, as long as the section’s job stays intact and the proposal cites the priority PM brief plus `DESIGN.md` constraints. Frontend Design is also allowed to propose a **new section direction** when the current page lacks a job the personas need. That proposal must cite the missing job, the PM(s) asking for it, and the reduction tradeoff elsewhere on the page.

For every changed interactive component or data-bearing section, include a state contract in `panel-report/frontend.md`:

| Surface | Default | Hover | Focus-visible | Active | Loading | Empty | Error | Disabled | Success | Mobile | Reduced motion |
|---------|---------|-------|---------------|--------|---------|-------|-------|----------|---------|--------|----------------|
| … | behavior or `n/a: reason` | … | … | … | … | … | … | … | … | … | … |

The proposal must also name the desktop/mobile acceptance viewport, calibration traits being expressed, and the before-state evidence the verifier will compare against.

**Implement only after Approves** per `COLLABORATION.md` (Craft, Motion, Orchestrator, Persona Managers as required).

### Depth rule (after anti-slop)

Sparse ≠ refined. Unless managers explicitly asked for minimal:

- Prefer **at least one built-out interactive proof section** (real JS, purposeful motion under MOTION.md) when the product’s artifact is visual (e.g. sample report, install demo).
- Do not default to empty gray boxes because anti-slop forbids templates.

### Output for Panel reports

Add **Frontend Design System** section:

- **Design brief Q&A** (Orchestrator + required Persona Managers for the run class)
- **`design_system` run-state** — path · status · 3–5 constraints · sections cited  
- Query used + product type match  
- Recommended pattern / style / palette / type (cite search)  
- Anti-patterns from library  
- What you **rejected** and why (anti-slop / motion / **persona preference** / **DESIGN.md section**)  
- Multi-persona impact table (include DESIGN.md align column)  
- Stack notes  
- **DESIGN.md updates proposed** (if new patterns shipped — must land same PR as code)
- State contract for every changed interactive/data-bearing surface
- Calibration traits cited from `docs/design-calibration.md`
- Browser acceptance checks and before-state evidence

**Approve evidence (visual):** one line naming a DESIGN.md section, e.g. `Approve — Components · InstallBlock; Do’s and Don’ts · no glass`.

---

### Full skill docs

| Doc | Job |
|-----|-----|
| **`web/DESIGN.md`** | Panel marketing system (tokens, components, iteration) |
| `skills/ui-ux-pro-max/SKILL.md` | Complete library workflow |
| `skills/ui-ux-pro-max/references/quick-reference.md` | UX rule index |
| `skills/ui-ux-pro-max/references/pro-rules.md` | Pre-delivery checklist |
| `ANTI-SLOP.md` · `MOTION.md` | Craft and motion gates |

Optional global install: `npx ui-ux-pro-max-cli` / see upstream README.
