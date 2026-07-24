# FRONTEND.md

## TasteTest Frontend Design agent — premium pattern library

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
- EmpathFlow **Frontend Design** agent step  

**Not alone.** After library recommendations, still run:

| Skill | Why |
|-------|-----|
| **`web/DESIGN.md`** | **Project source of truth** — tokens, type, components, page order (load before inventing UI) |
| `ANTI-SLOP.md` | Library can suggest trendy templates that still read as AI slop |
| `MOTION.md` | Motion must meet Emil frequency/easing bar |
| `EMPATHFLOW.md` | Buyer jobs and conversion honesty |
| `docs/personas.md` | Who the UI is for; PM visual prefs |

---

### Project design system card (TasteTest marketing)

**Full system:** [`web/DESIGN.md`](web/DESIGN.md) — read it for any `web/` UI work.  
**Tokens / fonts in code:** `web/src/app/globals.css` · `web/src/app/layout.tsx`.

Library search is a **comparison bank**, not a license to replace TasteTest’s brand. When library and `DESIGN.md` conflict → **`DESIGN.md` + Craft win**.

| Dimension | TasteTest default (summary) |
|-----------|------------------------------|
| **Feel** | Calm, precise, buyer-honest. Dev-tool adjacent — not enterprise research-lab, not glass/dark IDE. |
| **Canvas** | Cool near-white `background`; flat UI; soft blue hero wash only |
| **Primary** | Blue `oklch(0.45 0.2 265)` — CTAs, Copy, focus ring |
| **Type** | Space Grotesk (headings) · DM Sans (body) · Geist Mono (commands/paths) |
| **CTAs** | Pill `rounded-full` primary blue; install = terminal card + labeled **Copy** |
| **Conversion** | `npx tastetest init` + honesty if not on npm · `Run EmpathFlow` · sample before deep crew |
| **Proof** | `ProductPreview`, `SampleExcerpt`, `/report` (Acme — not dogfood chrome) |
| **Depth** | Crew lead + list · skills featured + mono rows · org chart — after proof |
| **Motion** | Ambient orb OK; rare scramble on non-H1; no fake affordances · `MOTION.md` |
| **Ban** | Glassmorphism, traffic-light chrome, eyebrow-every-section, identical card grids, icon-only primary |

**Launch page order (do not reorder without council):**  
Hero+install → Problem → How → **Sample** → Crew → Skills → Org → Dark final install.

**When implementing or proposing:** name the `DESIGN.md` section you followed (Colors / Components / Iteration guide). If you invent a new pattern, update `web/DESIGN.md` in the same change.

---

### How to search (from TasteTest repo root)

```bash
# Full design system (start here for new pages)
python3 skills/ui-ux-pro-max/scripts/search.py \
  "developer tools SaaS modern minimal" --design-system -p "TasteTest" -f markdown

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
  -p "TasteTest" --output-dir . -f markdown
```

Creates `design-system/<slug>/MASTER.md` (skip if exists unless `--force`).

---

### Agent workflow (blocking order)

**Frontend Design may not open the pattern library or invent a visual direction until Step 0 is done.**

#### 0. Ask the managers (mandatory)

Before any `--design-system` search, mock, or redesign proposal, Frontend Design **interviews** Orchestrator + **every seated Persona Manager**.

Write this handoff (transcript or `tastetest-report/council.md`):

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

**Each Persona Manager must answer** (not “whatever looks good”).  
**Orchestrator confirms** priority + secondary non-negotiables.

If answers are missing → Frontend Design **stops** and posts `BLOCKED: design brief incomplete` — no library search, no UI implement.

#### 0b. Load project DESIGN.md (mandatory when `web/` or marketing is in scope)

Read **`web/DESIGN.md`** (full file, not skim of H1s only). Extract:

- Preserve list touchpoints (install, sample, GitHub, orb rules)  
- Color / type / radius tokens to reuse  
- Component inventory to extend vs invent  
- Launch structure if homepage  
- Known gaps (e.g. npm honesty)  

If `DESIGN.md` is missing on a **client** project under review: draft a starter from tokens + patterns, note the gap in the report (EmpathFlow already requires this). Do **not** paste a third-party brand kit as the client’s system.

#### 1. Translate brief → search keywords

Map manager answers into multi-word queries (product + tone + density), e.g.  
`developer tools SaaS calm premium sparse` vs `developer tools product demo interactive dense`.

Bias keywords toward **`DESIGN.md` overview** when dogfooding TasteTest (e.g. `developer tools minimal light blue CTA typography-first` — not `enterprise green coral research lab`).

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

#### 4. Gate

**DESIGN.md** + ANTI-SLOP + MOTION + preserve list.  
If library says glassmorphism and craft / DESIGN.md say no → **craft + DESIGN.md win**.

#### 5. Propose (not ship)

Present: design brief summary · **DESIGN.md constraints honored** · library cites · accepted vs rejected · section plan.  
**Implement only after Approves** per `COLLABORATION.md` (Craft, Motion, Orchestrator, Persona Managers as required).

### Depth rule (after anti-slop)

Sparse ≠ refined. Unless managers explicitly asked for minimal:

- Prefer **at least one built-out interactive proof section** (real JS, purposeful motion under MOTION.md) when the product’s artifact is visual (e.g. sample report, install demo).
- Do not default to empty gray boxes because anti-slop forbids templates.

### Output for EmpathFlow reports

Add **Frontend Design System** section:

- **Design brief Q&A** (Orchestrator + each Persona Manager answers)  
- **`DESIGN.md` loaded?** path + 3–5 constraints applied (or “drafted starter — missing”)  
- Query used + product type match  
- Recommended pattern / style / palette / type (cite search)  
- Anti-patterns from library  
- What you **rejected** and why (anti-slop / motion / **persona preference** / **DESIGN.md**)  
- Multi-persona impact table  
- Stack notes  
- **DESIGN.md updates proposed** (if new patterns shipped)

---

### Full skill docs

| Doc | Job |
|-----|-----|
| **`web/DESIGN.md`** | TasteTest marketing system (tokens, components, iteration) |
| `skills/ui-ux-pro-max/SKILL.md` | Complete library workflow |
| `skills/ui-ux-pro-max/references/quick-reference.md` | UX rule index |
| `skills/ui-ux-pro-max/references/pro-rules.md` | Pre-delivery checklist |
| `ANTI-SLOP.md` · `MOTION.md` | Craft and motion gates |

Optional global install: `npx ui-ux-pro-max-cli` / see upstream README.
