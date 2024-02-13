import { isValidLanguageFlag } from '##/lib/builders/unifiedImport';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import PagesConfig from '@/config/pages';

import { getPageByLanguageAndPathUnstrict, getAllPages } from '../api';

function getPagesStaticParams() {
  const staticParams = [];
  const allPages = getAllPages();

  for (const { language, path } of allPages) {
    if (!isValidLanguageFlag(language)) continue;
    if (PagesConfig.SKIP_SSG.includes(path as any)) continue;
    const page = getPageByLanguageAndPathUnstrict(language, path);
    if (!page) continue;
    staticParams.push({ [PageTaxonomy.PATH]: page.path.split('/'), [I18nTaxonomy.LANGUAGE]: page.language });
  }
  return staticParams;
}

export default getPagesStaticParams;
