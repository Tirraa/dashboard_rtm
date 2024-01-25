import type { TBlogFakeLanguage } from '𝕍/testingBlogCategoryDatas';

import { describe, expect, it } from 'vitest';

import { isValidBlogCategoryAndSubcategoryPairInAnyLanguage, isValidBlogCategoryAndSubcategoryPair, getBlogPostFormattedDate } from '../api';

describe('getBlogPostFormattedDate', () => {
  it('should return date without time, given valid ISO Date String with null timestamp', () => {
    expect(getBlogPostFormattedDate('fr' as any, '2021-12-24T00:00:00.000Z')).toBe('Vendredi 24 décembre 2021');
  });
});

describe('isValidBlogCategoryAndSubcategoryPair', () => {
  it('should be false for invalid combinations, given invalid category and subcategory', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPair(
      // @ts-expect-error
      '__INVALID_CATEGORY__',
      '__INVALID_SUBCATEGORY__',
      'drafts' satisfies TBlogFakeLanguage
    );
    expect(isValid).toBe(false);
  });
});

describe('isValidBlogCategoryAndSubcategoryPairInAnyLanguage', () => {
  it('should return false, given an invalid category and subcategory', async () => {
    // @ts-expect-error
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage('__INVALID_CATEGORY__', '__INVALID_SUBCATEGORY__');

    expect(isValid).toBe(false);
  });
});
