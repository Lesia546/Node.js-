import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist/**", "node_modules/**", "coverage/**", ".dependency-cruiser.cjs"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: ["error", "always"],
      // ADR-0003: клієнт SQL Server імпортується лише в src/db
      "no-restricted-imports": [
        "error",
        { paths: [{ name: "mssql", message: "Імпортуйте mssql лише в src/db (ADR-0003)." }] },
      ],
    },
  },
  {
    files: ["src/db/**/*.ts"],
    rules: { "no-restricted-imports": "off" },
  },
);
