/* v8 ignore start */
// Stryker disable all

import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { Href } from '@rtm/shared-types/Next';
import type { ComponentType } from 'react';

import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const authors = {
  Gustave: {
    profilePictureUrl: '/assets/medias/img/dev/placeholders/placeholder-54.jpeg',
    medias: {
      github: 'https://github.com/gustaveWPM'
    }
  },

  Arnaud: {
    profilePictureUrl: '/assets/medias/img/dev/placeholders/placeholder-55.jpeg'
  }
} as const satisfies Record<string, Author>;

export const authorNames = Object.keys(authors) as readonly AuthorName[];

export const authorsEntries = Object.entries(authors);

export const AUTHORS_MEDIAS_MAPPING: Record<MediaKey, ComponentType<IconProps>> = {
  instagram: InstagramLogoIcon,
  linkedin: LinkedInLogoIcon,
  twitter: TwitterLogoIcon,
  github: GitHubLogoIcon
} as const;

export type Author = {
  medias?: {
    instagram?: Href;
    linkedin?: Href;
    twitter?: Href;
    github?: Href;
  };
  profilePictureUrl: Href;
};

export type MediaKey = keyof Required<Required<Author>['medias']>;

export type AuthorName = keyof typeof authors;

// Stryker restore all
/* v8 ignore stop */
