'use strict';
const base = require('../jest.config.js');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  rootDir: '..',
  testRegex: 'test/.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      '<rootDir>/jest.transform.js',
      { tsconfig: '<rootDir>/tsconfig.jest.json' },
    ],
  },
};
