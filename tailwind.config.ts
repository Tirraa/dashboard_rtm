'use client';

import withMT from '@material-tailwind/react/utils/withMT';
import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

type Colors = { [_ in keyof DefaultColors]: string | Record<string, string> };

const deprecatedColors: Array<keyof DefaultColors> = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const sanitizedDefaultColors = Object.keys(colors).reduce((acc, k) => {
  const k2 = k as keyof DefaultColors;
  if (!deprecatedColors.includes(k2)) acc[k2] = colors[k2];
  return acc;
}, {} as Colors);

const config = withMT({
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ...sanitizedDefaultColors
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
} satisfies Config) as Config;

export default config;
