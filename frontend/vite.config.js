import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    proxy: {
      "/api": {
        target: "https://viveiro-comurg-backend-yjsj.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
