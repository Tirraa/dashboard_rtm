import type { TLandingPagesConfig } from '@/config/landingPages';
import type { LandingPage } from 'contentlayer/generated';

import LandingPagesConfig from '@/config/landingPages';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';

import { getLandingPageByLanguageAndSlugStrict } from '../api';

vi.mock('@/config/landingPages', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/landingPages')>();

  return {
    default: {
      ...mod.default,
      ENABLE_DRAFTS_IN_PROD: true
    } satisfies TLandingPagesConfig
  };
});

describe('getLandingPageByLanguageAndSlugStrict', () => {
  it('should always return a valid lp', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict(DEFAULT_LANGUAGE, targettedSlug) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });

  it('should always return NULL when picking a draft lp in an unauthorized drafts CTX', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-draft-lp-00` as const;
    const lp = getLandingPageByLanguageAndSlugStrict(DEFAULT_LANGUAGE, targettedSlug) as LandingPage;
    const language = DEFAULT_LANGUAGE;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });
});

vi.doUnmock('@/config/landingPages');
