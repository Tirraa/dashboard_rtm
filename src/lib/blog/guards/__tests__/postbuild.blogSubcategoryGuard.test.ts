import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingContentCategoryDatas';
import { isRedirectError } from 'next/dist/client/components/redirect';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { indexOfNthOccurrence } from '@/lib/str';
import { describe, expect, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';
import BlogConfig from '@/config/blog';

import blogSubcategoryGuard from '../blogSubcategoryGuard';

// eslint-disable-next-line no-magic-numbers
const getUrlFromDigest = (digest: string): string => digest.substring(indexOfNthOccurrence(digest, ';', 2) + 1, indexOfNthOccurrence(digest, ';', 3));

describe('blogSubcategoryGuard', () => {
  it('should not throw redirect error, given valid category and subcategory', async () => {
    await expect(
      blogSubcategoryGuard({
        params: {
          [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
          [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE
        }
      })
    ).resolves.not.toThrow();
  });

  it('should throw redirect error, given invalid category and subcategory', async () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(2);

    const category = '__INVALID_CATEGORY__';
    try {
      await blogSubcategoryGuard({
        params: {
          // @ts-expect-error
          [BlogTaxonomy.SUBCATEGORY]: '__INVALID_SUBCATEGORY__',
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          // @ts-expect-error
          [BlogTaxonomy.CATEGORY]: category
        }
      });
    } catch (interceptedError) {
      expect(isRedirectError(interceptedError)).toBe(true);
      const URLFromDigest = getUrlFromDigest((interceptedError as any).digest);
      expect(URLFromDigest).toBe('/' + category);
    }
  });

  it('should throw redirect error, given valid category and invalid subcategory', async () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(2);

    try {
      await blogSubcategoryGuard({
        params: {
          // @ts-expect-error
          [BlogTaxonomy.SUBCATEGORY]: '__INVALID_SUBCATEGORY__',
          [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE
        }
      });
    } catch (interceptedError) {
      expect(isRedirectError(interceptedError)).toBe(true);
      const URLFromDigest = getUrlFromDigest((interceptedError as any).digest);
      expect(URLFromDigest).toBe(ROUTES_ROOTS.BLOG + BlogConfig.TESTING_CATEGORY);
    }
  });
});
