'use client';

import Loader from '@/components/shared/misc/Loader';
import { I18nProviderClient } from '@/i18n/client';
import { LayoutMinimalProps as WithChildren } from '@/types/Next';
import { FunctionComponent } from 'react';

export interface I18nProviderProps extends WithChildren {
  locale: string;
}

export const I18nProvider: FunctionComponent<I18nProviderProps> = ({ children, locale }) => (
  <I18nProviderClient {...{ locale }} fallback={<Loader />}>
    {children}
  </I18nProviderClient>
);

export default I18nProvider;
