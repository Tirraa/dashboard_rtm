import { DEFAULT_LANGUAGE } from '##/config/i18n';
import type { PostBase } from '@/types/Blog';
import { describe, expect, it } from 'vitest';
import { getBlogPostStrict } from '../api';

describe('getPostStrict', () => {
  it('[POSTBUILD] should always return a valid post', async () => {
    const [category, subcategory, targettedSlug] = ['testing' as const, 'fake-subcategory' as const, 'fake-post' as const];
    const language = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as PostBase;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(targettedSlug);
    expect(post.language).toBe(language);
    expect(post.url).toBe(`/${language}/${category}/${subcategory}/${targettedSlug}`);
  });
});
