'use strict';
// Transformer for Jest in CommonJS mode.
//
// Nest 12 packages (@nestjs/common, core, typeorm, mapped-types, ...) ship as
// ESM-only ("type": "module"). Jest (CJS) can't require() them, so we let
// ts-jest compile them to CommonJS. Some of them use `import.meta`, which is
// not valid in CommonJS, so we replace it before handing the file to ts-jest.
const { TsJestTransformer } = require('ts-jest');

const patch = (source, filename) => {
  if (!source.includes('import.meta')) return source;
  return source
    // `const require = createRequire(import.meta.url)` clashes with the CJS
    // wrapper's own `require`, and is unnecessary in CommonJS: drop it.
    .replace(
      /^[ \t]*(?:const|let|var)\s+require\s*=\s*createRequire\(\s*import\.meta\.url\s*\)\s*;?/gm,
      '',
    )
    .replace(/import\.meta\.url/g, "require('node:url').pathToFileURL(__filename).href")
    .replace(/import\.meta\.dirname/g, '__dirname')
    .replace(/import\.meta\.filename/g, '__filename');
};

class NestTsJestTransformer extends TsJestTransformer {
  process(source, filename, options) {
    return super.process(patch(source, filename), filename, options);
  }
  getCacheKey(source, filename, options) {
    return super.getCacheKey(patch(source, filename), filename, options);
  }
}

module.exports = {
  createTransformer: (config) => new NestTsJestTransformer(config),
  patch, // exported for debugging
};
