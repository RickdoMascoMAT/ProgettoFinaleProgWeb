import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: process.env.GITHUB_ACTIONS ? '/ProgettoFinaleProgWeb/' : '/',
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.mojang.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
