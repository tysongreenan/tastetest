# DESIGN.md — TasteTest marketing site (`web/`)

**Scope:** Marketing homepage, sample report route, shared chrome (nav/footer).  
**Stack:** Next.js · Tailwind v4 · shadcn/ui · SmoothUI · Motion (Framer).  
**Source of truth for tokens:** `src/app/globals.css` · fonts: `src/app/layout.tsx`.  
**Companion skills:** root `ANTI-SLOP.md`, `MOTION.md`, `FRONTEND.md` (agent card + workflow Step 0b), `docs/personas.md`.  
**Agents:** Frontend Design and Design System Checker load this file before proposing or scoring UI.

This file is **TasteTest’s** system — not a third-party brand kit. Structure is inspired by deep product design extracts (overview → tokens → type → layout → components → do/don’t → iteration). Values are taken from what ships in `web/`.

---

## Overview

TasteTest’s marketing presence should feel like a **precise developer tool that still has taste** — calm light canvas, electric blue actions, typography-first hierarchy, and one obvious conversion path: copy install → run EmpathFlow → see a real report shape.

The homepage opens on a value claim and an **install block** (not a demo request). Proof is a product preview (code → agent → report) and a full-weight **Acme sample** section before optional crew/skills depth. Dark bands appear only as the closing install CTA, not as a default product skin. Color is mostly flat UI; soft blue radial washes and a light grid sit behind the hero as atmosphere, not decoration chrome.

What makes the system distinctive is the mix of **buyer-honest conversion UI** (terminal install, labeled Copy, honesty about npm) with **craft restraint** (no glassmorphism, no traffic-light browser frames, no identical card grids on every section). Motion is ambient brand (orb, rare scramble) or state feedback — never fake affordances.

**Key characteristics**

- Cool ink on near-white canvas; primary action is saturated blue, not near-black pill enterprise.
- Space Grotesk display + DM Sans body + Geist Mono for commands/paths.
- Pill CTAs (`rounded-full`) for primary marketing actions; install uses a terminal-style card + blue Copy.
- Section anatomy varies: split hero, problem split, interactive pipeline, sample proof split, lead roster + list, featured skills + mono list, org chart, dark close.
- One strong artifact (sample report) beats four explanation zones.
- Honesty labels when a CTA is incomplete (e.g. package not on npm yet).

---

## Product feel & readers

| | |
|--|--|
| **Feel** | Calm, precise, buyer-honest. Motion supports clarity; it never replaces it. |
| **If a control doesn’t do something real** | It doesn’t ship. |
| **Primary reader** | Avery (indie founder / vibe-coder) — install obvious, report clear in minutes |
| **Secondary** | Jordan (eng) — real init, OSS credibility · Sam (designer) — sample client-safe, no toy UI |

See `docs/personas.md` for JTBD and non-negotiables. Full runs renegotiate priority; DESIGN.md still defaults visual weight to Avery’s conversion path.

---

## Colors

Tokens live as CSS variables in `:root` (`globals.css`). Prefer **token names** in code (`bg-primary`, `text-muted-foreground`). Values below are the light-theme marketing defaults.

### Brand & accent

| Token / role | Value | Use |
|--------------|-------|-----|
| **Primary** | `oklch(0.45 0.2 265)` · `--primary` | CTAs, Copy button, step markers, links emphasis, focus ring |
| **Primary foreground** | `oklch(0.99 0 0)` | Text/icons on primary |
| **Primary soft** | `primary/10` | Icon wells, chips, active step tint |
| **Hero gradient text** | `from-primary` → `oklch(0.55 0.16 250)` | Partial H1 accent only (“lives in your repo”) |
| **Orb palette** | bg `oklch(0.98 0.01 265)` · c1 `0.5 0.2 265` · c2 `0.65 0.14 230` · c3 `0.55 0.16 290` | `SiriOrb` brand mark only |

### Surface & background

| Token / role | Value | Use |
|--------------|-------|-----|
| **Background** | `oklch(0.985 0.004 260)` | Default page canvas |
| **Card** | `oklch(0.995 0.002 260)` | Install, preview, skill/report cards |
| **Muted** | `oklch(0.96 0.01 260)` | Soft strips, tab bars, chip fills |
| **Secondary** | `oklch(0.955 0.01 260)` | Secondary button fill |
| **Sample band** | `oklch(0.97 0.012 265)` | Full-width sample section backdrop |
| **Close band** | `foreground` (near-black) | Final install section only |
| **Hero wash** | Radial primary/blue ellipses + light grid (opacity ~40%, masked) | Atmosphere under hero; non-interactive |

