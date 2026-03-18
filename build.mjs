// build.mjs — transpiles JSX in src/ → dist/ (no bundling, pure transformation)
// All node_modules stay external so the dist/ tree is lean.

import { build } from "esbuild";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const SRC = "src";
const OUT = "dist";

// Collect every .js file under src/
function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) results.push(...walk(full));
    else if (entry.endsWith(".js")) results.push(full);
  }
  return results;
}

const entryPoints = walk(SRC);

// We run two passes:
// 1) index.js alone — with the shebang banner
// 2) all other files — without the banner

const indexEntry = [`${SRC}/index.js`];
const otherEntries = entryPoints.filter((f) => f !== `${SRC}\\index.js` && f !== `${SRC}/index.js`);

const sharedOptions = {
  outdir: OUT,
  outbase: SRC,
  bundle: false,
  platform: "node",
  format: "esm",
  loader: { ".js": "jsx" },
  jsx: "automatic",
  target: "node18",
  packages: "external",
  minify: false,
  sourcemap: false,
};

await build({
  ...sharedOptions,
  entryPoints: indexEntry,
  banner: { js: "#!/usr/bin/env node" },
});

if (otherEntries.length > 0) {
  await build({
    ...sharedOptions,
    entryPoints: otherEntries,
  });
}

console.log(`✔  Built ${entryPoints.length} files → ${OUT}/`);
