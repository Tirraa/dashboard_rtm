import type { UnknownPagePath, PageLang, PagePath } from '@/types/Page';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { Page } from 'contentlayer/generated';

import { allPages } from 'contentlayer/generated';
import PagesConfig from '@/config/pages';

import ComputedPagesCtx from './ctx';

export function getPageByLanguageAndPathUnstrict(language: LanguageFlag, path: UnknownPagePath): MaybeNull<Page> {
  const matchingPage =
    allPages.find(({ language: currentLanguage, path: currentPath }) => currentPath === path && currentLanguage === language) ?? null;

  if (!ComputedPagesCtx.TESTING && matchingPage?.root === PagesConfig.TESTING_ROOT) return null;
  if (matchingPage && !ComputedPagesCtx.ALLOWED_DRAFTS && matchingPage.draft) return null;
  return matchingPage;
}

export const getPageByLanguageAndPathStrict = <L extends PageLang>(lang: L, path: PagePath<L>): MaybeNull<Page> =>
  getPageByLanguageAndPathUnstrict(lang as any, path as any);
