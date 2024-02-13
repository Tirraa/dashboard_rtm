import type { PagesConfigType } from '@/config/pages';
import type { Page } from 'contentlayer/generated';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';
import PagesConfig from '@/config/pages';

import { getPageByLanguageAndPathStrict } from '../api';

vi.mock('@/config/pages', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/pages')>();

  return {
    default: {
      ...mod.default,
      ENABLE_DRAFTS_IN_PROD: false,
      SKIP_SSG: []
    } satisfies PagesConfigType
  };
});

describe('getPageByLanguageAndPathStrict (happy paths)', () => {
  it('should return a valid page', () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-page-00` as const;
    const language = DEFAULT_LANGUAGE;
    const page = getPageByLanguageAndPathStrict(language, targettedPath) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });
});

describe('getPageByLanguageAndPathStrict (unhappy paths)', () => {
  it('should return NULL when picking a draft page in an unauthorized drafts CTX', () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-draft-00` as const;
    const language = DEFAULT_LANGUAGE;
    const page = getPageByLanguageAndPathStrict(language, targettedPath);

    expect(page).toBe(null);
  });
});

vi.doUnmock('@/config/pages');
