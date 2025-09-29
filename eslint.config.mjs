import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    ignores: [
      "src/shared/ui/**/*.precompiled.js", // игнорируем все предкомпилированные шаблоны
      "node_modules/**",
      "dist/**"
    ],
  },
]);