### Text & borders

| Token / role | Value | Use |
|--------------|-------|-----|
| **Foreground / ink** | `oklch(0.18 0.02 265)` | Body, headings |
| **Muted foreground** | `oklch(0.45 0.025 265)` | Supporting copy, metadata |
| **Border** | `oklch(0.9 0.015 260)` | Cards, rules (`border-border/60`–`/80`) |
| **Ring** | same as primary | Focus rings |

### Semantic (UI + sample artifact)

| Role | Treatment | Use |
|------|-----------|-----|
| **Focus** | `ring` / `ring-primary` | Keyboard focus |
| **Destructive / P0** | `oklch(0.55 0.22 25)` or `red-500/60` left border + `text-red-700` | Report P0 chips in sample mock only |
| **Success (demo)** | `emerald-500/15` text emerald | Gap-demo “After” state; sparingly |
| **Warning (demo)** | amber text | Agent panel “writing…” state |

### Gradient system

TasteTest does **not** use gradients as generic card fills.

| Allowed | Forbidden |
|---------|-----------|
| Soft radial hero wash (low opacity) | Glassmorphic multi-stop panels |
| `AnimatedGradientBackground` on hero only — TasteTest blue palette, reduced-motion static | Full-page rainbow / dark neon gradients from third-party demos |
| Gradient **text** on a short H1 phrase | Gradient full-section backgrounds as brand |
| Dark close band is flat `foreground` | Neon mesh / aurora SaaS templates |

Keep UI surfaces flat. Reserve richness for hero atmosphere and optional media.

---

## Typography

### Font family

| Role | Family | CSS / next/font |
|------|--------|-----------------|
| **Display / headings** | Space Grotesk | `--font-space-grotesk` · `font-heading` |
| **Body / UI** | DM Sans | `--font-dm-sans` · `font-sans` (body default) |
| **Technical / commands** | Geist Mono | `--font-geist-mono` · `font-mono` |

Weights in use: 400–700. Prefer **semibold (600)** on headings; avoid ultra-bold display for everything.

Base heading letter-spacing: ~`-0.025em` to `-0.03em` on large display.

### Hierarchy (marketing)

| Role | Font | Size (approx) | Weight | Line height | Tracking | Notes |
|------|------|---------------|--------|-------------|----------|-------|
| Hero display | Space Grotesk | 2.25rem → 3.25rem (`text-4xl` / `sm:text-5xl` / `lg:text-[3.25rem]`) | 600 | ~1.05–1.08 | -0.03em | One H1 only |
| Section heading | Space Grotesk | `text-3xl` / `sm:text-4xl` | 600 | tight | -0.03em | Major section H2 |
| Card / feature heading | Space Grotesk | `text-xl`–`text-2xl` or `text-base`–`lg` | 600 | 1.2 | tight | Cards, lead roster |
| Body large | DM Sans | `text-lg` / `sm:text-xl` | 400 | relaxed | 0 | Hero lead |
| Body | DM Sans | `text-sm`–`text-base` | 400 | relaxed | 0 | Default copy |
| Button | DM Sans | `text-sm` / ~13–14px | 500 | 1 | 0 | CTA labels |
| Nav | DM Sans | 13px | 500 | 1 | 0 | Header links |
| Caption / meta | DM Sans | 11–12px / `text-xs` | 400–500 | snug | 0 | Helper, honesty line |
| Mono command | Geist Mono | 13–14px | 500 | 1 | tight | Install command |
| Mono micro | Geist Mono | 10–11px | 400–500 | 1.2 | 0 | Paths, chips, labels |

### Principles

- One oversized idea per viewport (hero H1 or one section H2) — then settle into body.
- Hierarchy via **size + ink vs muted**, not bold-on-bold.
- Mono is for **commands, file paths, scores labels** — not body paragraphs.
- Partial gradient on H1 is brand; do not gradient entire sentences of body copy.
- Never put interactive chrome inside the H1.

---

## Layout

### Spacing

Base: Tailwind scale (4px). Common marketing rhythm:

