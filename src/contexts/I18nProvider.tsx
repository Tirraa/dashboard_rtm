'use client';

import Loader from '@/components/ui/Loader';
import { I18nProviderClient } from '@/i18n/client';
import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

export interface I18nProviderProps extends WithChildren {
  locale: string;
}

const I18nProvider: FunctionComponent<I18nProviderProps> = ({ children, locale }) => (
  <I18nProviderClient locale={locale} fallback={<Loader />}>
    {children}
  </I18nProviderClient>
);

export default I18nProvider;
