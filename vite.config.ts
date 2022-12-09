/// <reference types="vitest" />
/// <reference types="vite/client"/>

import WindiCSS from 'vite-plugin-windicss';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), WindiCSS()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },

  resolve: {
    // alias: [
    //   {
    //     find: /^~(.*)$/,
    //     replacement: '$1',

    //   },
    // ]
    alias: { './runtimeConfig': './runtimeConfig.browser' },
  },
});
