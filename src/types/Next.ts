import i18nTaxonomy from '@/taxonomies/i18n';
import { LanguageFlag } from '@/types/i18n';
import { ReactNode } from 'react';

export type i18nParams = {
  [i18nTaxonomy.LANG_FLAG]: LanguageFlag;
};

export interface i18nPageProps {
  params: i18nParams;
}

export interface i18nComponentProps {
  i18nProps: i18nParams;
}

export interface LayoutBaseProps extends i18nPageProps {
  children: ReactNode;
}

export type AppPath = string;
export type PathSegment = string;
