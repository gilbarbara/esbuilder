/* eslint-disable no-console */
import * as fs from 'fs';

import { buildCJS, buildESM } from '../src/builders';
import { BuildOptions } from '../src/types';

jest.mock('chalk', () => ({
  blue: (input: string) => input,
  green: (input: string) => input,
}));

const buildOptions: BuildOptions = {
  entryPoints: ['./test/__fixtures__/index.ts'],
  externals: false,
  noBundle: false,
  noSourcemap: false,
  outDirectory: './.tmp/dist',
  platform: 'node',
  target: 'node16',
  watch: false,
};

describe('builders', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  beforeEach(() => {
    fs.rmSync('./.tmp/dist', { recursive: true, force: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildCJS', () => {
    it('should build a CommonJS module', async () => {
      expect(fs.existsSync('./.tmp/dist/index.js')).toBe(false);

      await buildCJS(buildOptions);

      expect(console.log).toHaveBeenCalledTimes(3);
      expect(console.log).toHaveBeenNthCalledWith(1, 'Building CommonJS...');
      expect(console.log).toHaveBeenNthCalledWith(3, '✓ CommonJS build complete.');

      expect(fs.existsSync('./.tmp/dist/index.js')).toBe(true);
      expect(fs.existsSync('./.tmp/dist/index.js.map')).toBe(true);
    });

    it('should build and watch a CommonJS module', async () => {
      expect(fs.existsSync('./.tmp/dist/index.js')).toBe(false);

      const builder = await buildCJS({ ...buildOptions, watch: true });

      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, 'Building CommonJS...');
      expect(console.log).toHaveBeenNthCalledWith(
        2,
        'CommonJS build complete, watching for changes...',
      );

      expect(fs.existsSync('./.tmp/dist/index.js')).toBe(true);
      expect(fs.existsSync('./.tmp/dist/index.js.map')).toBe(true);

      if (builder.stop) {
        builder.stop();
      }
    });
  });

  describe('buildESM', () => {
    it('should build a ESM module', async () => {
      expect(fs.existsSync('./.tmp/dist/index.mjs')).toBe(false);

      await buildESM(buildOptions);

      expect(console.log).toHaveBeenCalledTimes(3);
      expect(console.log).toHaveBeenNthCalledWith(1, 'Building ESM...');
      expect(console.log).toHaveBeenNthCalledWith(3, '✓ ESM build complete.');

      expect(fs.existsSync('./.tmp/dist/index.mjs')).toBe(true);
      expect(fs.existsSync('./.tmp/dist/index.mjs.map')).toBe(true);
    });

    it('should build and watch a ESM module', async () => {
      expect(fs.existsSync('./.tmp/dist/index.mjs')).toBe(false);

      const builder = await buildESM({ ...buildOptions, watch: true });

      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, 'Building ESM...');
      expect(console.log).toHaveBeenNthCalledWith(2, 'ESM build complete, watching for changes...');

      expect(fs.existsSync('./.tmp/dist/index.mjs')).toBe(true);
      expect(fs.existsSync('./.tmp/dist/index.mjs.map')).toBe(true);

      if (builder.stop) {
        builder.stop();
      }
    });
  });
});
