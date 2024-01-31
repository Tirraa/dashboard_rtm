import { isValidLanguageFlag } from '##/lib/builders/unifiedImport';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { allPages } from 'contentlayer/generated';

import { getPageByLanguageAndPathUnstrict } from '../api';

function getPagesStaticParams() {
  const staticParams = [];

  for (const { language, path } of allPages) {
    if (!isValidLanguageFlag(language)) continue;
    const page = getPageByLanguageAndPathUnstrict(language, path);
    if (!page) continue;
    staticParams.push({ [PageTaxonomy.PATH]: page.path.split('/'), [I18nTaxonomy.LANGUAGE]: page.language });
  }
  return staticParams;
}

export default getPagesStaticParams;
