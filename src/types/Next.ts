/* v8 ignore start */
// Stryker disable all
import type NotFoundTaxonomy from '##/config/taxonomies/notfound';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type I18nTaxonomy from '##/config/taxonomies/i18n';
import type { ReactNode } from 'react';

export interface I18nParams {
  [I18nTaxonomy.LANGUAGE]: LanguageFlag;
}

export interface I18nPageProps {
  params: I18nParams;
}

export interface LayoutBaseProps extends I18nPageProps {
  children: ReactNode;
}

export type NotFoundCatchallParams = {
  params: { [NotFoundTaxonomy.NOT_FOUND]: unknown[] };
};
/* v8 ignore stop */
// Stryker restore all
