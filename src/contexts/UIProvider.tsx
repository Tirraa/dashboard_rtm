import type { LayoutMinimalProps as WithChildren } from '@/types/Next';
import type { FunctionComponent } from 'react';
import { ThemeProvider } from './ThemeProvider';

interface UIProviderProps extends WithChildren {}

export const UIProvider: FunctionComponent<UIProviderProps> = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    {children}
  </ThemeProvider>
);

export default UIProvider;
