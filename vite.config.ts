import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173, // Change port to Vite's default
    open: true,
    proxy: {
      "/api": "localhost:5173", // Update if your backend runs elsewhere
    },
  },
});
