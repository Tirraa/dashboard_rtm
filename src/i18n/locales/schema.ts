import { TypedLeafsJSONData } from '@/types/JSON';
import { LanguageFlag } from '@/types/i18n';

const STATICLY_CHECKED_DATA = {
  'blog-categories': {
    'patch-notes': {
      _title: '__SCANNED_ON_BUILD_FIELD__',
      '_meta-description': '__SCANNED_ON_BUILD_FIELD__',

      'discord-bot': {
        title: '__SCANNED_ON_BUILD_FIELD__',
        'meta-description': '__SCANNED_ON_BUILD_FIELD__'
      },
      dashboard: {
        title: '__SCANNED_ON_BUILD_FIELD__',
        'meta-description': '__SCANNED_ON_BUILD_FIELD__'
      }
    },
    'patch-notes-bis': {
      _title: '__SCANNED_ON_BUILD_FIELD__',
      '_meta-description': '__SCANNED_ON_BUILD_FIELD__',

      'discord-bot-bis': {
        title: '__SCANNED_ON_BUILD_FIELD__',
        'meta-description': '__SCANNED_ON_BUILD_FIELD__'
      },
      'dashboard-bis': {
        title: '__SCANNED_ON_BUILD_FIELD__',
        'meta-description': '__SCANNED_ON_BUILD_FIELD__'
      }
    }
  }
} as const satisfies TypedLeafsJSONData<Scanned>;

const _: NotScanned = '';

const localesLabels: LanguageLabelsSchema = {
  en: _,
  fr: _
};

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
    brand: _
  },
  localesLabels
} as const satisfies TypedLeafsJSONData<NotScanned>;

export default {
  'blog-categories': STATICLY_CHECKED_DATA['blog-categories'],
  'pages-titles': { ...SHARED_VOCAB_SCHEMA['pages-titles'] },

  _infos: {
    lng: '__SCANNED_ON_BUILD_FIELD__'
  },

  _globals: {
    localesLabels: { ...SHARED_VOCAB_SCHEMA.localesLabels }
  },

  navbar: {
    assistance: _,
    'sr-only': {
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
    brand: _,
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
      title: _,
      'meta-description': _
    },

    signup: {
      title: _,
      'meta-description': _
    }
  }
} as const satisfies TypedLeafsJSONData<MaybeScanned>;

export const localesLabelsValues: LanguageLabelsImpl = {
  en: 'English',
  fr: 'Français'
} as const;

type NotScanned = '';
type Scanned = '__SCANNED_ON_BUILD_FIELD__';
type MaybeScanned = NotScanned | Scanned;
type LanguageLabelsSchema = Record<LanguageFlag, NotScanned>;
type LanguageLabelsImpl = Record<LanguageFlag, string>;
