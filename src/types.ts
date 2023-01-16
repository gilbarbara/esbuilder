export interface SharedOptions {
  externals: boolean;
  noBundle: boolean;
  noSourcemap: boolean;
  outDirectory: string;
  platform: 'node' | 'browser';
  target: string;
  watch: boolean;
}

export interface Arguments extends SharedOptions {
  cjs: boolean;
  esm: boolean;
  input: string;
}

export interface BuildOptions extends SharedOptions {
  entryPoints: string[];
}
