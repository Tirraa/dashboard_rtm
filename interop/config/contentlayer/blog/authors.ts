/* v8 ignore start */
// Stryker disable all

import type { Author } from '@rtm/shared-types/Blog';

const authors = {
  Gustave: {
    profilePicUrl: '/assets/medias/img/dev/placeholders/placeholder-54.jpeg'
  }
} as const satisfies Record<AuthorName, Author>;

export const authorNames = Object.keys(authors) as readonly (keyof typeof authors)[];

export default authors;

type AuthorName = string;

// Stryker restore all
/* v8 ignore stop */
