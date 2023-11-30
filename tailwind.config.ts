import type { Config } from 'tailwindcss';
import TailwindCSSAnimate from 'tailwindcss-animate';
import colors from 'tailwindcss/colors';
import defaultTheme, { fontFamily } from 'tailwindcss/defaultTheme';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

type Colors = { [_ in keyof DefaultColors]: string | Record<PropertyKey, string> };

const REHYPE_AUTOLINK_HEADINGS_SAFELIST = ['mr-1'];

const deprecatedColors: (keyof DefaultColors)[] = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const sanitizedDefaultColors = Object.keys(colors).reduce((acc, k) => {
  const k2 = k as keyof DefaultColors;
  if (!deprecatedColors.includes(k2)) acc[k2] = colors[k2];
  return acc;
}, {} as Colors);

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './posts/**/*.{md,mdx}'],
  safelist: [...REHYPE_AUTOLINK_HEADINGS_SAFELIST],
  theme: {
    screens: { ...defaultTheme.screens },
    extend: {
      color: {
        inherit: 'inherit'
      },

      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },

      colors: {
        ...sanitizedDefaultColors,
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px'
        }
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [TailwindCSSAnimate]
} satisfies Config;

export default config;
