export const APPROVAL_GATES = Object.freeze({
  marketing_narrative: ["Orchestrator Manager", "Isa · Marketing Copywriter", "Persona Manager"],
  product_show: ["Orchestrator Manager", "Isa · Marketing Copywriter", "Craft Critic", "Persona Manager"],
  implement_layout: ["Orchestrator Manager", "Craft Critic", "Design System Checker", "Persona Manager"],
  implement_motion: ["Orchestrator Manager", "Motion Critic"],
  implement_copy: ["Orchestrator Manager", "Prose Critic", "Persona Manager"],
  implement_cta_or_install: ["Orchestrator Manager", "Journey Critic", "Persona Manager"],
  remove_feature_or_section: ["Orchestrator Manager", "Journey Critic", "Empathy Mapper", "Persona Manager"],
  design_md_update: ["Orchestrator Manager", "Design System Checker"],
  homepage_redesign: [
    "Orchestrator Manager",
    "Persona Manager",
    "Journey Critic",
    "Craft Critic",
    "Motion Critic",
    "Design System Checker",
    "Isa · Marketing Copywriter",
  ],
  mark_ui_shippable: ["Orchestrator Manager", "Implementation Verifier"],
});

export function missingApprovers(action, approvals) {
  const required = APPROVAL_GATES[action];
  if (!required) return { unknown: true, missing: [] };
  const approved = new Set(approvals.filter((entry) => entry.status === "yes").map((entry) => entry.role));
  const missing = required.filter((role) => {
    if (role === "Persona Manager") {
      return ![...approved].some((candidate) => candidate === role || candidate.startsWith("PM-"));
    }
    return !approved.has(role);
  });
  return { unknown: false, missing };
}
