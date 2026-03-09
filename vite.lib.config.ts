import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

// Library build config
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/lib"],
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "EmailEditor",
      fileName: (format) => `email-editor.${format}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@monaco-editor/react",
        "antd",
        "liquidjs",
        "juice",
        "sonner",
        "react-simple-wysiwyg",
        "currency-codes",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "@monaco-editor/react": "MonacoEditorReact",
          antd: "antd",
          liquidjs: "liquidjs",
          juice: "juice",
          sonner: "sonner",
          "react-simple-wysiwyg": "ReactSimpleWysiwyg",
          "currency-codes": "currencyCodes",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
