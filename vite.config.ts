import path from 'path';
import fs from 'fs';
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

function typeDeclaration(): Plugin {
  return {
    name: 'type-declaration',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        source: fs.readFileSync(path.resolve(__dirname, './src/lib/toast.d.ts')),
        name: 'dkToast.d.ts',
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), typeDeclaration()],
  server: {
    port: 8000,
  },
  root: './src/dev',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/toast.ts'),
      name: 'vue-dk-toast',
      fileName: (format) => `dkToast.${format}.min.js`,
      formats: ['umd'],
    },
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
