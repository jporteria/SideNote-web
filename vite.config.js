import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // Set to the subpath where your app is hosted
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Ensure the assets are placed correctly in the build output
  },
  plugins: [react()],
});