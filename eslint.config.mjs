import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      // React rules
      // 'react/react-in-jsx-scope': 'off',
      // 'react/prop-types': 'off',
      // 'react/display-name': 'off',
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',

      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',

      // Next.js rules
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off', // Handled by TypeScript version
      'prefer-const': 'off',

      // TypeScript rules
      // '@typescript-eslint/no-unused-vars': 'warn',
      // '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/no-empty-function': 'warn',
      // '@typescript-eslint/ban-ts-comment': 'warn',
    },
  }),
]

export default eslintConfig;
