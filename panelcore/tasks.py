"""Task definitions for Panel review stages.

Manager enforces order (PANEL.md Phase 0–6):
0. Preflight (blocking) → 1–2 product + personas → 3 journeys → 4 critique → 5 specialists → 6 report

TODO: wire into multi-agent task graph with hard edges (no critique before personas GO).
"""

from __future__ import annotations

from dataclasses import dataclass

from panelcore.agents import AgentSpec


@dataclass(frozen=True)
class TaskSpec:
    name: str
    description: str
    expected_output: str
    agent: AgentSpec | None = None
    """If True, later audit tasks must not run until this completes successfully."""
    blocking: bool = False


TASKS: tuple[TaskSpec, ...] = (
    TaskSpec(
        name="manager_preflight",
        description=(
            "Phase 0 ONLY (Orchestrator). Scope the review. Capture intent pack. Check personas file. "
            "Build preserve list. If personas missing: NO-GO — Empathy Mapper drafts only. "
            "If personas exist: seat Persona Manager per persona, run priority council "
            "(Priority / Secondary non-negotiables / Deferred). No single-persona silence. "
            "Lite waiver only for narrow craft pass — Preflight: lite."
        ),
        expected_output=(
            "Preflight: GO|NO-GO|lite, intent, preserve list, persona source, "
            "Persona Managers seated, priority table, secondary non-negotiables."
        ),
        blocking=True,
    ),
    TaskSpec(
        name="persona_priority_council",
        description=(
            "Each Persona Manager pitches for priority this run. Council records Priority, "
            "Secondary (with non-negotiables), Deferred. Multi-persona impact required on later proposals. "
            "Blocking before journeys."
        ),
        expected_output="Priority table + non-negotiables; all PM seats listed.",
        blocking=True,
    ),
    TaskSpec(
        name="understand_product",
        description=(
            "Scan routes, pages, components, forms, navigation, design tokens, README, "
            "and package manifests. Infer purpose, features, and primary user goals. "
            "Locate or note missing DESIGN.md. Confirm preserve list. Only after preflight started."
        ),
        expected_output="Product Understanding section with purpose, features, and code anchors.",
    ),
    TaskSpec(
        name="build_personas",
        description=(
            "Blocking. Load docs/personas.md if present; else draft 2–3 personas with full empathy maps. "
            "Seat PM-<Name> for each. Do not skip priority council. "
            "Persist to docs/personas.md when this product's marketing. Orchestrator signs off."
        ),
        expected_output="Personas & maps; PM seats; path to personas file if written.",
        blocking=True,
    ),
    TaskSpec(
        name="define_journeys",
        description=(
            "Only after personas + priority council. Flows from persona JTBDs — cite persona + PM. "
            "Weight priority; include ≥1 journey or success check per secondary in scope. "
            "First-time/buyer, try/install, proof as relevant."
        ),
        expected_output="Critical Journeys with multi-persona coverage and success criteria.",
        blocking=True,
    ),
    TaskSpec(
        name="critique_journeys",
        description=(
            "After journeys defined. Live or static. Priority persona first, then secondary harm pass "
            "(each PM). Cite evidence. No start on NO-GO preflight."
        ),
        expected_output="Journey Critique with persona-tagged friction and evidence.",
    ),
    TaskSpec(
        name="heuristic_and_design_audit",
        description=(
            "Evaluate against playbook.md (Krug, Nielsen, Laws of UX, fluidity checklist, "
            "a11y, AI-era patterns). Check DESIGN.md adherence or draft a starter."
        ),
        expected_output="Design System & Heuristic Evaluation section.",
    ),
    TaskSpec(
        name="frontend_design_brief",
        description=(
            "BLOCKING for Frontend Design. Interview Orchestrator + every seated Persona Manager "
            "for visual preferences: feel, trust/bounce, references, section depth, motion appetite. "
            "Orchestrator confirms priority + secondary non-negotiables + preserve list. "
            "No ui-ux-pro-max search or layout proposal until answers are written. "
            "See FRONTEND.md Step 0 and COLLABORATION design brief."
        ),
        expected_output="Design brief Q&A log with answers from Orchestrator and each PM-*.",
        blocking=True,
    ),
    TaskSpec(
        name="frontend_design_system",
        description=(
            "Only after frontend_design_brief. Run skills/ui-ux-pro-max using keywords from the brief. "
            "--design-system then domain/stack as needed. Multi-persona impact table. "
            "Cite pattern, style, palette, type. Reject library hits that fight PM answers or Craft/Motion."
        ),
        expected_output="Frontend Design System: brief summary, library cites, accepted vs rejected, persona fit.",
    ),
    TaskSpec(
        name="craft_anti_slop_audit",
        description=(
            "Apply ANTI-SLOP.md: screenshot/template tests, ban-list pattern hits, craft score. "
            "Narrative clarity without craft still fails. Prefer redesign-structure over label polish."
        ),
        expected_output="Craft / Anti-slop Evaluation with pattern names, evidence, and craft 1–10.",
    ),
    TaskSpec(
        name="motion_audit",
        description=(
            "Apply MOTION.md + skills/motion/STANDARDS.md. Findings table Before/After/Why. "
            "Frequency gates, easing, duration, GPU, reduced-motion. Verdict Block or Approve. "
            "Prefer delete for purposeless or high-frequency motion."
        ),
        expected_output="Motion Evaluation: score, findings table, delete list, opportunities, Block/Approve.",
    ),
    TaskSpec(
        name="prose_stop_slop_audit",
        description=(
            "Apply skills/stop-slop-prose on visible marketing/microcopy. Score 5 dimensions "
            "(directness, rhythm, trust, authenticity, density). Flag banned phrases/structures. "
            "Check copy speaks to primary persona JTBD."
        ),
        expected_output="Prose evaluation with scores and concrete rewrite suggestions.",
    ),
    TaskSpec(
        name="write_report",
        description=(
            "Assemble full Markdown report including Preflight status, persona grounding, "
            "Executive Summary scores, all prior sections, prioritized recommendations, ideal flows. "
            "If preflight was NO-GO, report is preflight + personas only — not a fake complete audit. "
            "Scores must be owned by domain roles — Report Writer does not invent scores."
        ),
        expected_output="Complete Panel report as Markdown (or NO-GO preflight package).",
        blocking=True,
    ),
    TaskSpec(
        name="council_consensus",
        description=(
            "Before any code/copy implement on a full run: COLLABORATION.md council. "
            "Proposal → consult → Approves/Vetoes → consensus log with multi-persona impact "
            "(priority help/hurt, secondary non-negotiables). "
            "Homepage redesign needs all Persona Managers + domain Approves. "
            "PROCEED only if must_approve yes; else REVISE or BLOCK."
        ),
        expected_output="Consensus log with multi-persona impact: PROCEED|REVISE|BLOCK.",
        blocking=True,
    ),
    TaskSpec(
        name="implement_approved",
        description=(
            "Execute only what consensus APPROVED. No drive-by extras. "
            "Domain owners re-check their lane after edit if material."
        ),
        expected_output="Diff limited to approved scope; note any user overrides.",
    ),
)
