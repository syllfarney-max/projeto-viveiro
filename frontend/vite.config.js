import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",             // raiz do projeto frontend
  build: {
    outDir: "dist",
  },
});
