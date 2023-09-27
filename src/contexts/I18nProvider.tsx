'use client';

import { FALLBACK_LANGUAGES } from '@/config/i18n';
import { I18nProviderClient, useCurrentLocale } from '@/i18n/client';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';
import { FunctionComponent } from 'react';

interface I18nProviderProps extends LayoutMinimalProps {}

export const I18nProvider: FunctionComponent<I18nProviderProps> = ({ children }) => (
  <I18nProviderClient fallbackLocale={FALLBACK_LANGUAGES[useCurrentLocale()]}>{children}</I18nProviderClient>
);

export default I18nProvider;
