import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { UnknownLandingPageSlug } from '@/types/LandingPage';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { LandingPage } from 'contentlayer/generated';

import { allLandingPages } from 'contentlayer/generated';

// {ToDo} Handle drafts and testing + write tests
export const getLandingPageBySlugAndLanguageUnstrict = (slug: UnknownLandingPageSlug, language: LanguageFlag): MaybeNull<LandingPage> =>
  allLandingPages.find(({ language: currentLanguage, slug: currentSlug }) => currentSlug === slug && currentLanguage === language) ?? null;

// {ToDo} Handle drafts and testing + write tests + Strict typing
// export const getLandingPageBySlugAndLanguageStrict
