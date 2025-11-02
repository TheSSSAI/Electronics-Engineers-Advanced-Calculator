import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    include: ['**/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      // Enforce coverage thresholds. Aligns with enterprise quality gates.
      // 85% is a common, robust standard.
      lines: 85,
      functions: 85,
      branches: 85,
      statements: 85,

      // Exclude files from coverage report
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{vite,vitest,tsup,prettier,eslint,postcss,tailwind}.config.*',
        '**/__tests__/**', // Test files themselves are excluded
        '**/*.d.ts', // Type definition files
        'src/offline-sync/index.ts', // Index files that only re-export are often excluded
        'src/parsing/index.ts'
      ],
    },
  },
});