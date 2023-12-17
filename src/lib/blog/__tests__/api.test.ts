import { describe, expect, it } from 'vitest';
import BlogConfig from '@/config/blog';

import { getSlicedBlogPostDescription } from '../api';

describe('getSlicedBlogPostDescription', () => {
  it('should slice description, given a too long description', () => {
    const description = 'w'.repeat(BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT + 1);
    const slicedDescription = getSlicedBlogPostDescription(description);
    expect(slicedDescription.length).toBe(BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT);
  });

  it("should not slice description, given a description that doesn't exceed the limit", () => {
    const description = 'w'.repeat(BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT - 1);
    const slicedDescription = getSlicedBlogPostDescription(description);
    expect(description).toStrictEqual(slicedDescription);
  });
});
