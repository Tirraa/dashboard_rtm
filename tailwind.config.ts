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
        ...colors
      }
    }
  },

  plugins: []
}) as Config;

export default config;
