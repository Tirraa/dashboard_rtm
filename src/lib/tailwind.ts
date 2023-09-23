import config from 'tailwind.config';
import defaultTheme from 'tailwindcss/defaultTheme';

export function getScreens(fallbackOnDefaultTheme: boolean = false) {
  const screens = config.theme?.screens;
  if (!screens && fallbackOnDefaultTheme) return defaultTheme.theme.screens;
  return screens;
}

export function getBreakpoint(key: string): number | undefined {
  const computedValue = parseInt(getScreens()[key], 10);
  if (isNaN(computedValue)) return undefined;
  return computedValue;
}
