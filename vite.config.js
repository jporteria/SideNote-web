import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure paths resolve correctly
      'firebase/app': '/src/firebase/firebase-sdk/firebase-app.js',
      'firebase/auth': '/src/firebase/firebase-sdk/firebase-auth.js',
      'firebase/firestore': '/src/firebase/firebase-sdk/firestore.js'
    },
  },
  build: {
    rollupOptions: {
      // Do not externalize local Firebase files
      external: [],
    },
  },
})
