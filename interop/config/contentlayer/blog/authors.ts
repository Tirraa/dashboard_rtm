/* v8 ignore start */
// Stryker disable all

import type { Href } from '@rtm/shared-types/Next';

const authors = {
  Gustave: {
    profilePictureUrl: '/assets/medias/img/dev/placeholders/placeholder-54.jpeg'
  },
  Arnaud: {
    profilePictureUrl: '/assets/medias/img/dev/placeholders/placeholder-55.jpeg'
  }
} as const satisfies Record<string, Author>;

export const authorNames = Object.keys(authors) as readonly AuthorName[];

export const authorsEntries = Object.entries(authors);

export type Author = {
  medias?: {
    instagram?: Href;
    goodreads?: Href;
    linkedin?: Href;
    twitter?: Href;
    keybase?: Href;
    reddit?: Href;
    medium?: Href;
    github?: Href;
  };
  profilePictureUrl: Href;
};

export type AuthorName = keyof typeof authors;

// Stryker restore all
/* v8 ignore stop */
