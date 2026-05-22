import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const isAiStudio = process.env.DISABLE_HMR === 'true' || !!process.env.APPLET_ID;
  const port = isAiStudio ? 3000 : (Number(process.env.PORT) || 3090);
  const host = isAiStudio ? '0.0.0.0' : '127.0.0.1';
  const allowedHosts = (isAiStudio ? true : ['lenakids.com']) as true | string[];

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host,
      port,
      allowedHosts,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host,
      port,
      allowedHosts,
    },
  };
});
