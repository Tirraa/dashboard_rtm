import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingBlogCategoryDatas';
import { isRedirectError } from 'next/dist/client/components/redirect';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { indexOfNthOccurrence } from '@/lib/str';
import { describe, expect, it } from 'vitest';
import BlogConfig from '@/config/blog';

import blogPostGuard from '../blogPostGuard';

const getUrlFromDigest = (digest: string): string => digest.substring(indexOfNthOccurrence(digest, ';', 2) + 1, indexOfNthOccurrence(digest, ';', 3));

describe('blogPostGuard', () => {
  it('should not throw, given valid input', () => {
    expect(
      async () =>
        await blogPostGuard({
          params: {
            [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
            [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
            [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
            [BlogTaxonomy.SLUG]: 'fake-post-01'
          }
        })
    ).not.toThrow();
  });

  it('should throw redirect error, given invalid slug', async () => {
    expect.assertions(2);

    try {
      await blogPostGuard({
        params: {
          [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
          [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          [BlogTaxonomy.SLUG]: '__INVALID_SLUG__'
        }
      });
    } catch (interceptedError) {
      expect(isRedirectError(interceptedError)).toBe(true);
      const URLFromDigest = getUrlFromDigest((interceptedError as any).digest);
      expect(URLFromDigest).toBe('/' + BlogConfig.TESTING_CATEGORY + '/' + TESTING_BLOG_FAKE_SUBCATEGORY);
    }
  });

  it('should throw redirect error, given invalid subcategory', async () => {
    expect.assertions(2);

    try {
      await blogPostGuard({
        params: {
          // @ts-expect-error
          [BlogTaxonomy.SUBCATEGORY]: '__INVALID_SUBCATEGORY__',
          [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          [BlogTaxonomy.SLUG]: 'fake-post-01'
        }
      });
    } catch (interceptedError) {
      expect(isRedirectError(interceptedError)).toBe(true);
      const URLFromDigest = getUrlFromDigest((interceptedError as any).digest);
      expect(URLFromDigest).toBe('/' + BlogConfig.TESTING_CATEGORY);
    }
  });

  it('should throw redirect error, given invalid category', async () => {
    expect.assertions(2);

    const category = '__INVALID_CATEGORY__';
    try {
      await blogPostGuard({
        params: {
          [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          [BlogTaxonomy.SLUG]: 'fake-post-01',
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

  it('should throw redirect error, given invalid slug and invalid subcategory', async () => {
    expect.assertions(2);

    try {
      await blogPostGuard({
        params: {
          // @ts-expect-error
          [BlogTaxonomy.SUBCATEGORY]: '__INVALID_SUBCATEGORY__',
          [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          [BlogTaxonomy.SLUG]: '__INVALID_SLUG__'
        }
      });
    } catch (interceptedError) {
      expect(isRedirectError(interceptedError)).toBe(true);
      const URLFromDigest = getUrlFromDigest((interceptedError as any).digest);
      expect(URLFromDigest).toBe('/' + BlogConfig.TESTING_CATEGORY);
    }
  });

  it('should throw redirect error, given invalid slug and invalid category', async () => {
    expect.assertions(2);

    const category = '__INVALID_CATEGORY__';
    try {
      await blogPostGuard({
        params: {
          [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          [BlogTaxonomy.SLUG]: '__INVALID_SLUG__',
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

  it('should throw redirect error, given invalid slug, invalid category, and invalid subcategory', async () => {
    expect.assertions(2);

    const category = '__INVALID_CATEGORY__';
    try {
      await blogPostGuard({
        params: {
          // @ts-expect-error
          [BlogTaxonomy.SUBCATEGORY]: '__INVALID_SUBCATEGORY__',
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          [BlogTaxonomy.SLUG]: '__INVALID_SLUG__',
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
});
