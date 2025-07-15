// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//      tailwindcss()
//   ],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/drei', 'three']
  }
})
