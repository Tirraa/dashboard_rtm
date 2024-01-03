import type { TFakeLanguage } from '𝕍/testingBlogCategoryDatas';
import type { TBlogPost } from '@/types/Blog';

import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingBlogCategoryDatas';
import { describe, expect, it } from 'vitest';
import BlogConfig from '@/config/blog';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict,
  getAllBlogPostsByCategoryAndLanguage,
  getSlicedBlogPostDescription
} from '../api';

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
  it('should pass (too lazy to snapshot it properly)', async () => {
    const posts = (await getAllBlogPostsByCategoryAndLanguage(
      BlogConfig.TESTING_CATEGORY,
      'drafts' as const satisfies TFakeLanguage as any
    )) as TBlogPost[];

    expect(posts.length).toBe(3);

    expect(posts[0].draft).toBe(true);
    expect(posts[0].metadescription).toBe('FAKE');
    expect(posts[0].description).toBe('FAKE');
    expect(posts[0].title).toBe('FAKE');
    expect(posts[0]._id).toBe('blog/testing/fake-subcategory/drafts/fake-draft-01.mdx');
    expect(posts[0]._raw.sourceFilePath).toBe('blog/testing/fake-subcategory/drafts/fake-draft-01.mdx');
    expect(posts[0]._raw.sourceFileName).toBe('fake-draft-01.mdx');
    expect(posts[0]._raw.sourceFileDir).toBe('blog/testing/fake-subcategory/drafts');
    expect(posts[0]._raw.contentType).toBe('mdx');
    expect(posts[0]._raw.flattenedPath).toBe('blog/testing/fake-subcategory/drafts/fake-draft-01');
    expect(posts[0].subcategory).toBe('fake-subcategory');
    expect(posts[0].language).toBe('drafts');
    expect(posts[0].category).toBe('testing');
    expect(posts[0].slug).toBe('fake-draft-01');
    expect(posts[0].url).toBe('/drafts/testing/fake-subcategory/fake-draft-01');

    expect(posts[1].draft).toBe(true);
    expect(posts[1].metadescription).toBe('FAKE');
    expect(posts[1].description).toBe('FAKE');
    expect(posts[1].title).toBe('FAKE');
    expect(posts[1]._id).toBe('blog/testing/fake-subcategory/drafts/fake-draft-02.mdx');
    expect(posts[1]._raw.sourceFilePath).toBe('blog/testing/fake-subcategory/drafts/fake-draft-02.mdx');
    expect(posts[1]._raw.sourceFileName).toBe('fake-draft-02.mdx');
    expect(posts[1]._raw.sourceFileDir).toBe('blog/testing/fake-subcategory/drafts');
    expect(posts[1]._raw.contentType).toBe('mdx');
    expect(posts[1]._raw.flattenedPath).toBe('blog/testing/fake-subcategory/drafts/fake-draft-02');
    expect(posts[1].subcategory).toBe('fake-subcategory');
    expect(posts[1].language).toBe('drafts');
    expect(posts[1].category).toBe('testing');
    expect(posts[1].slug).toBe('fake-draft-02');
    expect(posts[1].url).toBe('/drafts/testing/fake-subcategory/fake-draft-02');

    expect(posts[2].draft).toBe(true);
    expect(posts[2].metadescription).toBe('FAKE');
    expect(posts[2].description).toBe('FAKE');
    expect(posts[2].title).toBe('FAKE');
    expect(posts[2]._id).toBe('blog/testing/fake-subcategory/drafts/fake-draft-03.mdx');
    expect(posts[2]._raw.sourceFilePath).toBe('blog/testing/fake-subcategory/drafts/fake-draft-03.mdx');
    expect(posts[2]._raw.sourceFileName).toBe('fake-draft-03.mdx');
    expect(posts[2]._raw.sourceFileDir).toBe('blog/testing/fake-subcategory/drafts');
    expect(posts[2]._raw.contentType).toBe('mdx');
    expect(posts[2]._raw.flattenedPath).toBe('blog/testing/fake-subcategory/drafts/fake-draft-03');
    expect(posts[2].subcategory).toBe('fake-subcategory');
    expect(posts[2].language).toBe('drafts');
    expect(posts[2].category).toBe('testing');
    expect(posts[2].slug).toBe('fake-draft-03');
    expect(posts[2].url).toBe('/drafts/testing/fake-subcategory/fake-draft-03');
  });
});

