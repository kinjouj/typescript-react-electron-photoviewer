import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import checkFile from 'eslint-plugin-check-file';
import globals from "globals";

export default defineConfig(
  { ignores: ["**/*.js", "**/*.mjs"] },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  stylistic.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
      "check-file": checkFile,
    },
    rules: {
      "curly": ["error", "all"],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-constant-condition": "error",
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "always", { singleValue: false }],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/comma-dangle": [
        "error",
        {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "functions": "ignore",
        },
      ],
      "@stylistic/max-statements-per-line": ["error", { max: 2 }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/spaced-comment": "off",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["variable", "function"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["typeAlias", "interface", "class", "enum"],
          format: ["PascalCase"],
        },
        {
          selector: ["variable", "function"],
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z]",
            match: true,
          },
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "react/button-has-type": "error",
      "react/function-component-definition": ["error", {
        namedComponents: "arrow-function",
        unnamedComponents: [],
      }],
      "react/jsx-handler-names": "error",
      "react/jsx-no-bind": "error",
      "react/jsx-no-leaked-render": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/no-array-index-key": "error",
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/index.{ts,tsx}": "CAMEL_CASE",
          "**/api/*": "CAMEL_CASE",
          "**/hooks/!(index).ts": "use[A-Z][a-zA-Z0-9]*",
          "**/!(index).{jsx,tsx}": "PASCAL_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);
