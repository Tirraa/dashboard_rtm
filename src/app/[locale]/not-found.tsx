import i18nTaxonomy from '##/config/taxonomies/i18n';
import PagesHtmlElement from '@/components/layouts/base/PagesHtmlElement';
import NotFound from '@/components/pages/Notfound';
import { getCurrentLocale } from '@/i18n/server';
import type { I18nParams } from '@/types/Next';

export default async function NotFoundPage() {
  const locale = getCurrentLocale();

  const params: I18nParams = { [i18nTaxonomy.LANG_FLAG]: locale };

  return (
    <PagesHtmlElement params={params}>
      <NotFound />
    </PagesHtmlElement>
  );
}
