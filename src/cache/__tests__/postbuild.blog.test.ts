import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';

import { getBlogSubcategoriesByCategory } from '../blog';

describe('getBlogSubcategoriesByCategory (unhappy paths)', () => {
  it('should return an empty array, given an invalid category', async () => {
    // @ts-expect-error
    const emptyList = await getBlogSubcategoriesByCategory('__INVALID_CATEGORY__', DEFAULT_LANGUAGE);
    expect(emptyList).toStrictEqual([]);
  });
});
