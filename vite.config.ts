import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
});