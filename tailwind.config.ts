import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'Sans-Serif']
      },
      colors: {
        evOrange: '#FF441D'
      }
    }
  },

  plugins: []
};

export default config;
