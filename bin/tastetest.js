#!/usr/bin/env node
/**
 * TasteTest CLI — primary entry for `npx tastetest init`
 */
import { main } from "../cli/main.js";

main(process.argv.slice(2)).catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
