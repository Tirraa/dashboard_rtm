import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

import withMT from '@material-tailwind/react/utils/withMT';

type Colors = { [_ in keyof DefaultColors]: string | Record<string, string> };

const deprecatedColors: Array<keyof DefaultColors> = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const sanitizedDefaultColors = Object.keys(colors).reduce((acc, k) => {
  const k2 = k as keyof DefaultColors;
  if (!deprecatedColors.includes(k2)) acc[k2] = colors[k2];
  return acc;
}, {} as Colors);

const config = withMT({
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ...sanitizedDefaultColors
      }
    }
  },

  plugins: []
} satisfies Config) as Config;

export default config;