- Section vertical: `py-16`–`py-24` (`py-20 sm:py-24` default for major blocks)
- Horizontal: `px-6` inside `max-w-6xl`
- Card padding: `p-4`–`p-6` / `p-8` for proof CTAs
- Stack gaps: `gap-3`–`gap-6` small UI; `gap-12`–`gap-14` hero splits

Large empty space is for **scan path and focal proof**, not for enterprise “trust strip far below the fold” theatrics. Dense content is OK in skill lists, org chart, and report body.

### Grid & container

| Pattern | Spec |
|---------|------|
| **Page max** | `max-w-6xl` centered |
| **Nav** | Logo left · links + GitHub + Start right · sticky blur header |
| **Hero** | 2-col desktop (`lg:grid-cols-2`): copy+install \| `ProductPreview` |
| **Problem** | 12-col: copy 5 / demos 7 |
| **How** | Full width; pipeline internal 1 + 1.1 cols on large |
| **Sample** | 2-col: copy+CTAs \| `SampleExcerpt` |
| **Crew lead** | 2-col horizontal profile cards |
| **Craft council** | Single column list rows |
| **Skills** | 2 featured cards + full-width mono list |
| **Close** | Narrow `max-w-md` centered install |

### Whitespace philosophy

Whitespace protects the **install → sample** path. Do not fill every band with identical cards. Prefer:

1. Conversion / proof  
2. Explanation with a job (gap demos, pipeline)  
3. Depth for Jordan/Sam (crew, skills, org)  
4. Re-offer install  

### Launch homepage structure (Don’t Make Me Think + enough product)

**Primary job:** understand → copy install.  
**Secondary:** prove it’s real without a content museum.

1. Nav — logo · How · Skills · GitHub · Install  
2. Hero — H1 · one line · install + Copy · Sample + GitHub  
3. Product preview (show the loop)  
4. Three steps (Init / Run / Fix) — short lines only  
5. Skills as mono file list (not card grids) + AGENTS.md link  
6. Close install band · sample link  
7. Thin footer  

**Still off the homepage:** full crew portraits, org chart pyramid, gap demos, long sample essay.  
**Sample page:** `/report`. **Crew depth:** GitHub `AGENTS.md`.

---

## Elevation & depth

Mostly flat. Depth from surface alternation, borders, and **one** soft blue-tinted shadow on primary conversion cards.

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Body sections, lists, org nodes |
| Bordered | `border border-border/60–80` | Cards, tabs, demo shells |
| Soft lift | `shadow-sm` | Default cards |
| Install lift | Custom: hairline + large soft primary-tinted shadow | Full `InstallBlock` only |
| Sticky lift | `shadow-2xl` + blur | Sticky install bar |
| Dark field | `bg-foreground text-background` | Final CTA band only |
| Blur chrome | `bg-background/70 backdrop-blur-xl` | Sticky header / sticky install |

**Do not** stack heavy multi-layer shadows on every card. **Do not** glassmorph entire sections.

---

## Shapes

### Radius scale

Mapped from `--radius: 0.75rem` and Tailwind utilities used in marketing:

| Token | Approx | Role |
|-------|--------|------|
| `sm` / `lg` | ~0.45–0.75rem | Small controls, score chips (`rounded-lg`) |
| `xl` | ~1rem | Compact install (`rounded-xl`) |
| `2xl` | ~1.35rem | Default cards, install, preview (`rounded-2xl`) |
| `3xl` | ~1.65rem | Large soft panels if needed |
| `full` / pill | 9999px | Nav links hover, marketing CTAs, chips |

Major media/product cards: **`rounded-2xl`**. Primary marketing buttons: **`rounded-full`**.

### Image treatment

- Agent portraits: object-cover, rounded container (card or `rounded-xl` thumbs).
- `alt=""` only when decorative adjacent to visible name text; otherwise name the seat.
- No stock Unsplash heroes as product explanation.
- No traffic-light browser chrome around previews.

---

## Components

### Conversion

#### `install-block`

Terminal-style card: optional “install” header bar, `$` + mono command `npx tastetest init`, primary **Copy** via `ButtonCopy` with visible labels (`Copy` / `Copied`).

- Full: soft primary-tinted shadow  
- Compact: sticky bar variant, no honesty line (space)  
- **Preserve:** command string and labeled Copy — never icon-only  

#### `install-honesty`

One line under full install:

> Package not on npm yet. From this repo: `node bin/tastetest.js init`

On dark close band: inverted muted text. Remove only when npm package is real.

