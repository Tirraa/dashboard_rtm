/* v8 ignore start */
// Stryker disable all

'use client';

import type { FunctionComponent } from 'react';

import PagefindPhantom from '@/components/phantoms/Pagefind';
import { SessionProvider } from 'next-auth/react';

import type { I18nProviderProps } from './I18nProvider';

import I18nProvider from './I18nProvider';
import UIProvider from './UIProvider';

interface ProvidersProps extends I18nProviderProps {}

const Providers: FunctionComponent<ProvidersProps> = ({ children, locale }) => (
  <SessionProvider>
    <I18nProvider locale={locale}>
      <UIProvider>
        <PagefindPhantom>{children}</PagefindPhantom>
      </UIProvider>
    </I18nProvider>
  </SessionProvider>
);

export default Providers;

// Stryker restore all
/* v8 ignore stop */
