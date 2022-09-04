#!/usr/bin/env node
/* eslint-disable no-console,unicorn/prefer-top-level-await */

import { buildCJS, buildESM } from './builders';

interface Arguments {
  cjs: boolean;
  esm: boolean;
  externals: boolean;
  input: string;
  noBundle: boolean;
  noSourcemap: boolean;
  outDirectory: string;
  platform: 'node' | 'browser';
  target: string;
}

const flags = require('yargs')(process.argv.slice(2)).argv;

const {
  cjs = false,
  esm = false,
  externals = false,
  input = './src/index.ts',
  noBundle = false,
  noSourcemap = false,
  outDirectory = './dist',
  platform = 'node',
  target = 'node14',
} = flags as Arguments;

const entryPoints = input.split(',').map(entry => entry.trim());

/* istanbul ignore next */
(async () => {
  if (!cjs && !esm) {
    console.log(`Builds the source code into CommonJS and/or ESM modules.
    
Targets:
  --cjs            Build CommonJS module
  --esm            Build ESM module

Build Options:
  --input          Input files (default: ./src/index.ts)
  --externals      Add external packages to the bundle
  --noBundle       Skip bundling dependencies
  --noSourcemap    Skip the sourcemap
  --outDirectory   Output directory (default: ./dist)
  --platform       The platform (default: node)
  --target         The target environment (default: node14)
`);

    process.exit(0);
  }

  if (cjs) {
    await buildCJS({
      entryPoints,
      externals,
      noBundle,
      noSourcemap,
      outDirectory,
      platform,
      target,
    });
  }

  if (esm) {
    await buildESM({
      entryPoints,
      externals,
      noBundle,
      noSourcemap,
      outDirectory,
      platform,
      target,
    });
  }
})();
