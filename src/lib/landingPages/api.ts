import type { UnknownLandingPageSlug, LandingPageLang, LandingPageSlug } from '@/types/LandingPage';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { LandingPage } from 'contentlayer/generated';

import { allLandingPages } from 'contentlayer/generated';
import LandingPagesConfig from '@/config/landingPages';

import ComputedLandingPagesCtx from './ctx';

export function getLandingPageBySlugAndLanguageUnstrict(language: LanguageFlag, slug: UnknownLandingPageSlug): MaybeNull<LandingPage> {
  const matchingLandingPage =
    allLandingPages.find(({ language: currentLanguage, slug: currentSlug }) => currentSlug === slug && currentLanguage === language) ?? null;

  // Stryker Workaround 1. Mutant will be killed with `&& false` as expected, but `&& true` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!ComputedLandingPagesCtx.TESTING && matchingLandingPage?.category === LandingPagesConfig.TESTING_CATEGORY) return null;
  if (matchingLandingPage && !ComputedLandingPagesCtx.ALLOWED_DRAFTS && matchingLandingPage.draft) return null;
  return matchingLandingPage;
}

export const getLandingPageBySlugAndLanguageStrict = <L extends LandingPageLang>(lang: L, slug: LandingPageSlug<L>): MaybeNull<LandingPage> =>
  getLandingPageBySlugAndLanguageUnstrict(lang as any, slug as any);
