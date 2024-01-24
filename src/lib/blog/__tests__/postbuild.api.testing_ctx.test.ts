import type { TFakeLanguage } from '𝕍/testingBlogCategoryDatas';
import type { TBlogPost } from '@/types/Blog';

import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingBlogCategoryDatas';
import { INDEX_NEEDLE } from '##/lib/misc/contentlayerCornerCases';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import BlogConfig from '@/config/blog';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict,
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageStrict,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  isValidBlogCategoryAndSubcategoryPair,
  getAllBlogPostsByCategoryAndLanguage,
  getBlogPostPathWithoutI18nPart,
  getSlicedBlogPostDescription,
  getBlogPostStrict
} from '../api';

vi.mock('../ctx', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../ctx')>();

  return {
    default: {
      ...mod.default,
      TESTING: true
    }
  } satisfies typeof mod;
});

describe('getPostStrict', () => {
  it('should always return a valid post', async () => {
    const [category, subcategory, targettedSlug] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, 'fake-post-01' as const];
    const language = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as TBlogPost;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(targettedSlug);
    expect(post.language).toBe(language);
    expect(post.url).toBe('/' + language + ROUTES_ROOTS.BLOG + `${category}/${subcategory}/${targettedSlug}`);
  });
});

describe('getAllBlogPostsByCategoryAndSubcategoryAndLanguageStrict', () => {
  it("should return 5 posts, given the fake language 'posts'", async () => {
    const postsCollection = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageStrict(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'posts' satisfies TFakeLanguage
    );
    expect(postsCollection.length).toBe(5);
  });

  it('should return 4 posts, with the default language', async () => {
    const postsCollection = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageStrict(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      DEFAULT_LANGUAGE
    );

    expect(postsCollection.length).toBe(4);
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

  it('should be false for invalid combinations, given invalid category', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPair(
      // @ts-expect-error
      '__INVALID_CATEGORY__',
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'drafts' satisfies TFakeLanguage
    );
    expect(isValid).toBe(false);
  });

  it('should be false for invalid combinations, given invalid subcategory', async () => {
    const isValid = await isValidBlogCategoryAndSubcategoryPair(
      BlogConfig.TESTING_CATEGORY,
      // @ts-expect-error
      '__INVALID_SUBCATEGORY__',
      'drafts' satisfies TFakeLanguage
    );
    expect(isValid).toBe(false);
  });
});

describe('getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict', () => {
  it('should return empty list, given invalid combination', async () => {
    const posts = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(
      BlogConfig.TESTING_CATEGORY,
      // @ts-expect-error
      '__INVALID_SUBCATEGORY__',
      DEFAULT_LANGUAGE
    );
    expect(posts).toStrictEqual([]);
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

    expect(blogPostWithoutI18nPart).toBe(ROUTES_ROOTS.BLOG + [category, subcategory, targettedSlug].join('/'));
  });
});

describe('isValidBlogCategoryAndSubcategoryPairInAnyLanguage', () => {
  it('should return true, given a valid combination', async () => {
    const [category, subcategory] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY];
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);

    expect(isValid).toBe(true);
  });

  it('should return false, given an invalid category', async () => {
    // @ts-expect-error
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage('__INVALID_CATEGORY__', TESTING_BLOG_FAKE_SUBCATEGORY);

    expect(isValid).toBe(false);
  });

  it('should return false, given an invalid subcategory', async () => {
    // @ts-expect-error
    const isValid = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(BlogConfig.TESTING_CATEGORY, '__INVALID_SUBCATEGORY__');

    expect(isValid).toBe(false);
  });
});

describe('getSlicedBlogPostDescription', () => {
  it('should slice description, given a too long description', () => {
    const description = '$'.repeat(BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT + 1);
    const slicedDescription = getSlicedBlogPostDescription(description);
    expect(slicedDescription.length).toBe(BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT);
  });

  it("should not slice description, given a description that doesn't exceed the limit", () => {
    const description = '$'.repeat(BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT - 1);
    const slicedDescription = getSlicedBlogPostDescription(description);
    expect(description).toStrictEqual(slicedDescription);
  });
});

