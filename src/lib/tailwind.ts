import { TailwindScreensBreakpoint } from '@/types/Tailwind';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import config from 'tailwind.config';
import defaultTheme from 'tailwindcss/defaultTheme';

export function getScreens(fallbackOnDefaultTheme: boolean = false) {
  const screens = config.theme?.screens;
  if (!screens && fallbackOnDefaultTheme) return defaultTheme.screens;
  return screens;
}

export function getBreakpoint(breakpoint: TailwindScreensBreakpoint): number | undefined {
  const computedValue = parseInt(getScreens()[breakpoint], 10);
  if (isNaN(computedValue)) return undefined;
  return computedValue;
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
