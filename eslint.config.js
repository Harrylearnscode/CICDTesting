import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import vitestPlugin from 'eslint-plugin-vitest'; // Import vitest plugin

export default tseslint.config(
  { ignores: ['dist'] },

  // Base ESLint and TypeScript ESLint recommended configurations
  js.configs.recommended,
  ...tseslint.configs.recommended, // Applies to all TS files by default through its own file specifiers

  // React hooks configuration (recommended-latest)
  // This is a full config object, so it's included directly.
  // We'll add file specifiers to ensure it applies to .ts and .tsx.
  {
    files: ['**/*.{ts,tsx}'],
    ...reactHooks.configs['recommended-latest'],
  },

  // Specific configurations for React (like react-refresh) and general TS/TSX files
  {
    files: ['**/*.{ts,tsx}'], // Target TS and TSX files
    languageOptions: {
      ecmaVersion: 2020, // Often good to specify
      globals: {
        ...globals.browser, // Add browser globals
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
      // 'react-hooks': reactHooks, // react-hooks plugin is already part of `reactHooks.configs['recommended-latest']`
    },
    rules: {
      // react-hooks rules are inherited from `reactHooks.configs['recommended-latest']`
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Add any other project-specific overrides or additional rules here
    },
  },

  // Vitest specific configuration for test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      // Example of overriding a rule:
      // "vitest/expect-expect": "off",
    },
    languageOptions: {
      globals: {
        ...globals.vitest, // Vitest globals
        // ...globals.node, // Add node globals if tests use Node.js features directly
      },
    },
  }
);
