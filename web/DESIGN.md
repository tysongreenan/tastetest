# DESIGN.md — Panel marketing site (`web/`)

**Scope:** Marketing homepage, sample report route, shared chrome (nav/footer).  
**Stack:** Next.js · Tailwind v4 · shadcn/ui · SmoothUI · Motion (Framer).  
**Source of truth for tokens:** `src/app/globals.css` · fonts: `src/app/layout.tsx`.  
**Companion skills:** root `ANTI-SLOP.md`, `MOTION.md`, `FRONTEND.md` (agent card + workflow Step 0b), `docs/personas.md`.  
**Agents:** Frontend Design and Design System Checker load this file before proposing or scoring UI.

This file is **Panel’s** system — not a third-party brand kit. Structure is inspired by deep product design extracts (overview → tokens → type → layout → components → do/don’t → iteration). Values are taken from what ships in `web/`.

---

## Overview

Panel’s marketing presence should feel like a **precise developer tool** — calm light canvas, electric blue actions, typography-first hierarchy, and one obvious conversion path: copy install → run a panel → see a real report shape. Not a craft-taste skill site; a buyer-panel product page.

The homepage opens on a value claim and an **install block** (not a demo request). Proof is a **product path preview** (code → agent → report) plus a **Sample report** link to `/report` (Acme Checkout). Skills depth is a mono file list; crew/org live on GitHub, not the homepage. Dark bands appear only as the closing install CTA, not as a default product skin. Color is mostly flat UI; soft blue radial wash sits behind the hero as atmosphere, not decoration chrome.

What makes the system distinctive is the mix of **buyer-honest conversion UI** (terminal install, labeled Copy, real npm command) with **craft restraint** (no glassmorphism, no traffic-light browser frames, no identical card grids on every section). Motion is ambient brand (orb) or state feedback — never fake affordances.

**Key characteristics**

- Cool ink on near-white canvas; primary action is saturated blue, not near-black pill enterprise.
- Space Grotesk display + DM Sans body + Geist Mono for commands/paths.
- Pill CTAs (`rounded-full`) for primary marketing actions; install uses a terminal-style card + blue Copy.
- Lean section anatomy: split hero + preview · three steps · skills mono list · dark close. (Optional full-marketing surfaces live under Components as non-ship defaults.)
- One strong artifact (sample report at `/report`) beats four explanation zones on the homepage.
- Real install path only — no fake CTAs.
- Install card always sets its own ink (`text-foreground` on `bg-card`) so the command stays readable inside the dark close band.

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

Panel does **not** use gradients as generic card fills.

| Allowed | Forbidden |
|---------|-----------|
| Soft radial hero wash (low opacity) | Glassmorphic multi-stop panels |
| `AnimatedGradientBackground` on hero only — Panel blue palette, reduced-motion static | Full-page rainbow / dark neon gradients from third-party demos |
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

- Section vertical: `py-14`–`py-20` on lean homepage (`py-16`–`py-24` if a fuller marketing page returns)
- Horizontal: `px-5`–`px-6` inside `max-w-5xl` (marketing default)
- Card padding: `p-4`–`p-6` for proof CTAs
- Stack gaps: `gap-3`–`gap-6` small UI; `gap-12`–`gap-14` hero splits

Large empty space is for **scan path and focal proof**, not for enterprise “trust strip far below the fold” theatrics. Dense content is OK in skill lists and report body.

### Grid & container

| Pattern | Spec |
|---------|------|
| **Page max** | `max-w-5xl` centered (marketing) |
| **Nav** | Logo left · How · Skills · GitHub (`aria-label` when label hidden on mobile) · Install · sticky blur header |
| **Hero** | 2-col desktop (`lg:grid-cols-2`): copy+install \| `ProductPreview` |
| **How / Three steps** | Full width; 3-col short steps on `sm+` |
| **Skills** | Mono file list (`rounded-2xl` bordered rows) + Browse skills/ link |
| **Close** | Narrow `max-w-md` centered install on `bg-foreground` band |
| **Optional (off homepage)** | Problem split · pipeline demo · sample excerpt band · crew roster · org chart — only if council re-opens full marketing |

### Whitespace philosophy

Whitespace protects the **install → sample** path. Do not fill every band with identical cards. Prefer:

1. Conversion / proof (hero + preview)  
2. Short explanation (three steps)  
3. Depth for Jordan (skills mono list → GitHub)  
4. Re-offer install (dark close; command must stay dark ink on light card)

### Launch homepage structure (shipped — source of truth)