describe('getAllBlogPostsByCategoryAndLanguage', () => {
  it('should pass', async () => {
    const posts = (await getAllBlogPostsByCategoryAndLanguage(
      BlogConfig.TESTING_CATEGORY,
      'drafts' as const satisfies TFakeLanguage as any
    )) as TBlogPost[];

    expect(posts.length).toBe(3);

    expect(posts[0].draft).toBe(true);
    expect(posts[0].metadescription).toBe('FAKE');
    expect(posts[0].description).toBe('FAKE');
    expect(posts[0].title).toBe('FAKE');
    expect(posts[0]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-01.mdx`);
    expect(posts[0]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-01.mdx`);
    expect(posts[0]._raw.sourceFileName).toBe('fake-draft-01.mdx');
    expect(posts[0]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts`);
    expect(posts[0]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-01`);
    expect(posts[0].subcategory).toBe('fake-subcategory');
    expect(posts[0].language).toBe('drafts');
    expect(posts[0].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[0].slug).toBe('fake-draft-01');
    expect(posts[0].url).toBe('/drafts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/fake-draft-01`);

    expect(posts[1].draft).toBe(true);
    expect(posts[1].metadescription).toBe('FAKE');
    expect(posts[1].description).toBe('FAKE');
    expect(posts[1].title).toBe('FAKE');
    expect(posts[1]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-02.mdx`);
    expect(posts[1]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-02.mdx`);
    expect(posts[1]._raw.sourceFileName).toBe('fake-draft-02.mdx');
    expect(posts[1]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts`);
    expect(posts[1]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-02`);
    expect(posts[1].subcategory).toBe('fake-subcategory');
    expect(posts[1].language).toBe('drafts');
    expect(posts[1].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[1].slug).toBe('fake-draft-02');
    expect(posts[1].url).toBe('/drafts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/fake-draft-02`);

    expect(posts[2].draft).toBe(true);
    expect(posts[2].metadescription).toBe('FAKE');
    expect(posts[2].description).toBe('FAKE');
    expect(posts[2].title).toBe('FAKE');
    expect(posts[2]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-03.mdx`);
    expect(posts[2]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-03.mdx`);
    expect(posts[2]._raw.sourceFileName).toBe('fake-draft-03.mdx');
    expect(posts[2]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts`);
    expect(posts[2]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/drafts/fake-draft-03`);
    expect(posts[2].subcategory).toBe('fake-subcategory');
    expect(posts[2].language).toBe('drafts');
    expect(posts[2].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[2].slug).toBe('fake-draft-03');
    expect(posts[2].url).toBe('/drafts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/fake-draft-03`);
  });
});

describe('getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict', () => {
  it('should pass', async () => {
    const posts = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'posts' as const satisfies TFakeLanguage as any
    );

    expect(posts.length).toBe(5);

    expect(posts[0].draft).toBe(false);
    expect(posts[0].metadescription).toBe('FAKE');
    expect(posts[0].description).toBe('FAKE');
    expect(posts[0].title).toBe('FAKE');
    expect(posts[0]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-01.mdx`);
    expect(posts[0]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-01.mdx`);
    expect(posts[0]._raw.sourceFileName).toBe('fake-post-01.mdx');
    expect(posts[0]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts`);
    expect(posts[0]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-01`);
    expect(posts[0].subcategory).toBe('fake-subcategory');
    expect(posts[0].language).toBe('posts');
    expect(posts[0].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[0].slug).toBe('fake-post-01');
    expect(posts[0].url).toBe('/posts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/fake-post-01`);

    expect(posts[1].draft).toBe(false);
    expect(posts[1].metadescription).toBe('FAKE');
    expect(posts[1].description).toBe('FAKE');
    expect(posts[1].title).toBe('FAKE');
    expect(posts[1]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-02.mdx`);
    expect(posts[1]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-02.mdx`);
    expect(posts[1]._raw.sourceFileName).toBe('fake-post-02.mdx');
    expect(posts[1]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts`);
    expect(posts[1]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-02`);
    expect(posts[1].subcategory).toBe('fake-subcategory');
    expect(posts[1].language).toBe('posts');
    expect(posts[1].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[1].slug).toBe('fake-post-02');
    expect(posts[1].url).toBe('/posts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/fake-post-02`);

    expect(posts[2].draft).toBe(false);
    expect(posts[2].metadescription).toBe('FAKE');
    expect(posts[2].description).toBe('FAKE');
    expect(posts[2].title).toBe('FAKE');
    expect(posts[2]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-03.mdx`);
    expect(posts[2]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-03.mdx`);
    expect(posts[2]._raw.sourceFileName).toBe('fake-post-03.mdx');
    expect(posts[2]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts`);
    expect(posts[2]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-03`);
    expect(posts[2].subcategory).toBe('fake-subcategory');
    expect(posts[2].language).toBe('posts');
    expect(posts[2].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[2].slug).toBe('fake-post-03');
    expect(posts[2].url).toBe('/posts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/fake-post-03`);

    expect(posts[3].draft).toBe(false);
    expect(posts[3].metadescription).toBe('FAKE');
    expect(posts[3].description).toBe('FAKE');
    expect(posts[3].title).toBe('FAKE');
    expect(posts[3]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-04.mdx`);
    expect(posts[3]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-04.mdx`);
    expect(posts[3]._raw.sourceFileName).toBe('fake-post-04.mdx');
    expect(posts[3]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts`);
    expect(posts[3]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/fake-post-04`);
    expect(posts[3].subcategory).toBe('fake-subcategory');
    expect(posts[3].language).toBe('posts');
    expect(posts[3].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[3].slug).toBe('fake-post-04');
    expect(posts[3].url).toBe('/posts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/fake-post-04`);

    expect(posts[4].draft).toBe(false);
    expect(posts[4].metadescription).toBe('FAKE');
    expect(posts[4].description).toBe('FAKE');
    expect(posts[4].title).toBe('FAKE');
    expect(posts[4]._id).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/${INDEX_NEEDLE}.mdx`);
    expect(posts[4]._raw.sourceFilePath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts/${INDEX_NEEDLE}.mdx`);
    expect(posts[4]._raw.sourceFileName).toBe(`${INDEX_NEEDLE}.mdx`);
    expect(posts[4]._raw.sourceFileDir).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts`);
    expect(posts[4]._raw.flattenedPath).toBe(`blog/${BlogConfig.TESTING_CATEGORY}/fake-subcategory/posts`);
    expect(posts[4].subcategory).toBe('fake-subcategory');
    expect(posts[4].language).toBe('posts');
    expect(posts[4].category).toBe(BlogConfig.TESTING_CATEGORY);
    expect(posts[4].slug).toBe(`${INDEX_NEEDLE}`);
    expect(posts[4].url).toBe('/posts' + ROUTES_ROOTS.BLOG + `${BlogConfig.TESTING_CATEGORY}/fake-subcategory/${INDEX_NEEDLE}`);
  });
});

vi.doUnmock('../ctx');
