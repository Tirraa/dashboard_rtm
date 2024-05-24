/* v8 ignore start */
// Stryker disable all

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
    instagram?: undefined | string;
    goodreads?: undefined | string;
    linkedin?: undefined | string;
    twitter?: undefined | string;
    keybase?: undefined | string;
    reddit?: undefined | string;
    medium?: undefined | string;
    github?: undefined | string;
  };
  profilePictureUrl: string;
};

export type AuthorName = keyof typeof authors;

// Stryker restore all
/* v8 ignore stop */
