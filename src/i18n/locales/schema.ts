/* v8 ignore start */
// Stryker disable all

import type { TypedLeafsJSONData } from '@rtm/shared-types/JSON';

import { blogCategories, pagesTitles } from '@rtm/generated';

const _: NotScanned = '';

export const SHARED_VOCAB_SCHEMA = {
  vocab: {
    breadcrumbs: _,
    'sign-up': _,
    brand: _,
    logo: _,
    page: _
  },

  'pages-titles': {
    ...pagesTitles,

    homepage: _,
    blog: _
  }
} as const satisfies TypedLeafsJSONData<NotScanned>;

export default {
  navbar: {
    'sr-only': {
      'close-language-switcher-menu': _,
      'open-language-switcher-menu': _,
      'language-switcher-menu': _,
      'close-hamburger-menu': _,
      'switch-to-light-mode': _,
      'open-hamburger-menu': _,
      'switch-to-dark-mode': _,
      'hamburger-menu': _
    },
    assistance: _
  },

  vocab: {
    ...SHARED_VOCAB_SCHEMA.vocab,
    'sr-only': {
      'brand-logo': _
    },
    'copy-to-clipboard': _,
    'invite-the-bot': _,
    'no-blog-post': _,
    'brand-short': _,
    'see-more': _,
    loading: _,
    '404': _,
    prev: _,
    next: _
  },

  dashboard: {
    'sr-only': {
      'hide-sidebar': _,
      'show-sidebar': _
    },
    'pages-titles': {
      main: _,
      foo: _,
      bar: _
    }
  },

  auth: {
    logout: _,
    signup: _,
    login: _
  },

  _infos: {
    lng: '__SCANNED_ON_PREBUILD_FIELD__'
  },

  'pages-titles': SHARED_VOCAB_SCHEMA['pages-titles'],

  'blog-categories': blogCategories
} as const satisfies TypedLeafsJSONData<MaybeScanned>;

type NotScanned = '';
type Scanned = '__SCANNED_ON_PREBUILD_FIELD__';
type MaybeScanned = NotScanned | Scanned;

// Stryker restore all
/* v8 ignore stop */
