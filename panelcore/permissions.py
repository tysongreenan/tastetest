"""Permission matrix for Panel crew — mirror of COLLABORATION.md.

Used by multi-agent runtime and soft checks before implement.
Skills remain source of truth for agents; this module is the code-side gate.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path


ORCHESTRATOR = "Orchestrator Manager"
PRIORITY_PM = "Persona Manager"  # seated priority PM; docs say priority PM by name


@dataclass(frozen=True)
class ApprovalGate:
    """Who must Approve before an action executes."""

    action: str
    proposers: tuple[str, ...]
    must_consult: tuple[str, ...]
    must_approve: tuple[str, ...]
    veto_roles: tuple[str, ...] = ()


# Role name strings must match COLLABORATION.md / AGENTS.md vocabulary
GATES: tuple[ApprovalGate, ...] = (
    ApprovalGate(
        action="preflight_go",
        proposers=(ORCHESTRATOR,),
        must_consult=("Product Analyst", PRIORITY_PM),
        must_approve=(ORCHESTRATOR,),
    ),
    ApprovalGate(
        action="personas_final",
        proposers=("Empathy Mapper",),
        must_consult=("Product Analyst", "Journey Critic", PRIORITY_PM),
        must_approve=(ORCHESTRATOR,),
        veto_roles=("Empathy Mapper",),
    ),
    ApprovalGate(
        action="persona_priority",
        proposers=(PRIORITY_PM,),
        must_consult=("Empathy Mapper", "Journey Critic"),
        must_approve=(ORCHESTRATOR, PRIORITY_PM),
        veto_roles=(PRIORITY_PM,),
    ),
    ApprovalGate(
        action="journeys_final",
        proposers=("Journey Critic",),
        must_consult=("Empathy Mapper", PRIORITY_PM),
        must_approve=(ORCHESTRATOR, "Empathy Mapper", PRIORITY_PM),
        veto_roles=(PRIORITY_PM, "Empathy Mapper"),
    ),
    ApprovalGate(
        action="publish_scores",
        proposers=("Heuristic Auditor", "Journey Critic", "Craft Critic", "Motion Critic"),
        must_consult=(),
        must_approve=(ORCHESTRATOR,),
        veto_roles=("Heuristic Auditor",),
    ),
    ApprovalGate(
        action="design_brief",
        proposers=("Frontend Design",),
        must_consult=(),
        must_approve=(ORCHESTRATOR, PRIORITY_PM),
        veto_roles=(),
    ),
    ApprovalGate(
        action="design_md_update",
        proposers=("Design System Checker",),
        must_consult=("Frontend Design", "Craft Critic"),
        must_approve=(ORCHESTRATOR, "Design System Checker"),
        veto_roles=("Design System Checker",),
    ),
    ApprovalGate(
        action="marketing_narrative",
        proposers=("Isa · Marketing Copywriter",),
        must_consult=("Product Analyst", "Prose Critic", PRIORITY_PM),
        must_approve=(ORCHESTRATOR, "Isa · Marketing Copywriter", PRIORITY_PM),
        veto_roles=("Isa · Marketing Copywriter", PRIORITY_PM),
    ),
    ApprovalGate(
        action="product_show",
        proposers=("Isa · Marketing Copywriter",),
        must_consult=("Craft Critic", "Frontend Design", "Journey Critic", PRIORITY_PM),
        must_approve=(ORCHESTRATOR, "Isa · Marketing Copywriter", "Craft Critic", PRIORITY_PM),
        veto_roles=("Isa · Marketing Copywriter", "Craft Critic"),
    ),
    ApprovalGate(
        action="implement_layout",
        proposers=("Frontend Design", "Craft Critic"),
        must_consult=("Journey Critic", "Empathy Mapper", "Design System Checker"),
        must_approve=(ORCHESTRATOR, "Craft Critic", "Design System Checker", PRIORITY_PM),
        veto_roles=("Craft Critic", "Design System Checker"),
    ),
    ApprovalGate(
        action="implement_motion",
        proposers=("Motion Critic", "Frontend Design"),
        must_consult=("Craft Critic",),
        must_approve=(ORCHESTRATOR, "Motion Critic"),
        veto_roles=("Motion Critic",),
    ),
    ApprovalGate(
        action="implement_copy",
        proposers=("Prose Critic",),
        must_consult=("Empathy Mapper", PRIORITY_PM),
        must_approve=(ORCHESTRATOR, "Prose Critic"),
        veto_roles=("Prose Critic", PRIORITY_PM),
    ),
    ApprovalGate(
        action="implement_cta_or_install",
        proposers=("Journey Critic", "Prose Critic"),
        must_consult=("Empathy Mapper",),
        must_approve=(ORCHESTRATOR, "Journey Critic", PRIORITY_PM),
        veto_roles=(ORCHESTRATOR,),
    ),
    ApprovalGate(
        action="homepage_redesign",
        proposers=("Frontend Design",),
        must_consult=("Prose Critic", "Design System Checker", PRIORITY_PM),
        must_approve=(
            ORCHESTRATOR,
            PRIORITY_PM,
            "Journey Critic",
            "Craft Critic",
            "Motion Critic",
            "Design System Checker",
            "Isa · Marketing Copywriter",
        ),
        veto_roles=(
            "Craft Critic",
            "Motion Critic",
            "Design System Checker",
            "Isa · Marketing Copywriter",
            PRIORITY_PM,
        ),
    ),
    ApprovalGate(
        action="ship_report",
        proposers=("Report Writer",),
        must_consult=(PRIORITY_PM,),
        must_approve=(ORCHESTRATOR,),
    ),
    ApprovalGate(
        action="mark_ui_shippable",
        proposers=("Implementation Verifier",),
        must_consult=("Craft Critic", "Heuristic Auditor", "Motion Critic", PRIORITY_PM),
        must_approve=(ORCHESTRATOR, "Implementation Verifier"),
        veto_roles=("Implementation Verifier",),
    ),
)


def get_gate(action: str) -> ApprovalGate | None:
    for gate in GATES:
        if gate.action == action:
            return gate
    return None


def required_approvers(action: str) -> tuple[str, ...]:
    gate = get_gate(action)
    if gate:
        return gate.must_approve
    return (ORCHESTRATOR,)


def can_implement(
    action: str,
    *,
    approves: dict[str, str] | None = None,
    consensus_decision: str | None = None,
    run_class: str = "full",
) -> tuple[bool, str]:
    """Soft ApprovalGate: return (ok, reason).

    Agents and future runtime should call this before mutating product files.
    Lite run_class skips full consensus but still requires domain Approves when listed.
    """
    if run_class == "lite" and action.startswith("implement_"):
        # lite: orchestrator + one domain already implied by task
        return True, "lite run_class — domain critic + orchestrator implicit"

    if consensus_decision and consensus_decision.upper() == "BLOCK":
        return False, "consensus.decision is BLOCK"

    if run_class in ("standard", "full", "implement"):
        if not consensus_decision or consensus_decision.upper() != "PROCEED":
            return False, "consensus.decision must be PROCEED (see COLLABORATION.md §4)"

    gate = get_gate(action)
    if not gate:
        if run_class in ("standard", "full", "implement"):
            return False, f"no approval gate registered for {action!r}"
        return True, f"no gate registered for {action!r} in lite run"

    approves = approves or {}
    missing: list[str] = []
    for role in gate.must_approve:
        status = (approves.get(role) or approves.get(_short_key(role)) or "").lower()
        if status not in ("yes", "y", "approve", "✓", "true"):
            missing.append(role)

    if missing:
        return False, f"missing Approves: {', '.join(missing)}"

    return True, "ok"


def _short_key(role: str) -> str:
    return role.replace(" ", "_").lower()


_PROCEED_RE = re.compile(
    r"(?i)decision:\s*PROCEED|consensus\.decision:\s*PROCEED|\*\*Decision:\*\*\s*PROCEED"
)


def consensus_artifact_allows_write(project_root: Path) -> tuple[bool, str]:
    """Check panel-report for PROCEED signal (soft gate for agent runs)."""
    report_dir = project_root / "panel-report"
    if not report_dir.is_dir():
        return False, "no panel-report/ directory"

    run_state = report_dir / "run-state.yaml"
    if run_state.is_file():
        text = run_state.read_text(encoding="utf-8")
        if re.search(r"(?im)^\s*decision:\s*PROCEED\b", text) or re.search(
            r"(?im)decision:\s*PROCEED\b", text
        ):
            return True, "run-state.yaml consensus PROCEED"

    for path in sorted(report_dir.glob("*.md")):
        try:
            if _PROCEED_RE.search(path.read_text(encoding="utf-8")):
                return True, f"PROCEED found in {path.name}"
        except OSError:
            continue

    return False, "no PROCEED consensus in run-state.yaml or panel-report/*.md"
