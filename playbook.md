# EmpathFlow / TasteTest UX Playbook (2026)

## Core Philosophy – Steve Krug (*Don’t Make Me Think*)

- Design should be self-evident. If the user has to stop and think, we failed.
- Users scan pages; they don’t read them. Design for scanning.
- Conventions are your friends — don’t reinvent navigation, buttons, or form patterns without strong reason.
- Clarity beats cleverness every time.
- Omit needless words. Kill happy talk and filler.
- Navigation must always answer: Where am I? What can I do here? Where can I go next?
- Reduce cognitive load aggressively. Every extra decision or ambiguity costs trust.
- Good design feels effortless. Professional products make the right action the obvious action.

## Nielsen’s 10 Usability Heuristics

1. Visibility of system status  
2. Match between system and the real world  
3. User control and freedom  
4. Consistency and standards  
5. Error prevention  
6. Recognition rather than recall  
7. Flexibility and efficiency of use  
8. Aesthetic and minimalist design  
9. Help users recognize, diagnose, and recover from errors  
10. Help and documentation

## Key Laws of UX

- Fitts’s Law  
- Hick’s Law  
- Jakob’s Law  
- Aesthetic-Usability Effect  
- Miller’s Law / cognitive load limits  
- Peak-End Rule

## EmpathFlow Fluid & Professional Checklist

- Clear visual hierarchy and scanning path
- Consistent spacing, rhythm, and alignment
- Strong, obvious primary actions
- High-quality empty / loading / error / success states
- Microcopy that is clear, human, and useful
- Design system / DESIGN.md adherence
- Perceived performance (fast feel, skeleton states)
- Trust signals and conversion clarity
- Mobile / responsive feel
- Accessibility baseline (focus states, contrast, labels, keyboard)

## AI-Era Additions (2026)

- Progressive disclosure over overwhelming the user
- Clear system status when AI is involved
- Avoid generic AI-generated UI smell (inconsistent components, weak hierarchy, bland microcopy)

## Craft / Anti-slop (see `ANTI-SLOP.md`)

Narrative clarity ≠ visual professionalism. Score craft separately.

**Also run:** `MOTION.md` (animation) and `skills/stop-slop-prose/` (writing).

**Common agent slop (flag as P0 craft when repeated):**
- Section template on loop: uppercase eyebrow + H2 + muted P + card grid
- Identical 3–4 column feature/pipeline cards (01–04 decoration)
- Fake browser chrome (traffic-light dots) as “product preview”
- Letter avatars + 2×2 empathy grids as default “persona UI”
- Green check / red bang journey steppers from onboarding templates
- Sticky left pitch + right mock layout as the only proof pattern
- Same `rounded-2xl + border + soft shadow` on every surface
- Stock photos or dashed mono path chips pretending to be the product

**Slop test:** If a stranger would say “AI made that” from a screenshot, craft fails — even if the story is good.

**Fix rule:** Change structure and composition. Do not only rewrite copy inside the same template.

## Motion (see `MOTION.md` + `skills/motion/STANDARDS.md`)

Upstream craft bar: [emilkowalski/skills](https://github.com/emilkowalski/skills).

- Frequency gate first (keyboard / 100+/day → never animate)
- Enter/exit: strong `ease-out`; never `ease-in` on UI
- UI under 300ms; GPU: `transform` + `opacity` only
- No `scale(0)`; popovers origin-aware; reduced-motion required
- Findings as `| Before | After | Why |` — Block or Approve
- Prefer delete over decorate

## Prose stop-slop (see `skills/stop-slop-prose/`)

Upstream: [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop).

- Kill throat-clearing, adverbs, binary contrasts, false agency
- Active voice; varied rhythm; no em-dash spam
- Score 5 dimensions; below 35/50 → revise

## Accessibility Baseline

- Aim for WCAG 2.2 practical compliance on interactive elements
- Visible focus, proper labels, sufficient contrast, no keyboard traps

## Hard Gates (TasteTest dogfood lessons)

Fail any of these → treat as P0; professionalism score should not exceed 6 until fixed.
**Gates diagnose problems. They do not authorize deleting the product’s conversion path.**

1. **CTA honesty** — Primary CTA matches reality *or* is clearly labeled. Prefer ship/fix `init` over removing install UI.
2. **No false affordances** — Controls imply real behavior (no Play without video, no dead filters).
3. **Real H1** — Main title is not a fake button/control (motion on a phrase is OK).
4. **Labeled primary actions** — Conversion actions have visible text, not icon-only.
5. **Demos earn their place** — Interactive chrome teaches, previews, or prioritizes something real.
6. **Show the artifact** — Products that produce reports/exports preview them.
7. **Mobile parity** — Don’t hide the only path to key anchors/CTAs on small screens.

## Manager phase order (blocking)

Full EmpathFlow runs must follow:

0. **Preflight** — intent, preserve list, personas, **seat Persona Managers**, **priority council** → GO / NO-GO / lite  
1. Product understanding  
2. **Personas + priority table** (secondaries keep non-negotiables)  
3. Journeys from **all in-scope** persona JTBDs (weight priority)  
4. Critique + hard gates + **secondary harm pass**  
5. Craft / motion / prose / frontend (**multi-persona impact**)  
6. Report  
7. Council → Fixes  

**NO-GO** if full review lacks personas or never negotiates priority.  
**Grounding: weak** without personas; **Persona coverage: weak** if priority-only tunnel vision → Professionalism ≤ 6.  
**Council:** Approves per `COLLABORATION.md`; Persona Managers veto harm to their human.

## Preserve-first fix order

When a gate fails on a primary install/CTA/brand surface:

1. **Clarify** microcopy / hierarchy  
2. **Label** honesty (works / partial / roadmap)  
3. **Fix** behavior (implement init, wire the control)  
4. **Relocate** secondary  
5. **Remove** only as last resort — and name the replacement job

Never remove a documented primary install path solely because implementation is incomplete.

## Anti-patterns for reviewers (agents)

- Winning the audit by deleting conversion UI  
- Stripping a chosen component library instead of giving widgets clear jobs  
- Treating brand motion as a defect  
- Ignoring README/landing/`DESIGN.md`/user constraints  
- Multi-concern rewrites when a one-line label would clear the gate  

## Marketing / landing specific

- 10-second test: purpose, audience, next step
- Trust: proof, sample output, honest version status
- One primary path; secondary paths clearly secondary
- Motion and component libraries serve the story — they are not the story
- **Install conventions win:** `npx … init` / copy-paste command is familiar — keep it, make it honest
