import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { allLandingPages } from 'contentlayer/generated';
import I18nTaxonomy from '##/config/taxonomies/i18n';

import { getLandingPageBySlugAndLanguageStrict } from './api';

export function getLandingPagesStaticParams() {
  const staticParams = [];
  for (const { language, slug } of allLandingPages) {
    const matchedLp = getLandingPageBySlugAndLanguageStrict(language as any, slug as any);
    if (!matchedLp) continue;
    staticParams.push({ [I18nTaxonomy.LANGUAGE]: matchedLp.language, [LandingPageTaxonomy.SLUG]: matchedLp.slug });
  }

  return staticParams;
}
