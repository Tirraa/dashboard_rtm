import { LanguageFlag } from '@/config/i18n';
import i18nTaxonomy from '@/taxonomies/i18n';
import { ReactNode } from 'react';

export type i18nParams = {
  [i18nTaxonomy.langFlag]: LanguageFlag;
};

export interface LayoutBaseProps {
  children: ReactNode;
  params: i18nParams;
}

export type Pathname = string;
export type PathnameSegment = string;

export default LayoutBaseProps;
