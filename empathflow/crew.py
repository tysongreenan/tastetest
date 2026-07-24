"""EmpathFlow crew orchestration entrypoint.

V1: seeds shared run-state and writes a stub report.
Full hierarchical multi-agent runtime still TODO — gates live in permissions.py
and collaboration law in COLLABORATION.md / AGENTS.md.
"""

from __future__ import annotations

import shutil
from pathlib import Path

from empathflow.config import EmpathFlowConfig
from empathflow.tasks import TASKS

# Repo root when installed as package path; fall back relative to this file
_PACKAGE_ROOT = Path(__file__).resolve().parent.parent
_RUN_STATE_TEMPLATE = _PACKAGE_ROOT / "docs" / "run-state.template.yaml"


def seed_run_state(output_dir: Path, *, force: bool = False) -> Path | None:
    """Copy run-state template into the report dir if missing."""
    output_dir.mkdir(parents=True, exist_ok=True)
    dest = output_dir / "run-state.yaml"
    if dest.exists() and not force:
        return dest
    if not _RUN_STATE_TEMPLATE.is_file():
        # Minimal inline seed if package docs missing
        dest.write_text(
            "preflight: lite\nprotocol: short\nrun_class: standard\n"
            "preserve: []\napproves: {}\nconsensus:\n  decision: null\n  revise_round: 0\n",
            encoding="utf-8",
        )
        return dest
    shutil.copyfile(_RUN_STATE_TEMPLATE, dest)
    return dest


def run(config: EmpathFlowConfig | None = None) -> Path:
    """Run a TasteTest review and return the path to the report file.

    Stub for V1: seeds run-state, validates config, documents planned pipeline.
    """
    config = config or EmpathFlowConfig()
    config.output_dir.mkdir(parents=True, exist_ok=True)
    run_state_path = seed_run_state(config.output_dir)
    report_path = config.output_dir / "report.md"

    stages = "\n".join(f"- {t.name}: {t.description[:80]}..." for t in TASKS)
    rs_note = (
        f"`{run_state_path}`"
        if run_state_path
        else "_run-state not seeded_"
    )
    report_path.write_text(
        "# TasteTest Report (stub)\n\n"
        "EmpathFlow crew is not fully wired yet. Use agent skills for real reviews.\n\n"
        f"**Project:** `{config.project_root}`\n"
        f"**Base URL:** {config.base_url or '_not set_'}\n"
        f"**Browser:** {config.browser_backend}\n"
        f"**Playbook:** `{config.resolve_playbook()}`\n"
        f"**Run-state:** {rs_note}\n\n"
        "## Planned pipeline\n\n"
        f"{stages}\n\n"
        "## Soft ApprovalGate\n\n"
        "Before implementing, agents must set `consensus.decision: PROCEED` in run-state "
        "and meet Approves from `empathflow/permissions.py` / `COLLABORATION.md`.\n\n"
        "Until the Python crew is complete, use `EMPATHFLOW.md` with Cursor / Claude Code:\n\n"
        "> Run EmpathFlow\n",
        encoding="utf-8",
    )
    return report_path


if __name__ == "__main__":
    path = run()
    print(f"Wrote {path}")
