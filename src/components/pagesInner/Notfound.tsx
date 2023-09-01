'use client';

import { I18nProviderClient, getClientSideI18n } from '@/i18n/client';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import { FunctionComponent } from 'react';

interface NotFoundInnerProps extends i18nComponentProps {}

const NotFoundInnerImpl = () => {
  const globalT = getClientSideI18n();
  const txt = globalT('vocab.404');
  return (
    <div className="m-auto">
      <h1 className="mt-2">{txt}</h1>
    </div>
  );
};

export const NotFoundInner: FunctionComponent<NotFoundInnerProps> = ({ i18nProps }) => (
  <I18nProviderClient locale={i18nProps[i18nTaxonomy.langFlag]}>
    <NotFoundInnerImpl />
  </I18nProviderClient>
);

export default NotFoundInner;
