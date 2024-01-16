import type { MaybeNull } from 'packages/shared-types/src/CustomUtilityTypes';
import type { LanguageFlag } from 'packages/shared-types/src/I18n';
import type { UnknownLandingPageSlug } from '@/types/LandingPage';
import type { LandingPage } from 'contentlayer/generated';

import { allLandingPages } from 'contentlayer/generated';

// {ToDo} Handle drafts and testing + write tests
export const getLandingPageBySlugAndLanguageUnstrict = (slug: UnknownLandingPageSlug, language: LanguageFlag): MaybeNull<LandingPage> =>
  allLandingPages.find(
    ({ language: currentLanguage, category: currentCategory, slug: currentSlug }) =>
      [currentCategory, currentSlug].join('-') === slug && currentLanguage === language
  ) ?? null;

// {ToDo} Codegen + Strict typing + write tests
// export const getLandingPageBySlugAndLanguageStrict