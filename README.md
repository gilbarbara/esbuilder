# @gilbarbara/esbuilder

[![npm version](https://badge.fury.io/js/@gilbarbara%2Fesbuilder.svg)](https://badge.fury.io/js/@gilbarbara%2Fesbuilder) [![CI](https://github.com/gilbarbara/esbuilder/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/esbuilder/actions/workflows/main.yml) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_esbuilder&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=gilbarbara_esbuilder) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_esbuilder&metric=coverage)](https://sonarcloud.io/summary/new_code?id=gilbarbara_esbuilder)

Opinionated wrapper for esbuild

## Setup

```bash
npm install @gilbarbara/esbuilder
```

## Usage

```bash
esbuilder --cjs --esm
```

## Options

```bash
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
  --target         The target environment (default: node16)
  --watch          Watch for changes (default: false)
```

## Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check [issues page](https://github.com/gilbarbara/esbuilder/issues).

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2022 [Gil Barbara](https://github.com/gilbarbara).  
This project is [MIT](https://github.com/gilbarbara/esbuilder/blob/main/LICENSE) licensed.
