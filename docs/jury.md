# Jury + Awwwards — optional audit engine

**Upstream:** [juliobsz/skills](https://github.com/juliobsz/skills) (MIT) — `/jury` and `/awwwards`.
**Install:** `npx skills add juliobsz/skills -g` (or `--skill jury` for the audit only).

Panel stays fully functional without either skill. When installed, `/jury` is Panel's **rendered-evidence and blind-score engine**; `/awwwards` is an **optional craft reference** for authorized redesigns. Neither replaces a Panel seat, approval, permit, or verdict.

---

## Detection (preflight)

No version field ships in either frontmatter, so detect by presence:

| Skill | Active when | Otherwise |
|-------|-------------|-----------|
| `/jury` | Host exposes a `jury` skill **and** `<skill-root>/scripts/shoot.mjs` + `scripts/audit.mjs` exist | `jury.status: n/a` — skip, never block |
| `/awwwards` | Host exposes an `awwwards` skill **and** `<skill-root>/references/` exists | Skip, never block |

Record the result in `panel-report/run-state.yaml` → `jury:`.

---

## Where /jury plugs in

### Who runs it

Harness seats run read-only or artifact-write without a shell, so a seat cannot run the jury scripts itself. The **Orchestrator** captures the Phase 4 baseline and the **Implementation Verifier** (or Orchestrator on its behalf) captures the Phase 8 re-score, outside seat sandboxes. Seats receive `.jury/<host>/` as read-only input. Writing `.jury/` and a production build output is evidence capture, not a product write, and needs no permit. Suggest the user add `.jury/` to `.gitignore` so screenshot dumps stay out of commits.

### Phase 4 — baseline evidence (critique wave)

Run before the critique wave so Craft, Heuristic, and Motion critique the same frozen evidence.

1. **Production build only.** Score a deployed URL or a local production build served per the jury skill (`next start`, or `scripts/serve.mjs <dist>`). A dev server invalidates WPO numbers; if only a dev URL exists, record that on the card and in `jury.notes`.
2. **Evidence:**
   ```bash
   node <jury>/scripts/shoot.mjs <url> --crawl --nav --out <abs>/.jury/<host>/shots
   node <jury>/scripts/audit.mjs <url> > <abs>/.jury/<host>/audit.txt
   ```
   `audit.mjs` exiting `1` is a finding, not a broken run. Do not add Playwright/axe to the reviewed project for a review-only run; use the jury cache folder (`~/.cache/jury`).
3. **Blind critic.** Hand a **fresh subagent** only the jury critic brief, the rubric, and the `.jury/<host>/` evidence paths. See the blindness carve-out below.
4. **Scorecard** lands at `.jury/<host>/scorecard.md`. Record its path as `jury.baseline_scorecard`.

### How critics consume it

| Seat | Uses | Must not |
|------|------|----------|
| **Craft Critic** | Desktop/mobile frames, rest/hover pairs, Design + Creativity evidence, ranked fixes | Adopt a jury fix without the ANTI-SLOP finding format and a DESIGN.md cite |
| **Heuristic Auditor** | Usability evidence, axe, tap targets, overflow, `colorOnly`, `noHoverChange`, audit FAIL/WARN | Treat an axe pass as the full a11y gate |
| **Motion Critic** | Reduced-motion frames, idle motion, transition frames, FPS | Score how motion *feels* from stills (jury does not either) |
| **Journey Critic** | 3-second orientation evidence (hero frames per page type) | Replace persona journeys with jury's anonymous visitor |
| **Product Analyst** | Content score + placeholder / AI-copy tells from the audit | — |

Jury's ranked fixes are **candidate findings**. Each one that survives is deduplicated into `panel-report/findings.json` under one finding ID with Panel severity (`Block | P0 | P1 | P2`), owner, persona impact, and an acceptance check. A jury fix that conflicts with a persona non-negotiable, the preserve list, or `DESIGN.md` loses; record the rejection in the owning seat's artifact.

### Phase 8 — re-score (Implementation Verifier)

After the Executor ships, rebuild production and rerun steps 2–4 with a **new** critic that never sees the earlier card. Rename the old card `scorecard-<n>.md` first. Record `jury.post_scorecard` and the per-category delta in `panel-report/verification.md`.

A score drop in any category is a **visual-regression signal** the verifier must investigate and resolve or explain; it is not automatically a fail.

---

## Hard boundaries

1. **Blindness carve-out.** Panel says every specialist reads run-state. The jury critic is **not** a Panel specialist and is the one exception: it gets **no** run-state, `DESIGN.md`, personas, hypotheses, calibration pack, source, or the jury skill's own `references/calibration.md`. Leaking any of these makes the score non-independent; mark `jury.independent: false`.
2. **Two different "calibration" files.** Panel's `docs/design-calibration.md` (positive/anti references) and jury's `references/calibration.md` (critic-vs-real-jury offset) are unrelated. Never feed either to the jury critic.
3. **Supporting evidence, never the verdict.** A jury score cannot set `verification.verdict`, fill the state matrix, or move `delivery_status`. In particular, `shoot.mjs` keyboard-focus frames **do not prove** WCAG 2.4.11 `focus_not_obscured` — that still requires the `playbook.md` procedure with sticky/persistent layers present.
4. **Skill-use proof.** Every seat that cites jury evidence lists `jury/SKILL.md` under its `skills_used` files, with the hook naming the scorecard path and the frame/field that changed its finding. Unrecorded jury use is invisible and does not count.
5. **Provenance.** `.jury/<host>/` lives outside `panel-report/` and carries no run stamp, so it is not admissible by itself. The citing seat artifact (`craft.md`, `heuristics.md`, `verification.md`) must carry the active `Run:` stamp and cite the scorecard path plus the specific frame or report field. Copying binary frames into `panel-report/` requires `<file>.provenance.json` per `docs/harness.md`.
   **`verification.desktop_evidence` / `mobile_evidence` never list a `.jury/` path directly.** `panel validate` only checks that the file exists, so a raw `.jury/` frame would bypass provenance. Either keep jury frames in the verification "Jury evidence" table only, or copy the frame into `panel-report/` with its `.provenance.json` sidecar first and list that copy.
6. **Labeling.** Every jury number in a Panel artifact or report is labeled *estimate, not affiliated with Awwwards*, and keeps **critic score** and **jury estimate** separate. Developer areas get no jury estimate. Panel's own hard-gate scores (`playbook.md`) are never replaced by jury numbers.
7. **Self-score.** If the same agent built or edited the surface in this run and cannot spawn a subagent, the card says self-score and `jury.independent: false`. A non-independent score may inform findings but may not be cited as an Approve.

---

## /awwwards — optional craft reference

The user-facing audit is what Panel adopts. `/awwwards` is a full builder whose workflow conflicts with Panel law (no questionnaire, writes its own `DESIGN.md`, installs deps, deploys). Panel therefore uses it **only as a reference library**:

| Who | When | May load |
|-----|------|----------|
| Frontend Design | Approved hypothesis authorizes redesign of a marketing / `Experience` surface | `references/concepts.md`, `art-direction.md`, `layout.md`, `typography.md` — after the Panel brief and `DESIGN.md` |
| Motion Critic | Signature-moment or page-transition proposals | `references/motion.md`, `engine.md` |
| Executor | Implementing an approved motion/WebGL proposal under a permit | `references/engine.md`, `nextjs.md` / `astro.md`, `webgl.md` |

**Forbidden in a Panel run:** running the `/awwwards` workflow end to end; skipping the design brief; writing or overwriting `DESIGN.md` (Design System Checker owns it); installing dependencies or editing product code without a registered permit; replacing approved copy (Isa owns narrative); deploying. Its "8/10 in every category" bar is an aspiration for the proposal, not a release gate — `panel validate` and the Implementation Verifier remain the gate.

Cite any `/awwwards` reference used in the seat's `skills_used` entry like any other skill.
