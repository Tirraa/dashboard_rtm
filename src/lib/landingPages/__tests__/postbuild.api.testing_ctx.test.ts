import type { LandingPage } from 'contentlayer/generated';

import LandingPagesConfig from '@/config/landingPages';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';

import { getLandingPageBySlugAndLanguageStrict } from '../api';

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

describe('getLandingPageBySlugAndLanguageStrict', () => {
  it('should return a valid testing lp, given testing category in testing ctx', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageBySlugAndLanguageStrict(DEFAULT_LANGUAGE, targettedSlug) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });
});

vi.doUnmock('../ctx');
