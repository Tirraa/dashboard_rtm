/// <reference types="vitest" />
/// <reference types="vite/client" />

import { configDefaults, defineConfig } from 'vitest/config';
// import react from '@vitejs/plugin-react';
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
  // plugins: [react()],
  test: {
    include: [...configDefaults.include, '**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['./.vitest/setEnv.ts', './.vitest/jestDOM.ts'],
    exclude,
    coverage: {
      reporter: ['html', 'text'],
      exclude: [...exclude, '**/__tests__']
    },
    environment: 'happy-dom',
    globals: true // * ... Hackish: only used to force Jest-tsd compatibility
  },
  resolve: {
    alias: {
      'tailwind.config': resolve(__dirname, './tailwind.config.ts'),
      'contentlayer/generated': resolve(__dirname, './.contentlayer/generated'),
      '@rtm/generated': resolve(__dirname, './.rtm-generated'),
      '@rtm/prebuilder': resolve(__dirname, './packages/prebuilder/src'),
      '##': resolve(__dirname, './interop'),
      '𝕍': resolve(__dirname, './.vitest'),
      '@': resolve(__dirname, './src')
    }
  }
});
