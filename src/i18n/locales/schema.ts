import type { TypedLeafsJSONData } from '@rtm/shared-types/JSON';

import blogCategories from '@rtm/generated/blogCategories';

const _: NotScanned = '';

export const SHARED_VOCAB_SCHEMA = {
  'pages-titles': {
    'patch-notes-bis': _,
    'discord-bot-bis': _,

    'dashboard-bis': _,
    'patch-notes': _,
    'discord-bot': _,

    'sign-up': _,
    dashboard: _,
    homepage: _
  },
  vocab: {
    breadcrumbs: _,
    brand: _,
    logo: _,
    page: _
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

  'manual-SEO': {
    homepage: {
      'meta-description': _
    },

    signup: {
      'meta-description': _
    }
  },

  auth: {
    logout: _,
    signup: _,
    login: _
  },

  'pages-titles': SHARED_VOCAB_SCHEMA['pages-titles'],

  _infos: {
    lng: '__SCANNED_ON_BUILD_FIELD__'
  },

  'blog-categories': blogCategories
} as const satisfies TypedLeafsJSONData<MaybeScanned>;

type NotScanned = '';
type Scanned = '__SCANNED_ON_BUILD_FIELD__';
type MaybeScanned = NotScanned | Scanned;
