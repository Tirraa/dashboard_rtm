'use client';

import { fallbackLocale } from '@/config/i18n';
import { I18nProviderClient, getClientSideI18n } from '@/i18n/client';
import { FunctionComponent } from 'react';

interface NotFoundInnerProps {}

const NotFoundInnerImpl = () => {
  const globalT = getClientSideI18n();
  const txt = globalT('vocab.404');
  return (
    <div className="m-auto">
      <h1 className="mt-2">{txt}</h1>
    </div>
  );
};

export const NotFoundInner: FunctionComponent<NotFoundInnerProps> = () => (
  <I18nProviderClient {...fallbackLocale}>
    <NotFoundInnerImpl />
  </I18nProviderClient>
);

export default NotFoundInner;
