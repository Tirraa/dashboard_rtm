import { UI_PROVIDER_CLS } from '@/components/config/styles/next-ui';
import ELEMENTS_ID from '@/config/elementsId';
import { DEFAULT_DARK_VARIANT } from '@/config/themes';
import { LayoutMinimalProps as WithChildren } from '@/types/Next';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { FunctionComponent } from 'react';

interface UIProviderProps extends WithChildren {}

const className = UI_PROVIDER_CLS;
const id = ELEMENTS_ID.NEXTUI_PROVIDER;

const UIProvider: FunctionComponent<UIProviderProps> = ({ children }) => (
  <NextUIProvider {...{ className, id }}>
    <NextThemesProvider attribute="class" defaultTheme={DEFAULT_DARK_VARIANT}>
      {children}
    </NextThemesProvider>
  </NextUIProvider>
);

export default UIProvider;
