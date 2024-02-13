import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { isValidLanguageFlag } from '##/lib/builders/unifiedImport';
import I18nTaxonomy from '##/config/taxonomies/i18n';

import { getLandingPageByLanguageAndSlugUnstrict, getAllLandingPages } from '../api';

async function getLandingPagesStaticParams() {
  const staticParams = [];
  const allLandingPages = await getAllLandingPages();

  for (const { language, slug } of allLandingPages) {
    if (!isValidLanguageFlag(language)) continue;
    const matchedLp = await getLandingPageByLanguageAndSlugUnstrict(language, slug);
    if (!matchedLp) continue;
    staticParams.push({ [I18nTaxonomy.LANGUAGE]: matchedLp.language, [LandingPageTaxonomy.SLUG]: matchedLp.slug });
  }
  return staticParams;
}

export default getLandingPagesStaticParams;
