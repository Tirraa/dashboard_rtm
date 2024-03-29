import LandingPagesConfig from '@/config/landingPages';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';

import { getLandingPageByLanguageAndSlugStrict } from '../api';

vi.mock('../ctx', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../ctx')>();

  return {
    default: {
      ...mod.default,
      TESTING: false
    }
  } satisfies typeof mod;
});

describe('getLandingPageByLanguageAndSlugStrict (unhappy paths)', () => {
  it('should return null, given testing category in not testing ctx', () => {
    const lp = getLandingPageByLanguageAndSlugStrict({ slug: `${LandingPagesConfig.TESTING_CATEGORY}-fake-lp-00`, lang: DEFAULT_LANGUAGE });
    expect(lp).toBe(null);
  });
});

vi.doUnmock('../ctx');
