import { DEFAULT_DARK_VARIANT } from '@/config/themes';
import { LayoutMinimalProps } from '@/types/Next';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { FunctionComponent } from 'react';

interface UIProviderProps extends LayoutMinimalProps {}

const UIProvider: FunctionComponent<UIProviderProps> = ({ children }) => (
  <NextUIProvider className="flex flex-col min-h-screen">
    <NextThemesProvider attribute="class" defaultTheme={DEFAULT_DARK_VARIANT}>
      {children}
    </NextThemesProvider>
  </NextUIProvider>
);

export default UIProvider;
