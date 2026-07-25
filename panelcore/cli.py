"""CLI entrypoint: `python -m panelcore` or future `panel` command."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from panelcore.config import PanelConfig
from panelcore.crew import run

# Package lives at <repo>/panelcore; skill files live at <repo>/
_REPO_ROOT = Path(__file__).resolve().parent.parent


_LEAN_SKILLS = (
    "PANEL.md",
    "playbook.md",
    "ANTI-SLOP.md",
    "MOTION.md",
)
# Locked structure: --full adds design-system entry only (packs via npx init --full)
_FULL_EXTRA = ("FRONTEND.md",)


def _init_project(target: Path, *, full: bool = False) -> int:
    """Copy thin skill files (lean default; --full adds FRONTEND.md)."""
    target = target.resolve()
    target.mkdir(parents=True, exist_ok=True)

    names = list(_LEAN_SKILLS) + (list(_FULL_EXTRA) if full else [])
    files = {name: _REPO_ROOT / name for name in names}
    missing = [name for name, src in files.items() if not src.is_file()]
    if missing:
        print(f"error: packaged skill files missing: {', '.join(missing)}")
        print(f"looked under {_REPO_ROOT}")
        return 1

    written: list[str] = []
    for name, src in files.items():
        dest = target / name
        if dest.exists():
            print(f"skip (exists): {dest}")
            continue
        shutil.copy2(src, dest)
        written.append(str(dest))
        print(f"wrote {dest}")

    print()
    mode = "full" if full else "lean"
    print(f"Panel skill entries installed ({mode}).")
    print()
    print("For Cursor/Claude wiring + deep packs, prefer:")
    print("  npx panel init" + (" --full" if full else ""))
    if not full:
        print("  npx panel init --full   # FRONTEND + skills/ packs")
    print()
    print("Then in your AI agent:  Run a panel")
    print("Cursor: /panel")
    if not written:
        print("(No new files written — delete existing copies to refresh.)")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="panel",
        description="Panel — buyer-level UX review for your codebase.",
    )
    parser.add_argument(
        "command",
        nargs="?",
        default="run",
        choices=["run", "init"],
        help="run a review (default) or init skill files into a project",
    )
    parser.add_argument("--url", dest="base_url", help="Base URL for live browser testing")
    parser.add_argument(
        "--project",
        type=Path,
        default=Path.cwd(),
        help="Project root to review or init into (default: cwd)",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path("panel-report"),
        help="Output directory for the report",
    )
    parser.add_argument(
        "--browser",
        choices=["playwright", "browserbase"],
        default="playwright",
        help="Browser backend (default: playwright)",
    )
    parser.add_argument("--headed", action="store_true", help="Run browser headed")
    parser.add_argument(
        "--full",
        action="store_true",
        help="With init: also copy FRONTEND.md (use npx for skill packs)",
    )

    args = parser.parse_args(argv)

    if args.command == "init":
        return _init_project(args.project, full=args.full)

    config = PanelConfig(
        project_root=args.project.resolve(),
        base_url=args.base_url,
        browser_backend=args.browser,
        headless=not args.headed,
        output_dir=args.out,
    )
    report = run(config)
    print(f"Report written to {report}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
