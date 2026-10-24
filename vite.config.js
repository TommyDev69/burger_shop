import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    entries: ['index.html'],
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    host: '127.0.0.1',
  },
  publicDir: 'public',
});