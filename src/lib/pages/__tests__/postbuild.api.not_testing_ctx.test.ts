import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';
import PagesConfig from '@/config/pages';

import { getPageByLanguageAndPathStrict } from '../api';

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

describe('getPageByLanguageAndPathStrict (unhappy paths)', () => {
  it('should return null, given testing path in not testing ctx', () => {
    const page = getPageByLanguageAndPathStrict({ path: `${PagesConfig.TESTING_ROOT}/fake-page-00`, lang: DEFAULT_LANGUAGE });
    expect(page).toBe(null);
  });
});

vi.doUnmock('../ctx');
