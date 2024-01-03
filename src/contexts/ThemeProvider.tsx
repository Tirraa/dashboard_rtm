/* v8 ignore start */
// Stryker disable all
'use client';

import type { ThemeProviderProps } from 'next-themes/dist/types';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// Stryker restore all
/* v8 ignore stop */
