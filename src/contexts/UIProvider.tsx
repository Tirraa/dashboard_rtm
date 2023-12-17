import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { ThemeProvider } from './ThemeProvider';

interface UIProviderProps extends WithChildren {}

const UIProvider: FunctionComponent<UIProviderProps> = ({ children }) => (
  <ThemeProvider disableTransitionOnChange defaultTheme="system" attribute="class" enableSystem>
    {children}
  </ThemeProvider>
);

export default UIProvider;
