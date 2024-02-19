import type { Page } from 'contentlayer/generated';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';
import PagesConfig from '@/config/pages';

import { getPageByLanguageAndPathStrict } from '../api';

describe('getPageByLanguageAndPathStrict (happy paths)', () => {
  it('should return a valid page', () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-page-00` as const;
    const language = DEFAULT_LANGUAGE;
    const page = getPageByLanguageAndPathStrict({ path: targettedPath, lang: language }) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });

  it('should return a valid page (index notation)', () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-nesting` as const;
    const language = DEFAULT_LANGUAGE;
    const page = getPageByLanguageAndPathStrict({ path: targettedPath, lang: language }) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });
});

describe('getPageByLanguageAndPathStrict (unhappy paths)', () => {
  it('should return null, given invalid path', () => {
    const targettedPath = '__INVALID__TARGETTED_SLUG__' as const;
    // @ts-expect-error
    const page = getPageByLanguageAndPathStrict({ lang: DEFAULT_LANGUAGE, path: targettedPath });

    expect(page).toBe(null);
  });

  it('should return null, given invalid language', () => {
    const targettedPath = `${PagesConfig.TESTING_ROOT}/fake-page-00` as const;
    // @ts-expect-error
    const page = getPageByLanguageAndPathStrict({ lang: '__INVALID_LANGUAGE__', path: targettedPath });

    expect(page).toBe(null);
  });
});