**Primary job:** understand → copy install.  
**Secondary:** prove it’s real without a content museum.

1. Nav — logo · How · Skills · GitHub · Install  
2. Hero — H1 · one line · install + Copy · Sample report · Product preview  
3. Three steps (Init / Run / Fix) — short lines only  
4. Skills as mono file list (not card grids) + Browse skills/  
5. Dark close install band (command stays on light card) 
6. Thin footer (Sample · Agents · Skills · GitHub)

**Still off the homepage:** full crew portraits, org chart pyramid, gap demos, long sample essay, sticky install bar.  
**Sample page:** `/report`. **Crew depth:** GitHub `AGENTS.md`.

---

## Elevation & depth

Mostly flat. Depth from surface alternation, borders, and **one** soft blue-tinted shadow on primary conversion cards.

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Body sections, lists |
| Bordered | `border border-border/60–80` | Cards, tabs, demo shells |
| Soft lift | `shadow-sm` | Default cards |
| Install lift | Custom: hairline + large soft primary-tinted shadow | Full `InstallBlock` only |
| Dark field | `bg-foreground text-background` | Final CTA band only (install card keeps light surface + dark ink) |
| Blur chrome | `bg-background/80 backdrop-blur-xl` | Sticky header |

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

Terminal-style card: “install” header bar, `$` + mono command `npx @tysongreenan/panel init`, primary **Copy** via `ButtonCopy` with visible labels (`Copy` / `Copied`).

- Soft primary-tinted shadow  
- Card root: `bg-card text-foreground` — **required** so the command stays dark when the block sits on the dark close band  
- Command `code`: explicit `text-foreground`  
- **Preserve:** command string and labeled Copy — never icon-only  

#### `install-caption` (optional)

Short next-step under hero install only, e.g. “Then open Cursor or Claude → Run a panel”. Muted 11px. Dark close band has no caption — light card alone is enough.

#### `product-preview`

Tabbed proof (Code · Agent · Report). Real buttons; optional auto-cycle when motion allowed. No traffic-light browser chrome. Report tab shows scores + P0 + file path.

### Navigation & chrome

#### `site-header`

Sticky, blurred. Logo = `SiriOrb` (~26px) + wordmark. Links: How · Skills (hidden below `sm`) · GitHub (icon always; text `sm+`; **`aria-label="GitHub"` required**) · **Install** (always visible).

#### `site-footer`

Thin: brand + MIT · Sample (`/report`) · Agents · Skills · GitHub.

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

- **Featured (2):** Panel + Anti-slop — large cards  
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

- Chrome: “Sample output · fictional product” + **Acme Checkout — Panel report**  
- Body: `content/sample-report.md`  
- Meta must not say “dogfood”  
- Dogfood process reports stay in repo `panel-report/`, not marketing sample chrome  

---

## Motion

Canonical rules: root **`MOTION.md`** + `skills/motion/STANDARDS.md`.

| Principle | Panel application |
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
- Prefer a working install CTA over a museum of secondary CTAs. 
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
- Primary conversion strings: `npx @tysongreenan/panel init`, `Run a panel`, sample CTAs **Read full sample** / **See sample report**.

---

## Responsive behavior

| Range | Behavior |
|-------|----------|
| **&lt;640px** | Single column; hero stacks; nav: logo · GitHub icon (`aria-label`) · **Install**; How/Skills hidden |
| **640–1024** | Wider single/two column; How · Skills · GitHub label show |
| **≥1024** | Full nav; 2-col hero (copy \| `ProductPreview`); 3-col steps |

### Touch

- Install **Copy** and primary pills comfortably tappable.  
- Preview tabs full-width row on mobile.

### Collapse strategy

- Nav: How/Skills hide below `sm`; **Install always on**.  
- Hero: 2-col → 1-col stack.  
- Steps: 3-col → 1-col.

---

## Accessibility baseline

- One real H1; logical H2/H3 hierarchy.  
- Buttons/links: visible labels matching behavior (icon-only GitHub needs `aria-label="GitHub"`).  
- Contrast: primary blue on white; white text on primary and dark close **headings**; install **card** keeps dark ink on light surface (never inherit close-band `text-background` onto the command).  
- Prefer `button` / `a` semantics; no nested interactives in headings.  
- Focus visible via ring tokens.  
- Motion: honor `prefers-reduced-motion` on hero entrance, gradient breathing, preview cycle/typing.  
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
| Install command | `npx @tysongreenan/panel init` (scoped — bare `panel` blocked as too similar to `taste-test`) |
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
