import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "node_modules", "tslib");
const funcRoot = join(process.cwd(), ".vercel", "output", "functions", "__server.func");
const dests = [
  join(funcRoot, "node_modules", "tslib"),
  join(funcRoot, "_libs", "node_modules", "tslib"),
];

if (!existsSync(src)) {
  console.error("[copy-tslib] node_modules/tslib is missing");
  process.exit(1);
}

if (!existsSync(funcRoot)) {
  console.error("[copy-tslib] serverless function output not found:", funcRoot);
  process.exit(1);
}

for (const dest of dests) {
  mkdirSync(join(dest, ".."), { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log("[copy-tslib] copied to", dest);
}
