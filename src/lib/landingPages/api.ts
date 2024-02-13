import type { UnknownLandingPageSlug, LandingPageLang, LandingPageSlug } from '@/types/LandingPage';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { LandingPage } from 'contentlayer/generated';

import LandingPagesConfig from '@/config/landingPages';

import ComputedLandingPagesCtx from './ctx';

export const getAllLandingPages = async () => await LandingPagesConfig.allLandingPages();

export async function getLandingPageByLanguageAndSlugUnstrict(language: LanguageFlag, slug: UnknownLandingPageSlug): Promise<MaybeNull<LandingPage>> {
  const allLandingPages = await getAllLandingPages();
  const matchingLandingPage =
    allLandingPages.find(({ language: currentLanguage, slug: currentSlug }) => currentSlug === slug && currentLanguage === language) ?? null;

  // Stryker Workaround 1. Mutant will be killed with `&& false` as expected, but `&& true` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!ComputedLandingPagesCtx.TESTING && matchingLandingPage?.category === LandingPagesConfig.TESTING_CATEGORY) return null;
  if (matchingLandingPage && !ComputedLandingPagesCtx.ALLOWED_DRAFTS && matchingLandingPage.draft) return null;
  return matchingLandingPage;
}

// Stryker Workaround 2. Pointless static mutant.
// Stryker disable all
export const getLandingPageByLanguageAndSlugStrict = async <L extends LandingPageLang>(
  lang: L,
  slug: LandingPageSlug<L>
): Promise<MaybeNull<LandingPage>> => await getLandingPageByLanguageAndSlugUnstrict(lang as any, slug as any);
// Stryker restore all
