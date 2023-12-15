import blogCategories from '@rtm/generated/blogCategories';
import type { TypedLeafsJSONData } from '@rtm/shared-types/JSON';

const _: NotScanned = '';

export const SHARED_VOCAB_SCHEMA = {
  'pages-titles': {
    homepage: _,
    'sign-up': _,

    'patch-notes': _,
    'discord-bot': _,
    dashboard: _,

    'patch-notes-bis': _,
    'discord-bot-bis': _,
    'dashboard-bis': _
  },
  vocab: {
    logo: _,
    brand: _,
    page: _,
    breadcrumbs: _
  }
} as const satisfies TypedLeafsJSONData<NotScanned>;

export default {
  'blog-categories': blogCategories,
  'pages-titles': { ...SHARED_VOCAB_SCHEMA['pages-titles'] },

  _infos: {
    lng: '__SCANNED_ON_BUILD_FIELD__'
  },

  navbar: {
    assistance: _,
    'sr-only': {
      'language-switcher-menu': _,
      'open-language-switcher-menu': _,
      'close-language-switcher-menu': _,
      'hamburger-menu': _,
      'open-hamburger-menu': _,
      'close-hamburger-menu': _,
      'switch-to-light-mode': _,
      'switch-to-dark-mode': _
    }
  },

  auth: {
    login: _,
    logout: _,
    signup: _
  },

  dashboard: {
    'pages-titles': {
      main: _,
      foo: _,
      bar: _
    },
    'sr-only': {
      'hide-sidebar': _,
      'show-sidebar': _
    }
  },

  vocab: {
    ...SHARED_VOCAB_SCHEMA.vocab,
    'brand-short': _,
    'invite-the-bot': _,
    'no-blog-post': _,
    '404': _,
    'see-more': _,
    loading: _,
    prev: _,
    next: _,
    'copy-to-clipboard': _,
    'sr-only': {
      'brand-logo': _
    }
  },

  'manual-SEO': {
    homepage: {
      'meta-description': _
    },

    signup: {
      'meta-description': _
    }
  }
} as const satisfies TypedLeafsJSONData<MaybeScanned>;

type NotScanned = '';
type Scanned = '__SCANNED_ON_BUILD_FIELD__';
type MaybeScanned = NotScanned | Scanned;
