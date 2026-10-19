import { existsSync, lstatSync, readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";

// Scratch screenshots and browser profiles live here, one folder per run.
// Evidence a report cites belongs in panel-report/ and is never touched.
export const SHOTS_DIR = path.join(".panel", "shots");

/** Delete one run's scratch folder. Returns bytes freed. */
export function cleanRunShots(projectRoot, runId) {
  const dir = path.join(path.resolve(projectRoot), SHOTS_DIR, runId);
  if (!existsSync(dir)) return 0;
  const bytes = dirSize(dir);
  rmSync(dir, { recursive: true, force: true });
  return bytes;
}

/**
 * Delete every run's scratch folder under .panel/shots/, skipping the active run
 * unless `all` is set (its before-state shots may still be needed).
 */
export function cleanProject({ dir, dryRun = false, all = false, json = false }) {
  const root = path.resolve(dir || process.cwd());
  const shotsRoot = path.join(root, SHOTS_DIR);
  const activeRun = all ? null : activeRunId(root);
  const removed = [];
  const kept = [];

  if (existsSync(shotsRoot)) {
    for (const name of readdirSync(shotsRoot)) {
      const entry = path.join(shotsRoot, name);
      if (name === activeRun) {
        kept.push({ path: path.relative(root, entry), reason: "active run" });
        continue;
      }
      const bytes = dirSize(entry);
      if (!dryRun) rmSync(entry, { recursive: true, force: true });
      removed.push({ path: path.relative(root, entry), bytes });
    }
  }

  const freed = removed.reduce((sum, r) => sum + r.bytes, 0);
  if (json) {
    console.log(JSON.stringify({ ok: true, dryRun, freedBytes: freed, removed, kept }, null, 2));
  } else {
    const verb = dryRun ? "Would remove" : "Removed";
    for (const r of removed) console.log(`  ${verb} ${r.path} (${formatBytes(r.bytes)})`);
    for (const k of kept) console.log(`  Kept ${k.path} (${k.reason}; use --all to remove)`);
    console.log(removed.length
      ? `${dryRun ? "Would free" : "Freed"} ${formatBytes(freed)}.`
      : "Nothing to clean.");
  }
  return { ok: true, freedBytes: freed, removed, kept };
}

function activeRunId(root) {
  try {
    const { runId } = JSON.parse(readFileSync(path.join(root, ".panel", "current-run.json"), "utf8"));
    const state = JSON.parse(readFileSync(path.join(root, ".panel", "runs", runId, "state.json"), "utf8"));
    return state.status === "active" ? runId : null;
  } catch {
    return null;
  }
}

function dirSize(target) {
  const stat = lstatSync(target);
  if (!stat.isDirectory()) return stat.size;
  let total = 0;
  for (const name of readdirSync(target)) total += dirSize(path.join(target, name));
  return total;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) { value /= 1024; i++; }
  return `${value.toFixed(1)} ${units[i]}`;
}
