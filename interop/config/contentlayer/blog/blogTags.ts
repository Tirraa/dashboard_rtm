const _blogTagOptions = ['tag_one', 'tag_two', 'tag_three'] as const satisfies string[];

export const blogTagOptions = [..._blogTagOptions].sort() as readonly BlogTag[];

export type BlogTag = (typeof _blogTagOptions)[number];
