// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  plugins: ['@stryker-mutator/vitest-runner', '@stryker-mutator/typescript-checker'],
  typescriptChecker: {
    prioritizePerformanceOverAccuracy: false
  },
  vitest: {
    configFile: 'vitest.config.mts',
    dir: '.'
  },
  tsconfigFile: 'tsconfig.json',
  ignorePatterns: ['.next'], // {ToDo} Remove this line when this will be released: https://github.com/stryker-mutator/stryker-js/issues/4571
  checkers: ['typescript'],
  testRunner: 'vitest',
  timeoutMS: 300_000,
  incremental: true
};
export default config;
