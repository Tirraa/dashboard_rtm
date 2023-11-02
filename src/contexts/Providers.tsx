'use client';

import { SessionProvider } from 'next-auth/react';
import type { FunctionComponent } from 'react';
import type { I18nProviderProps } from './I18nProvider';
import I18nProvider from './I18nProvider';
import UIProvider from './UIProvider';

interface ProvidersProps extends I18nProviderProps {}

export const Providers: FunctionComponent<ProvidersProps> = ({ children, locale }) => (
  <SessionProvider>
    <I18nProvider {...{ locale }}>
      <UIProvider>{children}</UIProvider>
    </I18nProvider>
  </SessionProvider>
);

export default Providers;
