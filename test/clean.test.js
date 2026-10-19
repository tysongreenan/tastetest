import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { cleanProject } from "../cli/clean.js";
import { HarnessRuntime } from "../cli/harness.js";
import { initProject } from "../cli/init.js";

test("blocking a run deletes its scratch shots but keeps panel-report evidence", async (t) => {
  const target = await temporaryProject(t, "panel-clean-block-");
  const runtime = HarnessRuntime.start({ projectRoot: target, runId: "blocked", runClass: "lite" });
  writeFile(target, ".panel/shots/blocked/home-d.png", "x".repeat(100));
  writeFile(target, ".panel/shots/blocked/profile/Default/cache", "y");
  writeFile(target, "panel-report/verification-desktop.png", "evidence");

  runtime.block("browser unavailable");

  assert.equal(existsSync(path.join(target, ".panel", "shots", "blocked")), false);
  assert.equal(existsSync(path.join(target, "panel-report", "verification-desktop.png")), true);
  assert.equal(runtime.status().status, "blocked");
});

test("clean removes finished runs, keeps the active run, and honors dry-run", async (t) => {
  const target = await temporaryProject(t, "panel-clean-project-");
  HarnessRuntime.start({ projectRoot: target, runId: "live", runClass: "lite" });
  writeFile(target, ".panel/shots/live/before.png", "keep");
  writeFile(target, ".panel/shots/old-run/a.png", "x".repeat(2048));
  writeFile(target, ".panel/shots/manual/b.png", "x");
  writeFile(target, "panel-report/desktop.png", "evidence");

  const dry = cleanProject({ dir: target, dryRun: true, json: true });
  assert.equal(dry.removed.length, 2);
  assert.equal(existsSync(path.join(target, ".panel", "shots", "old-run")), true);

  const result = cleanProject({ dir: target, json: true });
  assert.equal(result.freedBytes, 2049);
  assert.deepEqual(result.kept.map((k) => k.path), [path.join(".panel", "shots", "live")]);
  assert.equal(existsSync(path.join(target, ".panel", "shots", "old-run")), false);
  assert.equal(existsSync(path.join(target, ".panel", "shots", "manual")), false);
  assert.equal(existsSync(path.join(target, ".panel", "shots", "live", "before.png")), true);
  assert.equal(existsSync(path.join(target, "panel-report", "desktop.png")), true);

  cleanProject({ dir: target, all: true, json: true });
  assert.equal(existsSync(path.join(target, ".panel", "shots", "live")), false);
});

test("clean refuses to follow a symlinked .panel/shots folder", async (t) => {
  const target = await temporaryProject(t, "panel-clean-symlink-");
  const outside = await temporaryProject(t, "panel-clean-outside-");
  writeFile(outside, "precious/data.txt", "keep me");
  mkdirSync(path.join(target, ".panel"), { recursive: true });
  symlinkSync(outside, path.join(target, ".panel", "shots"));

  const result = cleanProject({ dir: target, all: true, json: true });
  assert.equal(result.removed.length, 0);
  assert.equal(existsSync(path.join(outside, "precious", "data.txt")), true);
});

test("upgrade adds shots/ to an existing .panel/.gitignore", async (t) => {
  const target = await temporaryProject(t, "panel-clean-gitignore-");
  writeFile(target, ".panel/.gitignore", "backups/\ncustom/");
  await initProject({ dir: target, upgrade: true, packageVersion: "0.0.0", cursor: false, claude: false });
  assert.equal(readFileSync(path.join(target, ".panel", ".gitignore"), "utf8"), "backups/\ncustom/\nshots/\n");
});

async function temporaryProject(t, prefix) {
  const target = await mkdtemp(path.join(os.tmpdir(), prefix));
  t.after(() => rm(target, { recursive: true, force: true }));
  return target;
}

function writeFile(target, relative, contents) {
  const destination = path.join(target, relative);
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, contents, "utf8");
}
