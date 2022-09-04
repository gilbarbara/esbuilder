import { spawnSync } from 'child_process';

describe('cli', () => {
  beforeAll(() => {
    spawnSync('npm', ['run', 'build']);
  });

  it('should show the help', () => {
    const { stdout } = spawnSync('ts-node', ['./src/index.ts']);

    expect(stdout.toString()).toMatchSnapshot();
  });

  it('should run the CommonJS build', () => {
    const { stdout } = spawnSync(
      'ts-node',
      [
        './src/index.ts',
        '--cjs',
        '--input=./test/__fixtures__/index.ts',
        '--outDirectory=./.tmp/dist',
      ],
      // @ts-ignore
      { env: { ...process.env, FORCE_COLOR: 0 } },
    );

    expect(stdout.toString()).toMatchSnapshot();
  });

  it('should run the ESM build', () => {
    const { stdout } = spawnSync(
      'ts-node',
      [
        './src/index.ts',
        '--esm',
        '--input=./test/__fixtures__/index.ts',
        '--outDirectory=./.tmp/dist',
      ],

      // @ts-ignore
      { env: { ...process.env, FORCE_COLOR: 0 } },
    );

    expect(stdout.toString()).toMatchSnapshot();
  });
});
