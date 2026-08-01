import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export function issue(level, code, message, fix = null) {
  return { level, code, message, ...(fix ? { fix } : {}) };
}

export function summarize(issues) {
  return {
    errors: issues.filter((item) => item.level === "error").length,
    warnings: issues.filter((item) => item.level === "warning").length,
    passes: issues.filter((item) => item.level === "pass").length,
  };
}

export function printDiagnostics(title, target, issues, { json = false } = {}) {
  const summary = summarize(issues);
  if (json) {
    console.log(JSON.stringify({ title, target, summary, issues }, null, 2));
    return summary;
  }

  console.log(`\n  ${title}`);
  console.log("  ────────────────");
  console.log(`  Target: ${target}\n`);
  for (const item of issues) {
    const marker = item.level === "error" ? "✗" : item.level === "warning" ? "!" : "✓";
    console.log(`  ${marker} [${item.code}] ${item.message}`);
    if (item.fix) console.log(`    Fix: ${item.fix}`);
  }
  console.log(
    `\n  Result: ${summary.errors} errors · ${summary.warnings} warnings · ${summary.passes} passes\n`
  );
  return summary;
}

export function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

export function hashPath(targetPath) {
  const hash = createHash("sha256");
  if (statSync(targetPath).isDirectory()) {
    for (const file of walkFiles(targetPath)) {
      hash.update(path.relative(targetPath, file));
      hash.update(readFileSync(file));
    }
  } else {
    hash.update(readFileSync(targetPath));
  }
  return hash.digest("hex");
}

export function walkFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(entryPath));
    else if (entry.isFile()) files.push(entryPath);
  }
  return files;
}

export function hasAny(target, paths) {
  return paths.some((entry) => existsSync(path.join(target, entry)));
}
