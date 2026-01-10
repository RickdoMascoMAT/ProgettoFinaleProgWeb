import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.mojang.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/crafatar': {
                target: 'https://crafatar.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/crafatar/, ''),
            },
        },
    },
})
