/* v8 ignore start */
// Stryker disable all

import type { Href } from './Next';

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
  profilePicUrl: Href;
};

// Stryker restore all
/* v8 ignore stop */
