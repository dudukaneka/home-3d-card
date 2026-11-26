import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      publicDir: 'examples/sample-home',
      server: {
        port: 5173,
        open: false,
      },
    };
  }

  return {
    publicDir: false,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'src/home-3d-card.ts'),
        name: 'Home3DCard',
        formats: ['es'],
        fileName: () => 'home-3d-card.js',
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
      minify: 'esbuild',
      sourcemap: false,
    },
  };
});
