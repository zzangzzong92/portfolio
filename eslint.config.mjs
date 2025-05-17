import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  next,
  {
    plugins: {
      "@typescript-eslint": ts,
      tailwindcss,
    },
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    rules: {
      "tailwindcss/classnames-order": "off", // Tailwind CSS 클래스 순서 규칙 비활성화
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 사용되지 않는 변수 경고
      "@typescript-eslint/explicit-module-boundary-types": "off", // 함수 반환 타입 강제하지 않음
    },
  },
];

export default eslintConfig;
