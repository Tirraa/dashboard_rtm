import type { UnknownLandingPageSlug, LandingPageLang, LandingPageSlug } from '@/types/LandingPage';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { LandingPage } from 'contentlayer/generated';

import { allLandingPages } from 'contentlayer/generated';
import LandingPagesConfig from '@/config/landingPages';

import ComputedLandingPagesCtx from './ctx';
import ComputedBlogCtx from '../blog/ctx';

// {ToDo} Write tests for TESTING and ALLOWED_DRAFTS
export function getLandingPageBySlugAndLanguageUnstrict(language: LanguageFlag, slug: UnknownLandingPageSlug): MaybeNull<LandingPage> {
  const matchingLandingPage =
    allLandingPages.find(({ language: currentLanguage, slug: currentSlug }) => currentSlug === slug && currentLanguage === language) ?? null;

  if (!ComputedLandingPagesCtx.TESTING && matchingLandingPage?.category === LandingPagesConfig.TESTING_CATEGORY) return null;
  if (matchingLandingPage && !ComputedBlogCtx.ALLOWED_DRAFTS && matchingLandingPage.draft) return null;
  return matchingLandingPage;
}

export const getLandingPageBySlugAndLanguageStrict = <L extends LandingPageLang>(lang: L, slug: LandingPageSlug<L>): MaybeNull<LandingPage> =>
  getLandingPageBySlugAndLanguageUnstrict(lang as any, slug);
