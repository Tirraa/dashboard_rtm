import { TypedLeafsJSONData } from '@/types/JSON';

const _ = '';

export const SHARED = {
  'pages-titles': {
    homepage: _,
    'sign-up': _,

    'patch-notes': _,
    'discord-bot': _,
    dashboard: _,

    'patch-notes-bis': _,
    'discord-bot-bis': _,
    'dashboard-bis': _
  }
} as const;

export default {
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
  },

  'pages-titles': { ...SHARED['pages-titles'] },

  _infos: {
    lng: _,
    label: _
  },

  navbar: {
    assistance: _
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
    }
  },

  vocab: {
    brand: _,
    'brand-short': _,
    'invite-the-bot': _,
    'no-blog-post': _,
    '404': _,
    'see-more': _,
    loading: _
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
  },

  ugly: {
    logo: _
  }
} as const satisfies TypedLeafsJSONData<'' | '__SCANNED_ON_BUILD_FIELD__'>;
