import type { LpFakeLanguageType } from '𝕍/testingContentCategoryDatas';
import type { LandingPage } from 'contentlayer/generated';

import { TESTING_LP_FAKE_LANGUAGES } from '𝕍/testingContentCategoryDatas';
import LandingPagesConfig from '@/config/landingPages';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';

import { getLandingPageByLanguageAndSlugStrict } from '../api';

vi.mock('../../../../interop/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../../../../interop/config/i18n')>();
  return {
    ...mod,
    LANGUAGES: TESTING_LP_FAKE_LANGUAGES
  };
});

describe('getLandingPageByLanguageAndSlugStrict (happy paths)', () => {
  it('should return a valid lp', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict({ slug: targettedSlug, lang: language }) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });

  it('should return a valid lp (index notation)', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-index` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict({ slug: targettedSlug, lang: language }) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });

  it('should return a valid lp (index notation)', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-index` as const;
    const language = 'en' satisfies LpFakeLanguageType;
    const lp = getLandingPageByLanguageAndSlugStrict({ slug: targettedSlug, lang: language }) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });
});

describe('getLandingPageByLanguageAndSlugStrict (unhappy paths)', () => {
  it('should return null, given invalid slug', () => {
    const targettedSlug = '__INVALID__TARGETTED_SLUG__' as const;
    // @ts-expect-error
    const lp = getLandingPageByLanguageAndSlugStrict({ lang: DEFAULT_LANGUAGE, slug: targettedSlug });

    expect(lp).toBe(null);
  });

  it('should return null, given invalid language', () => {
    const targettedSlug = 'testing-fake-lp-00' as const;
    // @ts-expect-error
    const lp = getLandingPageByLanguageAndSlugStrict({ lang: '__INVALID_LANGUAGE__', slug: targettedSlug });

    expect(lp).toBe(null);
  });
});

vi.doUnmock('../../../../interop/config/i18n');
