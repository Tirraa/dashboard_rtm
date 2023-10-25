import { DEFAULT_DARK_VARIANT } from '@/config/themes';
import { LayoutMinimalProps as WithChildren } from '@/types/Next';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { FunctionComponent } from 'react';

interface UIProviderProps extends WithChildren {}

const UIProvider: FunctionComponent<UIProviderProps> = ({ children }) => (
  <NextUIProvider className="flex flex-col min-h-screen" id="nextui-provider">
    <NextThemesProvider attribute="class" defaultTheme={DEFAULT_DARK_VARIANT}>
      {children}
    </NextThemesProvider>
  </NextUIProvider>
);

export default UIProvider;
