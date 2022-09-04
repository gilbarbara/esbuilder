/* eslint-disable no-console */
import * as chalk from 'chalk';
import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

interface BuildOptions {
  entryPoints: string[];
  externals: boolean;
  noBundle: boolean;
  noSourcemap: boolean;
  outDirectory: string;
  platform: 'node' | 'browser';
  target: string;
}

export async function buildCJS(options: BuildOptions) {
  const { entryPoints, externals, noBundle, noSourcemap, outDirectory, platform, target } = options;

  console.log(chalk.blue('Building CommonJS...'));

  try {
    const cjsBuild = await esbuild.build({
      bundle: !noBundle,
      entryPoints,
      format: 'cjs',
      metafile: true,
      outdir: outDirectory,
      platform,
      plugins: externals ? [] : [nodeExternalsPlugin()],
      sourcemap: !noSourcemap,
      target,
    });

    /* istanbul ignore next */
    if (cjsBuild.warnings.length > 0) {
      console.error(cjsBuild.warnings);
    }

    const analysis = await esbuild.analyzeMetafile(cjsBuild.metafile);

    console.log(analysis);
    console.log(chalk.green('✓ CommonJS build complete.'));
  } catch (error) /* istanbul ignore next */ {
    console.error(error);
    process.exit(1);
  }
}

export async function buildESM(options: BuildOptions) {
  const { entryPoints, externals, noBundle, noSourcemap, outDirectory, platform, target } = options;

  console.log(chalk.blue('Building ESM...'));

  try {
    const esmBuild = await esbuild.build({
      bundle: !noBundle,
      entryPoints,
      format: 'esm',
      metafile: true,
      outdir: outDirectory,
      outExtension: { '.js': '.mjs' },
      platform,
      plugins: externals ? [] : [nodeExternalsPlugin()],
      sourcemap: !noSourcemap,
      target,
    });

    /* istanbul ignore next */
    if (esmBuild.warnings.length > 0) {
      console.error(esmBuild.warnings);
    }

    const analysis = await esbuild.analyzeMetafile(esmBuild.metafile);

    console.log(analysis);
    console.log(chalk.green('✓ ESM build complete.'));
  } catch (error) /* istanbul ignore next */ {
    console.error(error);
    process.exit(1);
  }
}