describe('getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict', () => {
  it('should pass (too lazy to snapshot it properly)', async () => {
    const posts = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'posts' as const satisfies TFakeLanguage as any
    );

    expect(posts.length).toBe(4);

    expect(posts[0].draft).toBe(false);
    expect(posts[0].metadescription).toBe('FAKE');
    expect(posts[0].description).toBe('FAKE');
    expect(posts[0].title).toBe('FAKE');
    expect(posts[0]._id).toBe('blog/testing/fake-subcategory/posts/fake-post-01.mdx');
    expect(posts[0]._raw.sourceFilePath).toBe('blog/testing/fake-subcategory/posts/fake-post-01.mdx');
    expect(posts[0]._raw.sourceFileName).toBe('fake-post-01.mdx');
    expect(posts[0]._raw.sourceFileDir).toBe('blog/testing/fake-subcategory/posts');
    expect(posts[0]._raw.contentType).toBe('mdx');
    expect(posts[0]._raw.flattenedPath).toBe('blog/testing/fake-subcategory/posts/fake-post-01');
    expect(posts[0].subcategory).toBe('fake-subcategory');
    expect(posts[0].language).toBe('posts');
    expect(posts[0].category).toBe('testing');
    expect(posts[0].slug).toBe('fake-post-01');
    expect(posts[0].url).toBe('/posts/testing/fake-subcategory/fake-post-01');

    expect(posts[1].draft).toBe(false);
    expect(posts[1].metadescription).toBe('FAKE');
    expect(posts[1].description).toBe('FAKE');
    expect(posts[1].title).toBe('FAKE');
    expect(posts[1]._id).toBe('blog/testing/fake-subcategory/posts/fake-post-02.mdx');
    expect(posts[1]._raw.sourceFilePath).toBe('blog/testing/fake-subcategory/posts/fake-post-02.mdx');
    expect(posts[1]._raw.sourceFileName).toBe('fake-post-02.mdx');
    expect(posts[1]._raw.sourceFileDir).toBe('blog/testing/fake-subcategory/posts');
    expect(posts[1]._raw.contentType).toBe('mdx');
    expect(posts[1]._raw.flattenedPath).toBe('blog/testing/fake-subcategory/posts/fake-post-02');
    expect(posts[1].subcategory).toBe('fake-subcategory');
    expect(posts[1].language).toBe('posts');
    expect(posts[1].category).toBe('testing');
    expect(posts[1].slug).toBe('fake-post-02');
    expect(posts[1].url).toBe('/posts/testing/fake-subcategory/fake-post-02');

    expect(posts[2].draft).toBe(false);
    expect(posts[2].metadescription).toBe('FAKE');
    expect(posts[2].description).toBe('FAKE');
    expect(posts[2].title).toBe('FAKE');
    expect(posts[2]._id).toBe('blog/testing/fake-subcategory/posts/fake-post-03.mdx');
    expect(posts[2]._raw.sourceFilePath).toBe('blog/testing/fake-subcategory/posts/fake-post-03.mdx');
    expect(posts[2]._raw.sourceFileName).toBe('fake-post-03.mdx');
    expect(posts[2]._raw.sourceFileDir).toBe('blog/testing/fake-subcategory/posts');
    expect(posts[2]._raw.contentType).toBe('mdx');
    expect(posts[2]._raw.flattenedPath).toBe('blog/testing/fake-subcategory/posts/fake-post-03');
    expect(posts[2].subcategory).toBe('fake-subcategory');
    expect(posts[2].language).toBe('posts');
    expect(posts[2].category).toBe('testing');
    expect(posts[2].slug).toBe('fake-post-03');
    expect(posts[2].url).toBe('/posts/testing/fake-subcategory/fake-post-03');

    expect(posts[3].draft).toBe(false);
    expect(posts[3].metadescription).toBe('FAKE');
    expect(posts[3].description).toBe('FAKE');
    expect(posts[3].title).toBe('FAKE');
    expect(posts[3]._id).toBe('blog/testing/fake-subcategory/posts/fake-post-04.mdx');
    expect(posts[3]._raw.sourceFilePath).toBe('blog/testing/fake-subcategory/posts/fake-post-04.mdx');
    expect(posts[3]._raw.sourceFileName).toBe('fake-post-04.mdx');
    expect(posts[3]._raw.sourceFileDir).toBe('blog/testing/fake-subcategory/posts');
    expect(posts[3]._raw.contentType).toBe('mdx');
    expect(posts[3]._raw.flattenedPath).toBe('blog/testing/fake-subcategory/posts/fake-post-04');
    expect(posts[3].subcategory).toBe('fake-subcategory');
    expect(posts[3].language).toBe('posts');
    expect(posts[3].category).toBe('testing');
    expect(posts[3].slug).toBe('fake-post-04');
    expect(posts[3].url).toBe('/posts/testing/fake-subcategory/fake-post-04');
  });
});
