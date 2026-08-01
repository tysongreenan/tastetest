"""Task definitions for Panel review stages.

Manager enforces order (PANEL.md Phase 0–9):
preflight → product/personas → journeys → critique → proposals → cross-critique/hypotheses →
report/consensus → implement → verify → learning

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
            "Resolve design system via root DESIGN.md (Panel: web/DESIGN.md); set run-state "
            "design_system.path. Confirm preserve list. Only after preflight started."
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
        name="design_md_health",
        description=(
            "BLOCKING for visual runs. Design System Checker only. Load DESIGN-SYSTEM.md + "
            "skills/design-md/ (AUDIT, QUALITY, STARTER as needed). Resolve path via root DESIGN.md. "
            "Full-load living DESIGN.md; sync audit vs code; score doc_quality professional|thin|rewrite; "
            "write run-state design_system (path, status, constraints, alignment, doc_quality, sections_cited). "
            "Write panel-report/design-system.md. Propose DESIGN.md patch if drift/thin. "
            "Draft starter if client missing. Veto visual ship if alignment fail or doc rewrite."
        ),
        expected_output=(
            "design-system artifact: alignment matrix, doc_quality, constraints, ship gate Approve/Veto."
        ),
        blocking=True,
    ),
    TaskSpec(
        name="heuristic_and_design_audit",
        description=(
            "Evaluate against playbook.md (Krug, Nielsen, Laws of UX, fluidity checklist, "
            "a11y, AI-era patterns). Reference design_system alignment from design_md_health; "
            "do not re-own DESIGN.md quality (Design System Checker owns that)."
        ),
        expected_output=(
            "Heuristic Evaluation: hard gates pass/fail; cite design_system alignment if relevant."
        ),
    ),
    TaskSpec(
        name="frontend_design_brief",
        description=(
            "BLOCKING for Frontend Design. Interview Orchestrator + required Persona Managers "
            "for the run class (priority PM by default on standard; all seated PMs on full) "
            "for visual preferences: feel, trust/bounce, references, section depth, motion appetite. "
            "Orchestrator confirms priority + secondary non-negotiables + preserve list. "
            "No ui-ux-pro-max search or layout proposal until answers are written AND "
            "design_system.status is loaded or missing-drafted (FRONTEND.md Step 0 + 0b). "
            "See COLLABORATION design brief."
        ),
        expected_output="Design brief Q&A log with answers from Orchestrator and required PM-* seats.",
        blocking=True,
    ),
    TaskSpec(
        name="frontend_design_system",
        description=(
            "Only after frontend_design_brief and design_system load. Run skills/ui-ux-pro-max "
            "using keywords from the brief + DESIGN.md overview. Multi-persona impact table with "
            "DESIGN.md align column. Cite DESIGN.md sections followed. Reject library hits that "
            "fight DESIGN.md, PM answers, Craft, or Motion."
        ),
        expected_output=(
            "Frontend Design System: brief summary, design_system constraints, library cites, "
            "accepted vs rejected, persona fit, section cites."
        ),
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
        name="marketing_copy",
        description=(
            "For marketing surfaces, Isa loads COPY.md + skills/marketing-copy, checks product truth, "
            "and owns SB7, scan hierarchy, product-show, and CTA strategy before Frontend layout."
        ),
        expected_output="panel-report/copy.md with narrative, product-show, CTA, and evidence.",
    ),
    TaskSpec(
        name="draft_hypotheses",
        description=(
            "Orchestrator assigns H-IDs to every material proposal. Record persona, evidence, expected "
            "outcome, secondary harm risk, falsifiable signal, owner, and adjacent challenger."
        ),
        expected_output="panel-report/hypotheses.md with testable proposal ledger.",
        blocking=True,
    ),
    TaskSpec(
        name="cross_critique",
        description=(
            "Adjacent specialists challenge frozen proposals. Each challenge must mutate or reject a "
            "proposal/hypothesis/test, or uphold it with new evidence. Bare agreement is invalid."
        ),
        expected_output="Cross-critique outcomes recorded against H-IDs in panel-report/hypotheses.md.",
        blocking=True,
    ),
    TaskSpec(
        name="write_report",
        description=(
            "Assemble full Markdown report including Preflight status, persona grounding, "
            "Executive Summary scores, all prior sections, prioritized recommendations, ideal flows. "
            "Deduplicate recommendations into panel-report/findings.json using the shipped schema; "
            "If preflight was NO-GO, report is preflight + personas only — not a fake complete audit. "
            "Scores must be owned by domain roles — Report Writer does not invent scores."
        ),
        expected_output="panel-report/report.md + validated panel-report/findings.json (or NO-GO preflight package).",
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
    TaskSpec(
        name="verify_implementation",
        description=(
            "After UI implementation, inspect the running product in a real browser at desktop and "
            "mobile. Check applicable interaction/content states, keyboard and reduced motion, compare "
            "against baseline, preserve list, calibration, and DESIGN.md. Static inspection cannot pass."
        ),
        expected_output="panel-report/verification.md with evidence and PASS|REVISE|BLOCK verdict.",
        blocking=True,
    ),
    TaskSpec(
        name="close_learning_loop",
        description=(
            "Compare predicted and observed outcomes for every implemented H-ID. Mark confirmed, "
            "disproved, or inconclusive without inventing causality. Route reusable learning to its "
            "system-of-record owner; give inconclusive results a narrower next-run test."
        ),
        expected_output=(
            "panel-report/learning.md plus cited updates to DESIGN.md, calibration, personas, or skills."
        ),
        blocking=True,
    ),
)
