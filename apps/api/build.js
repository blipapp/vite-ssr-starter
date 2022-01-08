#!/usr/bin/env node
const { build } = require("estrella");
const { nodeExternalsPlugin } = require('esbuild-node-externals');

build({
  entry: "src/index.ts",
  outfile: "dist/index.js",
  bundle: true,
  platform: 'node',
	plugins: [nodeExternalsPlugin()]
});
