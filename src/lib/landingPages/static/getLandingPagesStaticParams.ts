import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { isValidLanguageFlag } from '##/lib/builders/unifiedImport';
import { allLandingPages } from 'contentlayer/generated';
import I18nTaxonomy from '##/config/taxonomies/i18n';

import { getLandingPageBySlugAndLanguageUnstrict } from '../api';

async function getLandingPagesStaticParams() {
  const staticParams = [];

  for (const { language, slug } of allLandingPages) {
    if (!isValidLanguageFlag(language)) continue;
    const matchedLp = getLandingPageBySlugAndLanguageUnstrict(language, slug);
    if (!matchedLp) continue;
    staticParams.push({ [I18nTaxonomy.LANGUAGE]: matchedLp.language, [LandingPageTaxonomy.SLUG]: matchedLp.slug });
  }
  return staticParams;
}

export default getLandingPagesStaticParams;
