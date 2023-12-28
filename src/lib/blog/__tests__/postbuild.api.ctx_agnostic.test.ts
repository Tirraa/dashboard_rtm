import type { TFakeLanguage } from '𝕍/testingBlogCategoryDatas';
import type { TBlogPost } from '@/types/Blog';

import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingBlogCategoryDatas';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';
import BlogConfig from '@/config/blog';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  isValidBlogCategoryAndSubcategoryPair,
  getBlogPostPathWithoutI18nPart,
  getBlogPostFormattedDate,
  getBlogPostStrict
} from '../api';

describe('getPostStrict', () => {
  it('should always return a valid post', async () => {
    const [category, subcategory, targettedSlug] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, 'fake-post-01' as const];
    const language = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as TBlogPost;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(targettedSlug);
    expect(post.language).toBe(language);
    expect(post.url).toBe(`/${language}/${category}/${subcategory}/${targettedSlug}`);
  });
});

describe('getBlogPostFormattedDate', () => {
  it('should return date without time, given valid ISO Date String with null timestamp', () => {
    expect(getBlogPostFormattedDate('fr' as any, '2021-12-24T00:00:00.000Z')).toBe('Vendredi 24 décembre 2021');
  });
});

describe('getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict', () => {
  it("should return 4 posts, given the fake language 'posts'", async () => {
    const postsCollection = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'posts' satisfies TFakeLanguage
    );
    expect(postsCollection.length).toBe(4);
  });

  it('should return 3 posts, with the default language', async () => {
    const postsCollection = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      DEFAULT_LANGUAGE
    );

    expect(postsCollection.length).toBe(3);
  });
});

describe('isValidBlogCategoryAndSubcategoryPair', () => {
  it('should be true for valid combinations', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPair(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'drafts' satisfies TFakeLanguage as any
    );
    expect(isValid).toBe(true);
  });

  it('should be false for invalid combinations', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPair(
      '__HELLO##W@RLD' as any,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'drafts' satisfies TFakeLanguage as any
    );
    expect(isValid).toBe(false);
  });
});

describe('getBlogPostPathWithoutI18nPart', () => {
  it('should return the path without its language part', async () => {
    const [category, subcategory, language, targettedSlug] = [
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'posts' as const satisfies TFakeLanguage,
      'fake-post-03' as const
    ];

    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as TBlogPost;
    const blogPostWithoutI18nPart = getBlogPostPathWithoutI18nPart(post);

    expect(blogPostWithoutI18nPart).toBe('/' + [category, subcategory, targettedSlug].join('/'));
  });
});

describe('isValidBlogCategoryAndSubcategoryPairInAnyLanguage', () => {
  it('should return true, given a valid combination', async () => {
    const [category, subcategory] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY];
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);

    expect(isValid).toBe(true);
  });

  it('should return false, given an invalid combination (invalid category)', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage('_%#@!$£µ' as any, TESTING_BLOG_FAKE_SUBCATEGORY);

    expect(isValid).toBe(false);
  });

  it('should return false, given an invalid combination (invalid subcategory)', async () => {
    // @ts-expect-error
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(BlogConfig.TESTING_CATEGORY, '_%#@!$£µ');

    expect(isValid).toBe(false);
  });

  it('should return false, given an invalid combination (both invalid)', async () => {
    // @ts-expect-error
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage('_%#@!$£µ', '_%#@!$£µ');

    expect(isValid).toBe(false);
  });
});
