import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { UnknownPagePath } from '@/types/Page';
import type { Page } from 'contentlayer/generated';

import { allPages } from 'contentlayer/generated';

// {ToDo} Handle testing + drafts + write tests
export function getPageByPathAndLanguageUnstrict(language: LanguageFlag, path: UnknownPagePath): MaybeNull<Page> {
  const matchingLandingPage =
    allPages.find(({ language: currentLanguage, path: currentPath }) => currentPath === path && currentLanguage === language) ?? null;

  return matchingLandingPage;
}

// {ToDo} Codegen + strict impl
// export const getPageByPathAndLanguageStrict
