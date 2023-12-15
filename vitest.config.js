import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['html', 'text']
    },
    setupFiles: ['./.vitest/setEnv.ts'],
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['node_modules']
  },
  resolve: {
    alias: {
      '##': resolve(__dirname, './interop'),
      '@': resolve(__dirname, './src'),
      Ț: resolve(__dirname, './.vitest'),
      'contentlayer/generated': resolve(__dirname, './.contentlayer/generated'),
      '@rtm/generated': resolve(__dirname, './.rtm-generated')
    }
  }
};