#### `agent-prompt-copy`

Inline text control that copies `Run EmpathFlow`. Underline decoration with primary tint; not a second primary button.

#### `sticky-install-bar`

Fixed bottom (mobile full width) / bottom-right card (desktop). Shows after ~520px scroll. Motion: y/opacity ~220ms ease-out; respect `useReducedMotion`.

### Navigation & chrome

#### `site-header`

Sticky, blurred. Logo = `SiriOrb` (28px) + wordmark. Links: How, Sample, Crew (md+), Skills, GitHub, **Start** / Get started (always visible; short label on mobile).

#### `site-footer`

Multi-column: product anchors, skill file links, resources. Sample points to `/#report` and full `/report`.

#### `siri-orb`

Decorative brand motion only. Colors from orb palette. Must honor `prefers-reduced-motion` (component CSS). Never the only affordance for a real action.

#### `scramble-hover`

Optional polish on **non-critical** labels (e.g. GitHub). **Never** on H1 or primary install.

### Proof & demos

#### `product-preview`

Tabbed card: Code · Agent · Report. Tabs switch real panels; optional auto-loop disabled under reduced motion. Footer helper: “click tabs or watch the loop.”

#### `sample-excerpt`

Static report slice: three score chips + P0 rows with mono paths. Used on homepage sample section. Full narrative lives at `/report` (Acme Checkout — not dogfood chrome).

#### `gap-demos`

2×2 Before/After cards (hierarchy, components, empty/error, flow). Toggle must change meaning. No fake media.

#### `pipeline-demo`

Three steps (init → agent → report) with live preview panel. Click selects stage; auto-loop optional with reduced-motion off.

### Depth (secondary personas)

#### `agent-roster`

- **Lead:** Orchestrator + PM-Avery / Jordan / Sam — horizontal profile cards  
- **Craft council:** compact list rows (Empathy, Journey, Craft, Motion, Frontend)  
- Link out to full `AGENTS.md` — do not imply the grid is the entire crew without “highlights”

#### `skills-showcase`

- **Featured (2):** EmpathFlow + Anti-slop — large cards  
- **Also in the pack:** mono file rows for motion, frontend, prose, collaboration  

#### `org-structure`

Reporting diagram / seat map for process credibility. Informative, not the primary conversion surface.

### Buttons (shadcn)

| Variant | Marketing use |
|---------|----------------|
| `default` (primary) | Start, Read full sample, Copy install emphasis |
| `outline` | See sample, secondary section actions |
| `ghost` | GitHub, low-emphasis |
| `link` | Rare; prefer underlined text for tertiary |

Marketing often overrides size to `h-11` + `rounded-full` + `px-5`/`px-6` for hero/section CTAs.

### Report route (`/report`)

- Chrome: “Sample output · fictional product” + **Acme Checkout — EmpathFlow report**  
- Body: `content/sample-report.md`  
- Meta must not say “dogfood”  
- Dogfood process reports stay in repo `tastetest-report/`, not marketing sample chrome  

---

## Motion

Canonical rules: root **`MOTION.md`** + `skills/motion/STANDARDS.md`.

| Principle | TasteTest application |
|-----------|------------------------|
| Frequency | Marketing loops OK (tabs/pipeline ~3s); never animate keyboard/high-frequency UI |
| Easing | Custom ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for UI enter/exit |
| Duration | UI ≤ ~300ms; marketing may run slightly longer |
| GPU | Prefer transform/opacity; avoid layout animation |
| Reduced motion | `useReducedMotion` / CSS media — shorter or static |
| Ban | `transition: all`, `scale(0)`, ease-in on UI, animating primary Copy as decoration |

Hover motion: gate with `@media (hover: hover) and (pointer: fine)` when scaling portraits/cards.

---

## Do’s and Don’ts

### Do

- Keep **one obvious primary action** per section; install path always recoverable (sticky + close).  
- **Label** incomplete paths; prefer honesty over deleting install.  
- Link to **proof** (sample) before deep crew/skills.  
- Vary section anatomy (split / list / featured+list / dark close).  
- Use primary blue for conversion; mono for commands and paths.  
- Keyboard focus rings (`ring` = primary).  
- Mobile: keep Start/install reachable (nav + sticky).  
- Run **ANTI-SLOP** after visual changes; **MOTION** when animating.

### Don’t

