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
  checkers: ['typescript'],
  testRunner: 'vitest',
  timeoutMS: 300_000,
  incremental: true
};
export default config;
