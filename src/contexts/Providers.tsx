'use client';

import { SessionProvider } from 'next-auth/react';
import { FunctionComponent } from 'react';
import I18nProvider, { I18nProviderProps } from './I18nProvider';
import UIProvider from './UIProvider';

interface ProvidersProps extends I18nProviderProps {}

export const Providers: FunctionComponent<ProvidersProps> = ({ children, locale }) => (
  <I18nProvider {...{ locale }}>
    <UIProvider>
      <SessionProvider>{children}</SessionProvider>
    </UIProvider>
  </I18nProvider>
);

export default Providers;
