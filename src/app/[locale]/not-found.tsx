/* v8 ignore start */
// Stryker disable all

import type { I18nParams } from '@/types/Next';

import PagesRootElement from '@/components/layouts/base/PagesRootElement';
import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import { getCurrentLocale, getScopedI18n } from '@/i18n/server';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import NotFound from '@/components/pages/Notfound';
import { i18ns } from '##/config/i18n';

export async function generateMetadata() {
  const scopedT = await getScopedI18n(i18ns.vocab);

  const title = buildPageTitle(scopedT('brand-short'), scopedT('404'));
  const description = '';

  return { description, title };
}

export default function NotFoundPage() {
  const language = getCurrentLocale();

  const params: I18nParams = { [I18nTaxonomy.LANGUAGE]: language };

  return (
    <PagesRootElement params={params}>
      <NotFound />
    </PagesRootElement>
  );
}

// Stryker restore all
/* v8 ignore stop */
