/* v8 ignore start */
// Stryker disable all

'use client';

import type { WithSession } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { SessionProvider } from 'next-auth/react';

import type { I18nProviderProps } from './I18nProvider';

import I18nProvider from './I18nProvider';
import UIProvider from './UIProvider';

interface ProvidersProps extends I18nProviderProps, WithSession {}

const Providers: FunctionComponent<ProvidersProps> = ({ children, session, locale }) => {
  return (
    <SessionProvider session={session}>
      <I18nProvider locale={locale}>
        <UIProvider>{children}</UIProvider>
      </I18nProvider>
    </SessionProvider>
  );
};

export default Providers;

// Stryker restore all
/* v8 ignore stop */
