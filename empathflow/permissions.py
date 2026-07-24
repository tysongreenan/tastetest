"""Permission matrix for EmpathFlow crew — mirror of COLLABORATION.md.

Used by future multi-agent runtime; skills remain source of truth for agents.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ApprovalGate:
    """Who must Approve before an action executes."""

    action: str
    proposers: tuple[str, ...]
    must_consult: tuple[str, ...]
    must_approve: tuple[str, ...]
    veto_roles: tuple[str, ...] = ()


# Role name strings match AgentSpec.role short keys used in docs
GATES: tuple[ApprovalGate, ...] = (
    ApprovalGate(
        action="preflight_go",
        proposers=("Orchestrator Manager",),
        must_consult=("Product Analyst", "Persona Manager"),
        must_approve=("Orchestrator Manager",),
    ),
    ApprovalGate(
        action="personas_final",
        proposers=("Empathy Mapper",),
        must_consult=("Product Analyst", "Journey Critic", "Persona Manager"),
        must_approve=("Orchestrator Manager",),
        veto_roles=("Empathy Mapper",),
    ),
    ApprovalGate(
        action="persona_priority",
        proposers=("Persona Manager",),
        must_consult=("Empathy Mapper", "Journey Critic"),
        must_approve=("Orchestrator Manager", "Persona Manager"),
        veto_roles=("Persona Manager",),
    ),
    ApprovalGate(
        action="journeys_final",
        proposers=("Journey Critic",),
        must_consult=("Empathy Mapper", "Persona Manager"),
        must_approve=("Orchestrator Manager", "Empathy Mapper", "Persona Manager"),
        veto_roles=("Persona Manager", "Empathy Mapper"),
    ),
    ApprovalGate(
        action="publish_scores",
        proposers=("Heuristic Auditor", "Journey Critic", "Craft Critic", "Motion Critic"),
        must_consult=(),
        must_approve=("Manager",),
        veto_roles=("Heuristic Auditor",),
    ),
    ApprovalGate(
        action="implement_layout",
        proposers=("Frontend Design", "Craft Critic"),
        must_consult=("Journey Critic", "Empathy Mapper"),
        must_approve=("Manager", "Craft Critic"),
        veto_roles=("Craft Critic",),
    ),
    ApprovalGate(
        action="implement_motion",
        proposers=("Motion Critic", "Frontend Design"),
        must_consult=("Craft Critic",),
        must_approve=("Manager", "Motion Critic"),
        veto_roles=("Motion Critic",),
    ),
    ApprovalGate(
        action="implement_copy",
        proposers=("Prose Critic",),
        must_consult=("Empathy Mapper",),
        must_approve=("Manager", "Prose Critic"),
        veto_roles=("Prose Critic",),
    ),
    ApprovalGate(
        action="implement_cta_or_install",
        proposers=("Journey Critic", "Prose Critic"),
        must_consult=("Empathy Mapper",),
        must_approve=("Manager", "Journey Critic"),
        veto_roles=("Manager",),
    ),
    ApprovalGate(
        action="design_brief",
        proposers=("Frontend Design",),
        must_consult=(),
        must_approve=("Orchestrator Manager", "Persona Manager"),
        veto_roles=(),
    ),
    ApprovalGate(
        action="homepage_redesign",
        proposers=("Frontend Design",),
        must_consult=("Prose Critic", "Design System Checker", "Persona Manager"),
        must_approve=(
            "Orchestrator Manager",
            "Persona Manager",
            "Journey Critic",
            "Craft Critic",
            "Motion Critic",
        ),
        veto_roles=("Craft Critic", "Motion Critic", "Persona Manager"),
    ),
    ApprovalGate(
        action="ship_report",
        proposers=("Report Writer",),
        must_consult=("Persona Manager",),
        must_approve=("Orchestrator Manager",),
    ),
)


def required_approvers(action: str) -> tuple[str, ...]:
    for gate in GATES:
        if gate.action == action:
            return gate.must_approve
    return ("Orchestrator Manager",)
