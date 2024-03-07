// @ts-check

/** @type {import("prettier").Config} */
const config = {
  tailwindFunctions: ['cn', 'cva', 'clsx', 'twMerge'],
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
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