- Icon-only primary actions without text.  
- Fake Play / tabs / filters that change nothing.  
- Interactive chrome inside the main H1.  
- Near-white primary buttons on white canvas.  
- Glassmorphism, dark OLED IDE skin, or coral-as-CTA (not this brand).  
- Uppercase mono eyebrow on **every** section.  
- Identical 3–4 column feature/pipeline cards (01–04 decoration).  
- Traffic-light browser chrome or letter-avatar empathy grids as default.  
- Same `rounded-2xl + border + soft shadow` on every block without hierarchy.  
- Replace install with abstract “2 steps” prose.  
- Ship redesigns without design brief answers from Orchestrator + Persona Managers (`FRONTEND.md` Step 0).

---

## Voice (microcopy)

- Short sentences. Krug: omit needless words.  
- Specific over clever. Evidence over vibes.  
- Admit V1: skill-first, agent-run.  
- Stop-slop prose: no “cool,” “actually,” “still want…?” filler — see `skills/stop-slop-prose/`.  
- Primary conversion strings: `npx tastetest init`, `Run EmpathFlow`, sample CTAs **Read full sample** / **See sample report**.

---

## Responsive behavior

| Range | Behavior |
|-------|----------|
| **&lt;640px** | Single column; hero stacks; nav: How · Skills · GitHub icon · **Start**; Crew/Sample may hide; sticky install full width |
| **640–1024** | Wider single/two column; more nav labels |
| **≥1024** | Full nav; 2-col hero/sample; 2-col lead roster; pipeline split |

### Touch

- Primary CTAs `h-11` with pill padding.  
- Sticky install always tappable after scroll.  
- Before/After and pipeline targets are full-card/button sized.

### Collapse strategy

- Nav: progressive disclosure of Crew/Sample by breakpoint; **Start always on**.  
- Grids: 2-col → 1-col.  
- Sticky: bottom sheet on mobile → floating card on `sm+`.

---

## Accessibility baseline

- One real H1; logical H2/H3 hierarchy.  
- Buttons/links: visible labels matching behavior.  
- Contrast: primary blue on white; white text on primary and on dark close band.  
- Prefer `button` / `a` semantics; no nested interactives in headings.  
- Focus visible via ring tokens.  
- Reduced motion respected for Framer and orb.  
- ScrambleHover only on non-critical nav.

---

## Iteration guide

1. **Start** from light canvas (or the single dark close band). No mid-tone full-page fill unless it is sample band `oklch(0.97 0.012 265)` or muted section.  
2. **Primary action** = install or “Read full sample” — one filled primary; companion outline/ghost.  
3. **Proof** = `product-preview` or `sample-excerpt` / `/report` — never invent fake dashboards.  
4. **Depth** = roster list + skills rows + org — after conversion/proof.  
5. **Components:** reuse `InstallBlock`, `ButtonCopy`, shadcn variants, SmoothUI only with jobs.  
6. **Gate:** ANTI-SLOP screenshot test · MOTION if animated · preserve list (install, sample integrity, GitHub).  
7. **Personas:** multi-persona impact before shipping layout that buries install or sample.  
8. **Consensus** for homepage redesign: Orchestrator · all PMs · Journey · Craft · Motion (+ Prose if copy-heavy).

---

## Known gaps

| Gap | Status / rule |
|-----|----------------|
| `npx tastetest init` not on npm | Honesty line required until publish |
| Sample is fictional Acme | Label as example; never dogfood chrome on `/report` |
| Agent portraits are illustrative | Not real employees; craft still applies (no toy UI) |
| Full AGENTS.md roster larger than marketing highlights | Link AGENTS.md; say “highlights” |
| Dark theme tokens exist in CSS | Marketing ships light-first; dark not primary brand |
| Proprietary competitor fonts | N/A — use Space Grotesk / DM Sans / Geist Mono only |

---

## File map

| Concern | Location |
|---------|----------|
| Tokens | `src/app/globals.css` |
| Fonts | `src/app/layout.tsx` |
| Homepage | `src/components/home-page.tsx` |
| Marketing modules | `src/components/marketing/*` |
| SmoothUI | `src/components/smoothui/*` |
| Buttons | `src/components/ui/button.tsx` |
| Sample content | `content/sample-report.md` |
| Sample page | `src/app/report/page.tsx` |
| Anti-slop / motion / frontend process | repo root skills |

---

*When tokens or structure change in code, update this file in the same PR so agents and humans stay aligned.*
