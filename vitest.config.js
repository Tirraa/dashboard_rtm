import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  resolve: {
    alias: {
      'contentlayer/generated': resolve(__dirname, './.contentlayer/generated'),
      '@rtm/generated': resolve(__dirname, './.rtm-generated'),
      '##': resolve(__dirname, './interop'),
      Ț: resolve(__dirname, './.vitest'),
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      reporter: ['html', 'text']
    },
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['./.vitest/setEnv.ts'],
    exclude: ['node_modules'],
    environment: 'node',
    globals: true
  }
};
