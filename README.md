# @gilbarbara/esbuilder

[![NPM version](https://badge.fury.io/js/%40gilbarbara%2Fesbuilder.svg)](https://www.npmjs.com/package/%40gilbarbara%2Fesbuilder) [![Build Status](https://travis-ci.com/gilbarbara/esbuilder.svg?branch=main)](https://travis-ci.com/gilbarbara/esbuilder) [![Maintainability](https://api.codeclimate.com/v1/badges/763ecebad04e15d4c1c0/maintainability)](https://codeclimate.com/github/gilbarbara/esbuilder/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/763ecebad04e15d4c1c0/test_coverage)](https://codeclimate.com/github/gilbarbara/esbuilder/test_coverage)

Opinionated wrapper for esbuild

## Setup

```bash
npm install esbuilder
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
  --target         The target environment (default: node14)
```

## Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check [issues page](https://github.com/gilbarbara/esbuilder/issues).

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2022 [Gil Barbara <gilbarbara@gmail.com>](https://github.com/gilbarbara).  
This project is [MIT](https://github.com/gilbarbara/esbuilder/blob/main/LICENSE) licensed.
