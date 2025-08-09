// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // change to vue() if using Vue

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '.netlify.app' // ✅ allow all Netlify preview & production domains
    ]
  }
});
// This config allows you to use the Vite dev server with React.