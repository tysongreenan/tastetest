"""EmpathFlow crew orchestration entrypoint.

TODO: wire Manager + specialists into a hierarchical multi-agent run.
"""

from __future__ import annotations

from pathlib import Path

from empathflow.config import EmpathFlowConfig
from empathflow.tasks import TASKS


def run(config: EmpathFlowConfig | None = None) -> Path:
    """Run a TasteTest review and return the path to the report file.

    Stub for V1: validates config and documents the planned pipeline.
    """
    config = config or EmpathFlowConfig()
    config.output_dir.mkdir(parents=True, exist_ok=True)
    report_path = config.output_dir / "report.md"

    stages = "\n".join(f"- {t.name}: {t.description[:80]}..." for t in TASKS)
    report_path.write_text(
        "# TasteTest Report (stub)\n\n"
        "EmpathFlow crew is not fully wired yet.\n\n"
        f"**Project:** `{config.project_root}`\n"
        f"**Base URL:** {config.base_url or '_not set_'}\n"
        f"**Browser:** {config.browser_backend}\n"
        f"**Playbook:** `{config.resolve_playbook()}`\n\n"
        "## Planned pipeline\n\n"
        f"{stages}\n\n"
        "Until the Python crew is complete, use `EMPATHFLOW.md` with Cursor / Claude Code:\n\n"
        "> Run EmpathFlow\n",
        encoding="utf-8",
    )
    return report_path


if __name__ == "__main__":
    path = run()
    print(f"Wrote {path}")
