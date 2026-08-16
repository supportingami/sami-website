import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  { ignores: ["**/dist", "**/.next", "**/node_modules", "**/.yarn"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "no-empty-pattern": "warn",
      "no-prototype-builtins": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/prefer-namespace-keyword": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/image",
              message:
                "Please use ResponsiveImage from 'components/common/ResponsiveImage' instead of importing next/image directly.",
            },
            {
              name: "next-export-optimize-images/image",
              message:
                "Please use ResponsiveImage from 'components/common/ResponsiveImage' instead of importing next-export-optimize-images/image directly.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/components/common/ResponsiveImage.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
);
