import type { Config } from 'tailwindcss';

import withMT from '@material-tailwind/react/utils/withMT';
import colors from 'tailwindcss/colors';

const config: Config = withMT({
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'Sans-Serif']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow
      }
    }
  },

  plugins: []
}) as Config;

export default config;
