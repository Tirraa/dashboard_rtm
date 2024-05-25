import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingContentCategoryDatas';
import indexOfNthOccurrence from '@/lib/portable/str/indexOfNthOccurrence';
import { isRedirectError } from 'next/dist/client/components/redirect';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import BlogConfig from '@/config/Blog/server';
import ROUTES_ROOTS from '##/config/routes';

import blogPostGuard from '../blogPostGuard';

// eslint-disable-next-line no-magic-numbers
const getUrlFromDigest = (digest: string): string => digest.substring(indexOfNthOccurrence(digest, ';', 2) + 1, indexOfNthOccurrence(digest, ';', 3));

vi.mock('##/config/routes', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('##/config/routes')>();

  return {
    default: {
      ...mod.default,
      BLOG: '/blog/'
    }
  } satisfies typeof mod;
});

describe('blogPostGuard', () => {
  it('should not throw, given valid input', async () => {
    await expect(
      blogPostGuard({
        params: {
          [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
          [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
          [BlogTaxonomy.SLUG]: 'fake-post-01'
        }
      })
    ).resolves.not.toThrow();
  });

  it('should throw redirect error, given invalid slug', async () => {
    // eslint-disable-next-line no-magic-numbers
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
      expect(URLFromDigest).toBe(ROUTES_ROOTS.BLOG + BlogConfig.TESTING_CATEGORY + '/' + TESTING_BLOG_FAKE_SUBCATEGORY);
    }
  });

  it('should throw redirect error, given invalid subcategory', async () => {
    // eslint-disable-next-line no-magic-numbers
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
      expect(URLFromDigest).toBe(ROUTES_ROOTS.BLOG + BlogConfig.TESTING_CATEGORY);
    }
  });

  it('should throw redirect error, given invalid category', async () => {
    // eslint-disable-next-line no-magic-numbers
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
    // eslint-disable-next-line no-magic-numbers
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
      expect(URLFromDigest).toBe(ROUTES_ROOTS.BLOG + BlogConfig.TESTING_CATEGORY);
    }
  });

  it('should throw redirect error, given invalid slug and invalid category', async () => {
    // eslint-disable-next-line no-magic-numbers
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
    // eslint-disable-next-line no-magic-numbers
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

vi.doUnmock('##/config/routes');
