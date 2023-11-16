import { i18ns } from '##/config/i18n';
import i18nTaxonomy from '##/config/taxonomies/i18n';
import PagesHtmlElement from '@/components/layouts/base/PagesHtmlElement';
import NotFound from '@/components/pages/Notfound';
import { getCurrentLocale, getScopedI18n } from '@/i18n/server';
import { buildPageTitle } from '@/lib/str';
import type { I18nParams } from '@/types/Next';

export async function generateMetadata() {
  const scopedT = await getScopedI18n(i18ns.vocab);

  const title = buildPageTitle(scopedT('brand-short'), scopedT('404'));
  const description = '';

  return { title, description };
}

export default async function NotFoundPage() {
  const locale = getCurrentLocale();

  const params: I18nParams = { [i18nTaxonomy.LANG_FLAG]: locale };

  return (
    <PagesHtmlElement params={params}>
      <NotFound />
    </PagesHtmlElement>
  );
}
