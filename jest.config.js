'use strict';

/** @type {import('jest').Config} */
module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: 'src/.*\\.spec\\.ts$',

  // The sources import with the `.js` extension (module: NodeNext):
  //   import { AppService } from './app.service.js'
  // Jest must resolve that to app.service.ts.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '^.+\\.(t|j)s$': [
      '<rootDir>/jest.transform.js',
      { tsconfig: '<rootDir>/tsconfig.jest.json' },
    ],
  },
  // ESM-only packages must go through the transformer.
  transformIgnorePatterns: ['/node_modules/(?!(@nestjs)/)'],

  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/**/*.spec.ts'],
  coverageDirectory: 'coverage',
};
