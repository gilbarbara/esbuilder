/* eslint-disable no-console */
import * as fs from 'fs';

import { buildCJS, buildESM } from '../src/builders';

jest.mock('chalk', () => ({
  blue: (input: string) => input,
  green: (input: string) => input,
}));

describe('builders', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    fs.rmSync('./.tmp/dist', { recursive: true, force: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildCJS', () => {
    it('should build a CommonJS module', async () => {
      expect(fs.existsSync('./.tmp/dist/index.js')).toBe(false);

      await buildCJS({
        entryPoints: ['./test/__fixtures__/index.ts'],
        externals: false,
        noBundle: false,
        noSourcemap: false,
        outDirectory: './.tmp/dist',
        platform: 'node',
        target: 'node14',
      });

      expect(console.log).toHaveBeenCalledTimes(3);
      expect(console.log).toHaveBeenNthCalledWith(1, 'Building CommonJS...');
      expect(console.log).toHaveBeenNthCalledWith(3, '✓ CommonJS build complete.');

      expect(fs.existsSync('./.tmp/dist/index.js')).toBe(true);
      expect(fs.existsSync('./.tmp/dist/index.js.map')).toBe(true);
    });
  });

  describe('buildESM', () => {
    it('should build a ESM module', async () => {
      expect(fs.existsSync('./.tmp/dist/index.mjs')).toBe(false);

      await buildESM({
        entryPoints: ['./test/__fixtures__/index.ts'],
        externals: false,
        noBundle: false,
        noSourcemap: false,
        outDirectory: './.tmp/dist',
        platform: 'node',
        target: 'node14',
      });

      expect(console.log).toHaveBeenCalledTimes(3);
      expect(console.log).toHaveBeenNthCalledWith(1, 'Building ESM...');
      expect(console.log).toHaveBeenNthCalledWith(3, '✓ ESM build complete.');

      expect(fs.existsSync('./.tmp/dist/index.mjs')).toBe(true);
      expect(fs.existsSync('./.tmp/dist/index.mjs.map')).toBe(true);
    });
  });
});
