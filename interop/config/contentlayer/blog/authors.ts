/* v8 ignore start */
// Stryker disable all

import type { NestedTypeNoiseKeys } from '##/lib/misc/contentlayerCornerCases';
import type { Author as NestedTypeAuthor } from 'contentlayer/generated';

const authors = {
  Gustave: {
    profilePicUrl: '/assets/medias/img/dev/placeholders/placeholder-54.jpeg',
    bio: 'Je suis très chouette'
  },
  Arnaud: {
    profilePicUrl: '/assets/medias/img/dev/placeholders/placeholder-55.jpeg'
  }
} as const satisfies Authors;

export const authorNames = Object.keys(authors) as readonly (keyof typeof authors)[];

export default authors;

export type Author = Omit<NestedTypeAuthor, NestedTypeNoiseKeys>;
export type AuthorName = string;
export type Authors = Record<AuthorName, Author>;

// Stryker restore all
/* v8 ignore stop */
