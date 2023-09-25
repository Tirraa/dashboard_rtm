'use client';

import { fallbackLocale } from '@/config/i18n';
import { I18nProviderClient } from '@/i18n/client';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';
import { FunctionComponent } from 'react';

interface I18nProviderProps extends LayoutMinimalProps {}

const I18nProvider: FunctionComponent<I18nProviderProps> = ({ children }) => (
  <I18nProviderClient {...{ fallbackLocale }}>{children}</I18nProviderClient>
);

export default I18nProvider;
