import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginSvelte from "eslint-plugin-svelte";
import tseslint from "typescript-eslint";
import svelteParser from "svelte-eslint-parser";

export default [
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs.recommended,
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  },
  {
    rules: {},
  },
];
