import { LanguageFlag } from '@/config/i18n';
import i18nTaxonomy from '@/taxonomies/i18n';
import { ReactNode } from 'react';

export type i18nParams = {
  [i18nTaxonomy.langFlag]: LanguageFlag;
};

export interface i18nPageProps {
  params: i18nParams;
}

export interface LayoutBaseProps extends i18nPageProps {
  children: ReactNode;
}

export type Path = string;
export type PathSegment = string;

export default LayoutBaseProps;
