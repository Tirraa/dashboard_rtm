/* v8 ignore start */
// Stryker disable all

import { defineNestedType } from '../adapters';

const Medias = defineNestedType(() => ({
  fields: {
    instagram: { required: false, type: 'string' },
    goodreads: { required: false, type: 'string' },
    linkedin: { required: false, type: 'string' },
    twitter: { required: false, type: 'string' },
    keybase: { required: false, type: 'string' },
    reddit: { required: false, type: 'string' },
    medium: { required: false, type: 'string' },
    github: { required: false, type: 'string' }
  }
}));

const Author = defineNestedType(() => ({
  fields: {
    medias: {
      required: false,
      type: 'nested',
      of: Medias
    },
    profilePicUrl: { required: true, type: 'string' }
  },

  name: 'Author'
}));

export default Author;

// Stryker restore all
/* v8 ignore stop */
