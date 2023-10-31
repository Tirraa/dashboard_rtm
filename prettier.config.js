/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  printWidth: 150,
  proseWrap: 'always',
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  semi: true,
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['cn'],
  plugins: ['prettier-plugin-tailwindcss']
};

module.exports = config;
