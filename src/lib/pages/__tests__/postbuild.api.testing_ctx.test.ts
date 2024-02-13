import type { Page } from 'contentlayer/generated';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';
import PagesConfig from '@/config/pages';

import { getPageByLanguageAndPathStrict } from '../api';

describe('getPageByLanguageAndPathStrict (happy paths)', () => {
  it('should return a valid page', async () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-page-00` as const;
    const language = DEFAULT_LANGUAGE;
    const page = (await getPageByLanguageAndPathStrict(language, targettedPath)) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });

  it('should return a valid page (index notation)', async () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-nesting` as const;
    const language = DEFAULT_LANGUAGE;
    const page = (await getPageByLanguageAndPathStrict(language, targettedPath)) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });
});

describe('getPageByLanguageAndPathStrict (unhappy paths)', () => {
  it('should return null, given invalid path', async () => {
    const targettedPath = '__INVALID__TARGETTED_SLUG__' as const;
    // @ts-expect-error
    const page = await getPageByLanguageAndPathStrict(DEFAULT_LANGUAGE, targettedPath);

    expect(page).toBe(null);
  });

  it('should return null, given invalid language', async () => {
    const targettedPath = `${PagesConfig.TESTING_ROOT}/fake-page-00` as const;
    // @ts-expect-error
    const page = await getPageByLanguageAndPathStrict('__INVALID_LANGUAGE__', targettedPath);

    expect(page).toBe(null);
  });
});
