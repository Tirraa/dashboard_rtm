import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { UnknownPagePath } from '@/types/Page';
import type { Page } from 'contentlayer/generated';

import { allPages } from 'contentlayer/generated';
import PagesConfig from '@/config/pages';

import ComputedPagesCtx from './ctx';

// {ToDo} Write tests
export function getPageByPathAndLanguageUnstrict(language: LanguageFlag, path: UnknownPagePath): MaybeNull<Page> {
  const matchingPage =
    allPages.find(({ language: currentLanguage, path: currentPath }) => currentPath === path && currentLanguage === language) ?? null;

  if (!ComputedPagesCtx.TESTING && matchingPage?.root === PagesConfig.TESTING_ROOT) return null;
  if (matchingPage && !ComputedPagesCtx.ALLOWED_DRAFTS && matchingPage.draft) return null;
  return matchingPage;
}

// {ToDo} Codegen + strict impl
// export const getPageByPathAndLanguageStrict
