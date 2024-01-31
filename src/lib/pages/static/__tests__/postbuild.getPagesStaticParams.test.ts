import { TESTING_PAGES_FAKE_LANGUAGES } from '𝕍/testingBlogCategoryDatas';
import { describe, expect, it, vi } from 'vitest';

import getPagesStaticParams from '../getPagesStaticParams';

vi.mock('../../../../../interop/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../../../../../interop/config/i18n')>();
  return {
    ...mod,
    LANGUAGES: [mod.DEFAULT_LANGUAGE, ...TESTING_PAGES_FAKE_LANGUAGES]
  };
});

describe('getPagesStaticParams', () => {
  it('should return static params according to the filetree', () => {
    const staticParams = getPagesStaticParams();

    expect(staticParams).toStrictEqual([
      { path: ['page-00'], locale: 'fr' },
      { path: ['page-01'], locale: 'fr' },
      { path: ['page-00'], locale: 'en' },
      { path: ['nesting-1', 'page-00'], locale: 'fr' },
      { path: ['nesting-1', 'page-01'], locale: 'fr' },
      { path: ['testing-pages-root', 'fake-page-00'], locale: 'fr' },
      { path: ['nesting-1', 'page-00'], locale: 'en' },
      { path: ['nesting-1', 'nesting-2', 'page-00'], locale: 'fr' },
      { path: ['nesting-1', 'nesting-2', 'page-01'], locale: 'fr' },
      { path: ['testing-pages-root', 'fake-nesting'], locale: 'fr' },
      { path: ['nesting-1', 'nesting-2', 'page-00'], locale: 'en' }
    ]);
  });
});

vi.doUnmock('../../../../../interop/config/i18n');
