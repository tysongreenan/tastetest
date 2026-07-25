#!/usr/bin/env node
/**
 * Panel CLI — primary entry for `npx @tysongreenan/panel init`
 */
import { main } from "../cli/main.js";

main(process.argv.slice(2)).catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
