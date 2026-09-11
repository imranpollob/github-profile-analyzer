import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/github-profile-analyzer/' : '/',
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
