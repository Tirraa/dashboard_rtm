import { getServerSideTranslation } from '@/i18n';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import { FunctionComponent } from 'react';

interface NotFoundInnerProps extends i18nComponentProps {}

export const NotFoundInner: FunctionComponent<NotFoundInnerProps> = async ({ i18nProps }: NotFoundInnerProps) => {
  const lng = i18nProps[i18nTaxonomy.langFlag];
  const { t } = await getServerSideTranslation(lng);
  const txt = t('404');
  return (
    <div className="m-auto">
      <h1 className="mt-2">{txt}</h1>
    </div>
  );
};

export default NotFoundInner;
