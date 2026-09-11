import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "node_modules", "tslib");
const functionsRoot = join(process.cwd(), ".vercel", "output", "functions");

if (!existsSync(src)) {
  console.error("[copy-tslib] node_modules/tslib is missing");
  process.exit(1);
}

if (!existsSync(functionsRoot)) {
  console.warn("[copy-tslib] no .vercel/output/functions — skipping");
  process.exit(0);
}

function functionDirs(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.endsWith(".func")) acc.push(full);
    else functionDirs(full, acc);
  }
  return acc;
}

const dirs = functionDirs(functionsRoot);
if (dirs.length === 0) {
  console.warn("[copy-tslib] no *.func folders found");
  process.exit(0);
}

for (const funcRoot of dirs) {
  const dests = [
    join(funcRoot, "node_modules", "tslib"),
    join(funcRoot, "_libs", "node_modules", "tslib"),
  ];
  for (const dest of dests) {
    mkdirSync(join(dest, ".."), { recursive: true });
    cpSync(src, dest, { recursive: true });
    console.log("[copy-tslib] copied to", dest);
  }
}
