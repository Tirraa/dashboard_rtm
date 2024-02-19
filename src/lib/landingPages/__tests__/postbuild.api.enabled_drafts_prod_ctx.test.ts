import type { LandingPagesConfigType } from '@/config/landingPages';
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
    } satisfies LandingPagesConfigType
  };
});

describe('getLandingPageByLanguageAndSlugStrict', () => {
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

  it('should return a valid lp in an authorized drafts CTX', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-draft-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict({ slug: targettedSlug, lang: language }) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });
});

vi.doUnmock('@/config/landingPages');
