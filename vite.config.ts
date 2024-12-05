import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Adjust the path according to your project structure
    },
  },
  optimizeDeps: {
    include: ['msw'], // Укажите msw как зависимость для оптимизации.
  },
});
