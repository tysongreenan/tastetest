import { initProject } from "./init.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const HELP = `
TasteTest — the UX review that lives in your repo

Usage:
  npx @tysongreenan/tastetest init [options]
  npx @tysongreenan/tastetest --help

Commands:
  init     Onboard TasteTest into a project (default)
  run      Placeholder — use your AI agent after init

Init options:
  --dir <path>     Project root (default: current directory)
  --full           Also copy FRONTEND.md + skills/ (ui-ux-pro-max, motion, prose)
  --lite           Alias for default lean install (no packs)
  --force          Overwrite existing skill files
  --no-cursor      Skip Cursor rules/commands
  --no-claude      Skip Claude Code skill registration
  --dry-run        Print actions without writing

Default install is lean (locked structure):
  EMPATHFLOW.md · playbook.md · ANTI-SLOP.md · MOTION.md + Cursor/Claude wiring

After init, open your AI coding agent and say:

  Run EmpathFlow

Cursor: /tastetest
`.trim();

/**
 * @param {string[]} argv
 */
export async function main(argv) {
  const args = parseArgs(argv);

  if (args.help) {
    console.log(HELP);
    return;
  }

  if (args.version) {
    console.log(version);
    return;
  }

  const command = args.command || "init";

  if (command === "init") {
    const result = await initProject({
      dir: args.dir,
      full: args.full,
      lite: args.lite,
      force: args.force,
      cursor: args.cursor,
      claude: args.claude,
      dryRun: args.dryRun,
    });
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command === "run") {
    console.log(
      [
        "Automated multi-agent `run` is still in progress.",
        "After init, use your coding agent:",
        "",
        "  Run EmpathFlow",
        "  Do a TasteTest review",
        "",
        "Cursor: /tastetest",
      ].join("\n")
    );
    return;
  }

  if (command === "help") {
    console.log(HELP);
    return;
  }

  console.error(`Unknown command: ${command}\n`);
  console.log(HELP);
  process.exitCode = 1;
}

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {Record<string, any>} */
  const out = {
    command: undefined,
    dir: process.cwd(),
    full: false,
    lite: false,
    force: false,
    cursor: true,
    claude: true,
    dryRun: false,
    help: false,
    version: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") out.help = true;
    else if (a === "-v" || a === "--version") out.version = true;
    else if (a === "--full") out.full = true;
    else if (a === "--lite") out.lite = true;
    else if (a === "--force") out.force = true;
    else if (a === "--no-cursor") out.cursor = false;
    else if (a === "--no-claude") out.claude = false;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--dir" || a === "--project") {
      out.dir = argv[++i];
    } else if (!a.startsWith("-") && !out.command) {
      out.command = a;
    } else {
      console.warn(`Ignoring unknown arg: ${a}`);
    }
  }

  return out;
}
