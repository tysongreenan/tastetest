"""CLI entrypoint: `python -m empathflow` or future `tastetest` command."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from empathflow.config import EmpathFlowConfig
from empathflow.crew import run

# Package lives at <repo>/empathflow; skill files live at <repo>/
_REPO_ROOT = Path(__file__).resolve().parent.parent


def _init_project(target: Path) -> int:
    """Copy EMPATHFLOW.md + playbook.md into the target project (skill-first install)."""
    target = target.resolve()
    target.mkdir(parents=True, exist_ok=True)

    files = {
        "EMPATHFLOW.md": _REPO_ROOT / "EMPATHFLOW.md",
        "playbook.md": _REPO_ROOT / "playbook.md",
        "ANTI-SLOP.md": _REPO_ROOT / "ANTI-SLOP.md",
        "MOTION.md": _REPO_ROOT / "MOTION.md",
        "FRONTEND.md": _REPO_ROOT / "FRONTEND.md",
        "AGENTS.md": _REPO_ROOT / "AGENTS.md",
        "COLLABORATION.md": _REPO_ROOT / "COLLABORATION.md",
    }
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
    print("TasteTest skill entries installed (see AGENTS.md for full roster).")
    print()
    print("For full onboarding (Cursor/Claude wiring + skill packs), prefer:")
    print("  npx tastetest init")
    print()
    print("Then in your AI agent:  Run EmpathFlow")
    print("Cursor: /tastetest")
    if not written:
        print("(No new files written — delete existing copies to refresh.)")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="tastetest",
        description="TasteTest / EmpathFlow — buyer-level UX review for your codebase.",
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
        default=Path("tastetest-report"),
        help="Output directory for the report",
    )
    parser.add_argument(
        "--browser",
        choices=["playwright", "browserbase"],
        default="playwright",
        help="Browser backend (default: playwright)",
    )
    parser.add_argument("--headed", action="store_true", help="Run browser headed")

    args = parser.parse_args(argv)

    if args.command == "init":
        return _init_project(args.project)

    config = EmpathFlowConfig(
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
