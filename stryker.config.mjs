/* v8 ignore start */
// Stryker disable all
// @ts-check

const SOON_OBSOLETE_IGNORE_PATTERNS = ['.next']; // {ToDo} Remove me when this will be released: https://github.com/stryker-mutator/stryker-js/issues/4571

/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  plugins: ['@stryker-mutator/vitest-runner', '@stryker-mutator/typescript-checker'],
  ignorePatterns: [...SOON_OBSOLETE_IGNORE_PATTERNS, 'prebuilder-dist'],
  typescriptChecker: {
    prioritizePerformanceOverAccuracy: false
  },
  vitest: {
    configFile: 'vitest.config.mts',
    dir: '.'
  },
  tsconfigFile: 'tsconfig.json',
  checkers: ['typescript'],
  testRunner: 'vitest',
  timeoutMS: 300_000,
  incremental: true
};
export default config;
// Stryker restore all
/* v8 ignore stop */
