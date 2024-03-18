/* v8 ignore start */
// Stryker disable all

import type { DefaultColors } from 'tailwindcss/types/generated/colors';
import type { Config } from 'tailwindcss';

import defaultTheme, { fontFamily } from 'tailwindcss/defaultTheme';
import TailwindCSSAnimate from 'tailwindcss-animate';
import colors from 'tailwindcss/colors';

type Colors = { [_ in keyof DefaultColors]: Record<PropertyKey, string> | string };

const REHYPE_AUTOLINK_HEADINGS_SAFELIST = ['mr-1'];

const deprecatedColors: (keyof DefaultColors)[] = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const sanitizedDefaultColors = Object.keys(colors).reduce((acc, k) => {
  const k2 = k as keyof DefaultColors;
  if (!deprecatedColors.includes(k2)) acc[k2] = colors[k2];
  return acc;
}, {} as Colors);

const config = {
  theme: {
    extend: {
      colors: {
        ...sanitizedDefaultColors,
        destructive: {
          foreground: 'hsl(var(--destructive-foreground))',
          DEFAULT: 'hsl(var(--destructive))'
        },
        secondary: {
          foreground: 'hsl(var(--secondary-foreground))',
          DEFAULT: 'hsl(var(--secondary))'
        },
        primary: {
          foreground: 'hsl(var(--primary-foreground))',
          DEFAULT: 'hsl(var(--primary))'
        },
        popover: {
          foreground: 'hsl(var(--popover-foreground))',
          DEFAULT: 'hsl(var(--popover))'
        },
        accent: {
          foreground: 'hsl(var(--accent-foreground))',
          DEFAULT: 'hsl(var(--accent))'
        },
        muted: {
          foreground: 'hsl(var(--muted-foreground))',
          DEFAULT: 'hsl(var(--muted))'
        },
        card: {
          foreground: 'hsl(var(--card-foreground))',
          DEFAULT: 'hsl(var(--card))'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))'
      },

      keyframes: {
        'accordion-down': {
          to: { height: 'var(--radix-accordion-content-height)' },
          from: { height: '0' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },

      borderRadius: {
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        lg: 'var(--radius)'
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },

      container: {
        screens: {
          '2xl': '1400px'
        },
        padding: '2rem',
        center: true
      },

      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },

      color: {
        inherit: 'inherit'
      }
    },
    screens: { ...defaultTheme.screens }
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/blog/**/*.{md,mdx}', './content/landing-pages/**/*.{md,mdx}', './content/pages/**/*.{md,mdx}'],
  safelist: [...REHYPE_AUTOLINK_HEADINGS_SAFELIST],
  plugins: [TailwindCSSAnimate],
  darkMode: ['class']
} satisfies Config;

export default config;

// Stryker restore all
/* v8 ignore stop */
