import type { LandingPage } from 'contentlayer/generated';

import LandingPagesConfig from '@/config/landingPages';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';

import { getLandingPageBySlugAndLanguageStrict } from '../api';

describe('getLandingPageBySlugAndLanguageStrict', () => {
  it('should always return a valid lp', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageBySlugAndLanguageStrict(DEFAULT_LANGUAGE, targettedSlug) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });

  it('should always return null, given invalid slug', () => {
    const targettedSlug = '__INVALID__TARGETTED_SLUG__' as const;
    // @ts-expect-error
    const lp = getLandingPageBySlugAndLanguageStrict(DEFAULT_LANGUAGE, targettedSlug);

    expect(lp).toBe(null);
  });

  it('should always return null, given invalid language', () => {
    const targettedSlug = 'testing-fake-lp-00' as const;
    // @ts-expect-error
    const lp = getLandingPageBySlugAndLanguageStrict('__INVALID_LANGUAGE__', targettedSlug);

    expect(lp).toBe(null);
  });
});
