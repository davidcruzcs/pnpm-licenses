# pnpm-licenses

This is a CLI tool for generating lists of licenses for all dependencies of a project using [pnpm](https://pnpm.io).

# Usage

Either install `pnpm-licenses` globally or use `npx @quantco/pnpm-licenses` to run it.

```
usage: pnpm-licenses [command] [options]

commands:
  list [options]                 List all dependencies and their licenses

    --prod, -p                   Only consider production dependencies
    --resolve-licenses           Resolve actual license files and texts for dependencies
                                 (as compared to just the license identifier)
    --json-input                 Read input from stdin as json, instead of calling pnpm ourselves
    --json-input-file, -i        Read input from a (json) file, instead of calling pnpm ourselves or reading from stdin
    --output-file, -o            Output to a file instead of stdout

    --help                       Get help for the list command


  generate-disclaimer [options]  Generate a disclaimer for all dependencies

    --prod, -p                   Only consider production dependencies
    --json-input                 Read input from stdin as json, instead of calling pnpm ourselves
    --json-input-file, -i        Read input from a (json) file, instead of calling pnpm ourselves or reading from stdin
    --output-file, -o            Output to a file instead of stdout

    --help                       Get help for the generate-disclaimer command

  version                        Print the version number (also available as --version)
  help                           Print this help message (also available as --help)
```

# Commands

There are two major commands available: `list` and `generate-disclaimer`

## List command

This lists the dependencies of a project and their licenses.
Using the `--resolve-licenses` flag you'll also get the license texts (which is most likely what you want).

Note that the license texts are sometimes extracted or inferred using all kinds of metadata, there might not be a matching `LICENSE` file on disk.

This command can be used to implement your own disclaimer generation in case you want some slightly different behavior than `generate-disclaimer` gives you.

### Examples

```bash
npx @quantco/pnpm-licenses list --prod --resolve-licenses --output-file=output.json
pnpm licenses list --prod --json | npx @quantco/pnpm-licenses list --json-input --resolve-licenses
npx @quantco/pnpm-licenses list --json-input-file=dependencies.json --resolve-licenses
```

### Output

You'll receive a giant array of objects, each representing a dependency:

```ts
type Dependency = {
    name: string // from package.json
    version: string // from package.json
    path: string // file path to directory of dependency on disk
    license: string // from package.json
    author?: string | undefined // from package.json
    homepage?: string | undefined // from package.json
    description?: string | undefined // from package.json
    additionalText?: string | undefined // set for dependencies with "public domain like" licences as a replacement for "Copyright (c) <author>"
    licenseText: string | undefined // license text, this is only set if you use the --resolve-licenses flag
}
```

### Options

```
--prod, -p                   Only consider production dependencies
--resolve-licenses           Resolve actual license files and texts for dependencies
                             (as compared to just the license identifier)
--json-input                 Read input from stdin as json, instead of calling pnpm ourselves
--json-input-file, -i        Read input from a (json) file, instead of calling pnpm ourselves or reading from stdin
--output-file, -o            Output to a file instead of stdout
```


## Generate Disclaimer command

This is the main command that you'll probably want to use.
It generates a single large disclaimer for all third-party licenses you have in your pnpm project.

The file will look as follows:

```
THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED IN PORTIONS OF THIS PRODUCT

The following software may be included in this product: <package name> (<package version>)
This software contains the following license and notice below:

MIT License

Copyright (c) <author>

<actual license text>

---

The following software may be included in this product: <package name> (<package version>)
This software contains the following license and notice below:

...
```

### Examples

```bash
pnpm licenses list --json --prod | npx @quantco/pnpm-licenses generate-disclaimer --json-input --output-file=third-party-licenses.txt
npx @quantco/pnpm-licenses generate-disclaimer --prod --output-file=third-party-licenses.txt
```

### Options

```
--prod, -p                   Only consider production dependencies
--json-input                 Read input from stdin as json, instead of calling pnpm ourselves
--json-input-file, -i        Read input from a (json) file, instead of calling pnpm ourselves or reading from stdin
--output-file, -o            Output to a file instead of stdout
```


# API

You can also use this as part of your own library using the programmatic api.

```ts
import {
  generateDisclaimer,
  getDependencies,
  getLicenseText,
  resolveLicensesBestEffort
} from '@quantco/pnpm-licenses/dist/api'
import type { PnpmDependency, PnpmDependencyResolvedLicenseText } from '@quantco/pnpm-licenses/dist/api'
```

Have a look at the type definitions for more details.

# Bugs and feature requests

This package is in the very early stages of development.
If you find any bugs or have any feature requests, please open an issue on [GitHub](https://github.com/Quantco/pnpm-licenses/issues).
