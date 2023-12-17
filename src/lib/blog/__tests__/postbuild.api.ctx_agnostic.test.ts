import type { PostBase } from '@/types/Blog';

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
  it('[POSTBUILD] should always return a valid post', async () => {
    const [category, subcategory, targettedSlug] = [BlogConfig.TESTING_CATEGORY, 'fake-subcategory' as const, 'fake-post-01' as const];
    const language = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as PostBase;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(targettedSlug);
    expect(post.language).toBe(language);
    expect(post.url).toBe(`/${language}/${category}/${subcategory}/${targettedSlug}`);
  });
});

describe('getBlogPostFormattedDate', () => {
  it('[POSTBUILD] should return date without time, given valid ISO Date String with null timestamp', () => {
    expect(getBlogPostFormattedDate('fr' as any, '2021-12-24T00:00:00.000Z')).toBe('Vendredi 24 décembre 2021');
  });
});

describe('getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict', () => {
  it("[POSTBUILD] should return 4 posts, given the fake language 'posts'", async () => {
    const postsCollection = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict(
      BlogConfig.TESTING_CATEGORY,
      'fake-subcategory',
      'posts'
    );
    expect(postsCollection.length).toBe(4);
  });

  it('[POSTBUILD] should return 3 posts, with the default language', async () => {
    const postsCollection = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict(
      BlogConfig.TESTING_CATEGORY,
      'fake-subcategory',
      DEFAULT_LANGUAGE
    );

    expect(postsCollection.length).toBe(3);
  });
});

describe('isValidBlogCategoryAndSubcategoryPair', () => {
  it('[POSTBUILD] should be true for valid combinations', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPair(BlogConfig.TESTING_CATEGORY, 'fake-subcategory', 'drafts' as any);
    expect(isValid).toBe(true);
  });

  it('[POSTBUILD] should be false for invalid combinations', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPair('__HELLO##W@RLD' as any, 'fake-subcategory', 'drafts' as any);
    expect(isValid).toBe(false);
  });
});

describe('getBlogPostPathWithoutI18nPart', () => {
  it('[POSTBUILD] should return the path without its language part', async () => {
    const [category, subcategory, language, targettedSlug] = [
      BlogConfig.TESTING_CATEGORY,
      'fake-subcategory' as const,
      'posts' as const,
      'fake-post-03' as const
    ];

    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as PostBase;
    const blogPostWithoutI18nPart = getBlogPostPathWithoutI18nPart(post);

    expect(blogPostWithoutI18nPart).toBe('/' + [category, subcategory, targettedSlug].join('/'));
  });
});

describe('isValidBlogCategoryAndSubcategoryPairInAnyLanguage', () => {
  it('[POSTBUILD] should return true, given a valid combination', async () => {
    const [category, subcategory] = [BlogConfig.TESTING_CATEGORY, 'fake-subcategory' as const];
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);

    expect(isValid).toBe(true);
  });

  it('[POSTBUILD] should return false, given an invalid combination (invalid category)', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage('_%#@!$£µ' as any, 'fake-subcategory');

    expect(isValid).toBe(false);
  });

  it('[POSTBUILD] should return false, given an invalid combination (invalid subcategory)', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(BlogConfig.TESTING_CATEGORY, '_%#@!$£µ' as any);

    expect(isValid).toBe(false);
  });

  it('[POSTBUILD] should return false, given an invalid combination (both invalid)', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage('_%#@!$£µ' as any, '_%#@!$£µ' as any);

    expect(isValid).toBe(false);
  });
});
