/// <reference types='vitest' />
import { defineConfig } from 'vitest/config';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
   root: __dirname,
   cacheDir: '../../node_modules/.vite/apps/client',

   plugins: [nxViteTsPaths(), react()],

   test: {
      globals: true,
      cache: {
         dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      reporters: ['default'],
      coverage: {
         reportsDirectory: '../../coverage/apps/client',
         provider: 'v8',
      },
   },
});
