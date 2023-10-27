'use client';

import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

type Colors = { [_ in keyof DefaultColors]: string | Record<string, string> };

const deprecatedColors: Array<keyof DefaultColors> = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const sanitizedDefaultColors = Object.keys(colors).reduce((acc, k) => {
  const k2 = k as keyof DefaultColors;
  if (!deprecatedColors.includes(k2)) acc[k2] = colors[k2];
  return acc;
}, {} as Colors);

const config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: { ...defaultTheme.screens },
    extend: { colors: { ...sanitizedDefaultColors } }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          extend: 'dark',
          colors: { background: '#334155' }
        }
      }
    })
  ]
} satisfies Config;

export default config;
