# playbook.md
## Heuristic Auditor + shared gates

Used by **Heuristic Auditor** and as the shared short checklist for every panel.

---

## Don’t Make Me Think (Krug)
- Self-evident design
- Design for scanning
- Conventions over novelty
- Omit needless words
- Obvious next action

## Occam’s Razor (UX)
Prefer the simplest structure that still does the job.
- Simplify navigation and section count
- Reduce cognitive load (less simultaneous info)
- Minimize required input
- Remove elements that don’t serve the primary job
- Usability before decorative aesthetics

## Density
- Every block must earn its place
- Prefer fewer, stronger sections
- If the page feels full, cut before adding

## Hierarchy
- One primary action per view
- Clear visual order: **what → why → proof → action**

## Professionalism
- Consistent spacing and type
- Real empty / loading / error / disabled states
- No fake controls
- No invented metrics or social proof

## Accessibility baseline (hard gate smoke)
- Focus states visible
- **WCAG 2.4.11 Focus Not Obscured (Minimum), Level AA:** when tabbing through the rendered surface, no focused component may be entirely hidden by author-created sticky headers/footers, cookie banners, chat widgets, non-modal dialogs, drawers, notifications, or overlays
- Interactive elements have names/labels
- Contrast sufficient for body and CTA
- Keyboard can reach primary actions
- Motion respects reduced-motion when decorative

### WCAG 2.4.11 browser procedure

1. Test every touched route at desktop and mobile with sticky and persistent layers in their initial state.
2. Traverse the complete keyboard path in both directions. At each stop, capture or record whether any part of the focused component remains visible in the viewport.
3. Open persistent user-controlled disclosures such as chat, drawers, and non-modal dialogs and repeat the affected path.
4. Pass user-opened content only when the focused component can be revealed without advancing focus, for example with `Escape` or viewport scrolling.
5. A modal passes only when it takes focus and constrains focus until dismissal.
6. Record `pass | fail | n/a: reason` as `verification.states.focus_not_obscured`. `n/a` is valid only when the surface has no focusable component.

Prefer no obstruction. The AA minimum permits partial obstruction, but a completely hidden focused component is a release blocker.

## Hard-gate scores (1–10)

| Gate | Question |
|------|----------|
| Clarity | Self-evident in 3s? |
| Density | Anything cuttable? |
| Hierarchy | Primary action obvious? |
| Trust | Real states + honest claims? |
| A11y smoke | Baseline above passable? |

Any gate ≤ 4 on a conversion surface → **Block** implement of “polish only”; fix the gate.

## Preserve-first
Do not delete install / signup / primary CTA to “clean” the audit.  
Label incomplete implementation honestly.
