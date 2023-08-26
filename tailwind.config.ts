import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

import withMT from '@material-tailwind/react/utils/withMT';

const deprecatedColors = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];

const sanitizedColors = Object.keys(colors).reduce((acc, k) => {
  const key = k as keyof DefaultColors;
  if (!deprecatedColors.includes(key)) (acc as any)[key] = colors[key];
  return acc;
}, {});

const config: Config = withMT({
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ...sanitizedColors
      }
    }
  },

  plugins: []
}) as Config;

export default config;
