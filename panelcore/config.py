"""Configuration for Panel runs.

TODO: load from env / CLI / project-local config (base URL, personas, browser backend).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Literal


BrowserBackend = Literal["playwright", "browserbase"]


@dataclass
class PanelConfig:
    """Runtime settings for a Panel review."""

    project_root: Path = field(default_factory=Path.cwd)
    base_url: str | None = None
    browser_backend: BrowserBackend = "playwright"
    headless: bool = True
    output_dir: Path = field(default_factory=lambda: Path("panel-report"))
    playbook_path: Path | None = None
    design_md_path: Path | None = None

    def resolve_playbook(self) -> Path:
        if self.playbook_path:
            return self.playbook_path
        candidate = self.project_root / "playbook.md"
        if candidate.exists():
            return candidate
        # When installed as a package, fall back to bundled playbook if present.
        return Path(__file__).resolve().parent.parent / "playbook.md"
