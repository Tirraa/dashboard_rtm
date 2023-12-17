/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['cn'],
  bracketSameLine: false,
  trailingComma: 'none',
  bracketSpacing: true,
  proseWrap: 'always',
  singleQuote: true,
  printWidth: 150,
  useTabs: false,
  tabWidth: 2,
  semi: true
};

module.exports = config;
