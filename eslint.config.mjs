import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      "@stylistic": stylistic
    },
    extends: [
      tseslint.configs.recommendedTypeChecked,
      stylistic.configs.recommended,
      tseslint.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
      }
    },
    rules: {
      "curly": ["error", "all"],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-constant-condition": "error",
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "always", { singleValue: false }],
      "@stylistic/comma-dangle": [
        "error",
        {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "functions": "ignore"
        }
      ],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/max-statements-per-line": ["error", { max: 2 }],
      "@stylistic/spaced-comment": "off",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": ["variable", "function"],
          "format": ["camelCase", "PascalCase", "UPPER_CASE"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": ["typeAlias", "interface", "class", "enum"],
          "format": ["PascalCase"]
        },
        {
          "selector": ["variable", "function"],
          "format": ["PascalCase"],
          "custom": {
            "regex": "^[A-Z]",
            "match": true
          }
        }
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_"
        }
      ],
      "react/button-has-type": "error",
      "react/function-component-definition": ["error", {
        "namedComponents": "arrow-function", 
        "unnamedComponents": []
      }],
      "react/jsx-no-bind": "error",
      "react/jsx-no-leaked-render": "error",
      "react/no-array-index-key": "error",
      "react/jsx-no-useless-fragment": "error"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    ignores: ["**/*.js"]
  }
);
