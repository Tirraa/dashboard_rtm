'use client';

import { SessionProvider } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';
import type { I18nProviderProps } from './I18nProvider';
import I18nProvider from './I18nProvider';
import UIProvider from './UIProvider';

interface ProvidersProps extends I18nProviderProps {}

export const Providers: FunctionComponent<ProvidersProps> = ({ children, locale }) => {
  // {ToDo} Get rid of this workaround when it will be fixed: https://github.com/TheSGJ/nextjs-toploader/issues/56#issuecomment-1819837995
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    nProgress.done();
  }, [pathname, router]);

  return (
    <SessionProvider>
      <I18nProvider locale={locale}>
        <UIProvider>{children}</UIProvider>
      </I18nProvider>
    </SessionProvider>
  );
};

export default Providers;
