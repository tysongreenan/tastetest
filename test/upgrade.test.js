import assert from "node:assert/strict";
import { appendFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { initProject } from "../cli/init.js";

const packageVersion = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
).version;

test("upgrade backs up local changes and installs the complete current protocol", async (t) => {
  const target = await mkdtemp(path.join(os.tmpdir(), "panel-upgrade-test-"));
  t.after(() => rm(target, { recursive: true, force: true }));

  await initProject({
    dir: target,
    packageVersion,
    cursor: false,
    claude: false,
  });
  appendFileSync(path.join(target, "PANEL.md"), "\nLOCAL CUSTOM RULE\n");

  await initProject({
    dir: target,
    upgrade: true,
    packageVersion,
    cursor: false,
    claude: false,
  });

  const manifest = JSON.parse(
    readFileSync(path.join(target, ".panel", "manifest.json"), "utf8")
  );
  assert.equal(manifest.version, packageVersion);
  assert.equal(manifest.mode, "lean");
  assert.equal(readFileSync(path.join(target, ".panel", ".gitignore"), "utf8"), "backups/\n");

  for (const file of [
    "docs/design-calibration.md",
    "docs/hypotheses.template.md",
    "docs/learning.template.md",
    "docs/verification.template.md",
  ]) {
    assert.equal(existsSync(path.join(target, file)), true, file);
  }

  const backupRuns = readdirSync(path.join(target, ".panel", "backups"));
  assert.equal(backupRuns.length, 1);
  const backedUpPanel = readFileSync(
    path.join(target, ".panel", "backups", backupRuns[0], "PANEL.md"),
    "utf8"
  );
  assert.match(backedUpPanel, /LOCAL CUSTOM RULE/);
  assert.doesNotMatch(readFileSync(path.join(target, "PANEL.md"), "utf8"), /LOCAL CUSTOM RULE/);

  await initProject({
    dir: target,
    upgrade: true,
    full: true,
    packageVersion,
    cursor: false,
    claude: false,
  });

  const fullManifest = JSON.parse(
    readFileSync(path.join(target, ".panel", "manifest.json"), "utf8")
  );
  assert.equal(fullManifest.mode, "full");
  for (const file of [
    "PANEL.full.md",
    "FRONTEND.md",
    "DESIGN.md",
    "DESIGN-SYSTEM.md",
    "skills/design-md",
  ]) {
    assert.equal(existsSync(path.join(target, file)), true, file);
  }
});

test("installer registers the full harness slash command for Cursor and Claude Code", async (t) => {
  const target = await mkdtemp(path.join(os.tmpdir(), "panel-command-test-"));
  t.after(() => rm(target, { recursive: true, force: true }));

  await initProject({ dir: target, full: true, packageVersion });

  for (const file of [
    ".cursor/commands/panel-full.md",
    ".claude/commands/panel-full.md",
  ]) {
    const content = readFileSync(path.join(target, file), "utf8");
    assert.match(content, /full Panel review/);
    assert.match(content, /Do \*\*not\*\* modify product code until consensus/);
  }
});
