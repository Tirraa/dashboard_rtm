import type { Page } from 'contentlayer/generated';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';
import PagesConfig from '@/config/pages';

import { getPageByLanguageAndPathStrict } from '../api';

vi.mock('../ctx', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../ctx')>();

  return {
    default: {
      ...mod.default,
      TESTING: true
    }
  } satisfies typeof mod;
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

  it('should return a valid page (index notation)', () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-nesting` as const;
    const language = DEFAULT_LANGUAGE;
    const page = getPageByLanguageAndPathStrict(language, targettedPath) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });
});

describe('getPageByLanguageAndPathStrict (unhappy paths)', () => {
  it('should return null, given invalid path', () => {
    const targettedPath = '__INVALID__TARGETTED_SLUG__' as const;
    // @ts-expect-error
    const page = getPageByLanguageAndPathStrict(DEFAULT_LANGUAGE, targettedPath);

    expect(page).toBe(null);
  });

  it('should return null, given invalid language', () => {
    const targettedPath = `${PagesConfig.TESTING_ROOT}/fake-page-00` as const;
    // @ts-expect-error
    const page = getPageByLanguageAndPathStrict('__INVALID_LANGUAGE__', targettedPath);

    expect(page).toBe(null);
  });
});

vi.doUnmock('../ctx');
