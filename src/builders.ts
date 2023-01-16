/* eslint-disable no-console */
import * as chalk from 'chalk';
import esbuild, { BuildFailure } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

import { BuildOptions } from './types';

const types = {
  cjs: 'CommonJS',
  esm: 'ESM',
};

/* istanbul ignore next */
function onRebuild(type: 'cjs' | 'esm') {
  return (error: BuildFailure | null) => {
    if (error) {
      console.error(chalk.red(`${types[type]} build failed, see error above.`));
    } else {
      console.log(chalk.green(`${types[type]} build complete, watching for changes...`));
    }
  };
}

export async function buildCJS(options: BuildOptions) {
  const { entryPoints, externals, noBundle, noSourcemap, outDirectory, platform, target, watch } =
    options;

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
      watch: watch ? { onRebuild: onRebuild('cjs') } : undefined,
    });

    /* istanbul ignore next */
    if (cjsBuild.warnings.length > 0) {
      console.error(cjsBuild.warnings);
    }

    if (watch) {
      console.log(chalk.green(`${types.cjs} build complete, watching for changes...`));
    } else {
      const analysis = await esbuild.analyzeMetafile(cjsBuild.metafile);

      console.log(analysis);
      console.log(chalk.green(`✓ ${types.cjs} build complete.`));
    }

    return cjsBuild;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function buildESM(options: BuildOptions) {
  const { entryPoints, externals, noBundle, noSourcemap, outDirectory, platform, target, watch } =
    options;

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
      watch: watch ? { onRebuild: onRebuild('esm') } : undefined,
    });

    /* istanbul ignore next */
    if (esmBuild.warnings.length > 0) {
      console.error(esmBuild.warnings);
    }

    if (watch) {
      console.log(chalk.green(`${types.esm} build complete, watching for changes...`));
    } else {
      const analysis = await esbuild.analyzeMetafile(esmBuild.metafile);

      console.log(analysis);
      console.log(chalk.green(`✓ ${types.esm} build complete.`));
    }

    return esmBuild;
  } catch (error: any) {
    throw new Error(error);
  }
}
