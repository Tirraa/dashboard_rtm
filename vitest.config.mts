/// <reference types="vitest" />
/// <reference types="vite/client" />

// eslint-disable-next-line import/no-extraneous-dependencies
import { configDefaults, defineConfig } from 'vitest/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const exclude = [
  ...configDefaults.exclude,
  'node_modules',
  '**/prebuilder-dist',
  '.next',
  '.stryker-tmp',
  '.rtm-generated',
  '.contentlayer',
  '*.d.ts'
];

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'contentlayer/generated': resolve(__dirname, './.contentlayer/generated'),
      '@rtm/prebuilder': resolve(__dirname, './packages/prebuilder/src'),
      'tailwind.config': resolve(__dirname, './tailwind.config.ts'),
      '@rtm/generated': resolve(__dirname, './.rtm-generated'),
      '##': resolve(__dirname, './interop'),
      '𝕍': resolve(__dirname, './.vitest'),
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      exclude: [...exclude, '**/__tests__'],
      reporter: ['html', 'text']
    },
    include: [...configDefaults.include, '**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['./.vitest/setEnv.ts', './.vitest/jestDOM.ts'],
    environment: 'happy-dom',
    globals: true, // * ... Hackish: only used to force Jest-tsd compatibility
    exclude
  },
  plugins: [react()]
});
