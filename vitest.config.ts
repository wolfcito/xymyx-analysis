import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      provider: 'v8',
    },
    globals: true,
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});

