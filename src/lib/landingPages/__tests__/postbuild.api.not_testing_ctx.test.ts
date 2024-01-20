import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';

import { getLandingPageBySlugAndLanguageStrict } from '../api';

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

describe('getLandingPageBySlugAndLanguageStrict', () => {
  it('should return null, given testing category in not testing ctx', () => {
    const lp = getLandingPageBySlugAndLanguageStrict(DEFAULT_LANGUAGE, 'testing-fake-lp-00');
    expect(lp).toBe(null);
  });
});

vi.doUnmock('../ctx');
