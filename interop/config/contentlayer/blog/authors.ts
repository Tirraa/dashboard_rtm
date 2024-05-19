/* v8 ignore start */
// Stryker disable all

const authors = {
  Gustave: {
    profilePicUrl: '/assets/medias/img/dev/placeholders/placeholder-54.jpeg'
  },
  Arnaud: {
    profilePicUrl: '/assets/medias/img/dev/placeholders/placeholder-55.jpeg'
  }
} as const satisfies Record<string, Author>;

export const authorNames = Object.keys(authors) as readonly AuthorName[];

export default authors;

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
  profilePicUrl: string;
};

export type AuthorName = keyof Authors;
export type Authors = typeof authors;

// Stryker restore all
/* v8 ignore stop */
