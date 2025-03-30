import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BASE_DEV_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api'), // Optional if needed
        },
      },
    },
  });
};
