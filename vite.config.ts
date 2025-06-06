/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/test/setup.ts',
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
