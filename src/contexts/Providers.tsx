'use client';

import { SessionProvider } from 'next-auth/react';
import { FunctionComponent } from 'react';
import I18nProvider, { I18nProviderProps } from './I18nProvider';
import UIProvider from './UIProvider';

interface ProvidersProps extends I18nProviderProps {}

export const Providers: FunctionComponent<ProvidersProps> = ({ children, locale }) => (
  <UIProvider>
    <I18nProvider {...{ locale }}>
      <SessionProvider>{children}</SessionProvider>
    </I18nProvider>
  </UIProvider>
);

export default Providers;
