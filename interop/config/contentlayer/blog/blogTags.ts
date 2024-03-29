import type { Index } from '@rtm/shared-types/Numbers';

const _blogTagOptions = ['xylophone', 'cello', 'bagpipes', 'drums'] as const satisfies string[];

export const blogTagOptions = [..._blogTagOptions].sort() as readonly BlogTag[];

export type BlogTag = (typeof _blogTagOptions)[Index];
