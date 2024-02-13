import type { UnknownPagePath, PageLang, PagePath } from '@/types/Page';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { Page } from 'contentlayer/generated';

import PagesConfig from '@/config/pages';

import ComputedPagesCtx from './ctx';

export const getAllPages = async () => await PagesConfig.allPages();

export async function getPageByLanguageAndPathUnstrict(language: LanguageFlag, path: UnknownPagePath): Promise<MaybeNull<Page>> {
  const allPages = await getAllPages();
  const matchingPage =
    allPages.find(({ language: currentLanguage, path: currentPath }) => currentPath === path && currentLanguage === language) ?? null;

  // Stryker Workaround 1. Mutant will be killed with `&& false` as expected, but `&& true` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!ComputedPagesCtx.TESTING && matchingPage?.root === PagesConfig.TESTING_ROOT) return null;
  if (matchingPage && !ComputedPagesCtx.ALLOWED_DRAFTS && matchingPage.draft) return null;
  return matchingPage;
}

// Stryker Workaround 2. Pointless static mutant.
// Stryker disable all
export const getPageByLanguageAndPathStrict = async <L extends PageLang>(lang: L, path: PagePath<L>): Promise<MaybeNull<Page>> =>
  await getPageByLanguageAndPathUnstrict(lang as any, path as any);
// Stryker restore all
