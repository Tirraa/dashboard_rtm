import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';

import { getBlogSubcategoriesByCategory } from '../blog';

describe('getBlogSubcategoriesByCategory', () => {
  it('should return an empty array, given an invalid category', async () => {
    // @ts-expect-error
    const emptyList = await getBlogSubcategoriesByCategory('_$!@^£µ§#', DEFAULT_LANGUAGE);
    expect(emptyList).toStrictEqual([]);
  });
});
