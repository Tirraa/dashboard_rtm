import type { UnknownLandingPageSlug, LandingPageLang, LandingPageSlug } from '@/types/LandingPage';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { LandingPage } from 'contentlayer/generated';

import { allLandingPages } from 'contentlayer/generated';

// {ToDo} Handle drafts and testing + write tests
export const getLandingPageBySlugAndLanguageUnstrict = (slug: UnknownLandingPageSlug, language: LanguageFlag): MaybeNull<LandingPage> =>
  allLandingPages.find(({ language: currentLanguage, slug: currentSlug }) => currentSlug === slug && currentLanguage === language) ?? null;

export const getLandingPageBySlugAndLanguageStrict = <L extends LandingPageLang>(lang: L, slug: LandingPageSlug<L>): MaybeNull<LandingPage> =>
  getLandingPageBySlugAndLanguageUnstrict(slug, lang);
