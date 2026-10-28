---
description: Run the complete Panel harness audit across every user-facing page
---

Run a **full Panel review** of every user-facing page using the npm execution harness.

1. Start a managed `full` run and follow the authoritative phase order in `.panel/runs/<run-id>/state.json`.
2. Audit desktop and mobile for product promise, persona journeys, UX heuristics, visual craft, copy, motion, accessibility, interaction states, and design-system consistency. Keyboard-test WCAG 2.4.11 Focus Not Obscured with sticky and persistent overlays present; record it separately from focus visibility.
3. Load every in-scope specialist skill and record skill-use proof. If an active Impeccable skill is installed, read its version; use only major version 4, run its context script for the concrete surface, choose `Persuade | Operate | Read | Experience`, load one owning playbook (or `reference/new-work.md`), and load `reference/craft-floor.md` immediately before UI edits. Treat it as advisory to Panel and `DESIGN.md`; skip stale or missing installs without blocking the run.
4. Write every required seat artifact plus `hypotheses.md`, `findings.json`, and `learning.md` under `panel-report/` with active-run provenance.
5. Cross-critique material findings. Every challenge must mutate, reject, or uphold a hypothesis with evidence.
6. Inspect the running product in a real browser. Capture applicable states and desktop/mobile evidence; never substitute source review for rendered proof. For Impeccable-guided work, keep visual iteration bounded to one batched inspection/fix pass and at most one confirmation pass.
7. Produce a deduplicated, prioritized fix plan with concrete surfaces, persona impact, acceptance checks, owners, and evidence.
8. Do **not** modify product code until consensus is `PROCEED`, all required approvals are recorded, and the harness issues a registered write permit.
9. If implementation is requested after consensus, use one executor, consume the permit, verify fixes in the browser, run `panel validate`, and close the learning loop.

If any required page, browser, persona, design-system source, artifact, approval, or evidence is unavailable, record the exact blocker instead of claiming the run passed.
