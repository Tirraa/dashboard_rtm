/// <reference types="vitest" />
/// <reference types="vite/client" />

import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: [...configDefaults.include, '**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['./.vitest/setEnv.ts', './.vitest/jestDOM.ts'],
    exclude: [...configDefaults.exclude, 'node_modules'],
    coverage: {
      reporter: ['html', 'text']
    },
    environment: 'happy-dom',
    globals: true
  },
  resolve: {
    alias: {
      'tailwind.config': resolve(__dirname, './tailwind.config.ts'),
      'contentlayer/generated': resolve(__dirname, './.contentlayer/generated'),
      '@rtm/generated': resolve(__dirname, './.rtm-generated'),
      '##': resolve(__dirname, './interop'),
      Ț: resolve(__dirname, './.vitest'),
      '@': resolve(__dirname, './src')
    }
  }
});
