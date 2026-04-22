import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Injection automatique des variables et mixins dans chaque fichier SCSS
        additionalData: `@use "./src/styles/variables" as *; @use "./src/styles/mixins" as *;`
      }
    }
  }
});
