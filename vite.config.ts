import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: "state-vendor",
              test: /node_modules[\\/](?:@reduxjs[\\/]toolkit|react-redux|redux|redux-thunk|reselect|immer)[\\/]/,
              priority: 20,
            },
            {
              name: "ui-vendor",
              test: /node_modules[\\/](?:lucide-react|radix-ui|@radix-ui[\\/]react-[^\\/]+|class-variance-authority|clsx|tailwind-merge|tw-animate-css)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
