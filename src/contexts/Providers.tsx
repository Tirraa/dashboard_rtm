/* v8 ignore start */
// Stryker disable all

'use client';

import type { FunctionComponent } from 'react';

import usePagefind from '@/components/hooks/usePagefind';
import { SessionProvider } from 'next-auth/react';

import type { I18nProviderProps } from './I18nProvider';

import I18nProvider from './I18nProvider';
import UIProvider from './UIProvider';

interface ProvidersProps extends I18nProviderProps {}

const Providers: FunctionComponent<ProvidersProps> = ({ children, locale }) => {
  usePagefind('../pagefind/pagefind.js');

  return (
    <SessionProvider>
      <I18nProvider locale={locale}>
        <UIProvider>{children}</UIProvider>
      </I18nProvider>
    </SessionProvider>
  );
};

export default Providers;

// Stryker restore all
/* v8 ignore stop */
