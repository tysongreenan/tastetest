"""Playwright browser backend for live journey testing.

Default browser backend for TasteTest. Browserbase is the higher-quality optional path.

TODO:
- launch/close browser
- navigate journeys
- capture screenshots
- optional per-persona storage state / login
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass
class BrowserSession:
    """Placeholder for an active browser session."""

    base_url: str
    headless: bool = True
    screenshots_dir: Path | None = None

    def start(self) -> None:
        raise NotImplementedError("Playwright session start not implemented yet.")

    def stop(self) -> None:
        raise NotImplementedError("Playwright session stop not implemented yet.")

    def goto(self, path: str) -> None:
        raise NotImplementedError("Navigation not implemented yet.")

    def screenshot(self, name: str) -> Path:
        raise NotImplementedError("Screenshot capture not implemented yet.")
