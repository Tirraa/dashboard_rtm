/* v8 ignore start */
// Stryker disable all

import type NotFoundTaxonomy from '##/config/taxonomies/notfound';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type { WithChildren } from '@rtm/shared-types/Next';
import type I18nTaxonomy from '##/config/taxonomies/i18n';

export interface I18nParams {
  [I18nTaxonomy.LANGUAGE]: LanguageFlag;
}

export interface I18nPageProps {
  params: I18nParams;
}

export interface LayoutBaseProps extends I18nPageProps, WithChildren {}

export type NotFoundCatchallParams = {
  params: { [NotFoundTaxonomy.NOT_FOUND]: unknown[] };
};

// Stryker restore all
/* v8 ignore stop */
