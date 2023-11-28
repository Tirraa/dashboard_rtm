import { i18ns } from '##/config/i18n';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import PagesHtmlElement from '@/components/layouts/base/PagesHtmlElement';
import NotFound from '@/components/pages/Notfound';
import { getCurrentLocale, getScopedI18n } from '@/i18n/server';
import type { I18nParams } from '@/types/Next';
import { buildPageTitle } from '@rtm/shared-lib/src/str';

export async function generateMetadata() {
  const scopedT = await getScopedI18n(i18ns.vocab);

  const title = buildPageTitle(scopedT('brand-short'), scopedT('404'));
  const description = '';

  return { title, description };
}

export default async function NotFoundPage() {
  const language = getCurrentLocale();

  const params: I18nParams = { [I18nTaxonomy.LANGUAGE]: language };

  return (
    <PagesHtmlElement params={params}>
      <NotFound />
    </PagesHtmlElement>
  );
}
