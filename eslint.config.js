import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn", // Te avisará de todas esas variables x, x2, x3...
      "no-var": "error", // Te obligará a cambiar var por let/const
      "prefer-const": "warn", // Te sugerirá usar const si la variable no cambia
    },
  },
];
