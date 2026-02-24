import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';

// Read app version from package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Default device IP — override with VITE_REMOTE_HOST env var
const remoteHost = process.env.VITE_REMOTE_HOST || '192.168.68.66';

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: `http://${remoteHost}`,
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: `ws://${remoteHost}`,
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
