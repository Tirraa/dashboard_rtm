import { SharedVocabType, VocabType } from '@/types/i18n';

const SHARED: SharedVocabType = {
  'pages-titles': {
    homepage: 'Homepage',
    'sign-up': 'Sign up',

    'patch-notes': 'Patch Notes',
    'discord-bot': 'Discord Bot',
    dashboard: 'Dashboard',

    'patch-notes-bis': 'Patch Notes (bis)',
    'discord-bot-bis': 'Discord Bot (bis)',
    'dashboard-bis': 'Dashboard (bis)'
  }
};

export default {
  'pages-titles': { ...SHARED['pages-titles'] },

  _infos: {
    lng: 'en',
    label: 'English'
  },

  navbar: {
    assistance: 'Assistance',
    'sr-only': {
      'hamburger-menu': 'Website sections',
      'open-hamburger-menu': 'Open the navbar menu (website sections)',
      'close-hamburger-menu': 'Close the navbar menu (website sections)'
    }
  },

  auth: {
    login: 'Login',
    logout: 'Logout',
    signup: SHARED['pages-titles']['sign-up']
  },

  dashboard: {
    'pages-titles': {
      main: 'Main',
      foo: 'Foo',
      bar: 'Bar'
    }
  },

  'blog-categories': {
    'patch-notes': {
      _title: SHARED['pages-titles']['patch-notes'],
      '_meta-description': 'Patch Notes Metadescription',

      'discord-bot': {
        title: SHARED['pages-titles']['discord-bot'],
        'meta-description': 'Patch-notes -> Discord Bot - Metadescription'
      },
      dashboard: {
        title: SHARED['pages-titles']['dashboard'],
        'meta-description': 'Patch-notes -> Dashboard - Metadescription'
      }
    },

    'patch-notes-bis': {
      _title: SHARED['pages-titles']['patch-notes-bis'],
      '_meta-description': 'Metadescription Patch Notes (bis)',

      'discord-bot-bis': {
        title: SHARED['pages-titles']['discord-bot-bis'],
        'meta-description': 'Metadescription Patch-notes -> Bot Discord (bis)'
      },
      'dashboard-bis': {
        title: SHARED['pages-titles']['dashboard-bis'],
        'meta-description': 'Metadescription Patch-notes -> Dashboard (bis)'
      }
    }
  },

  vocab: {
    brand: 'Rust Team Management',
    'brand-short': 'RTM',
    'invite-the-bot': 'Invite the bot',
    'no-blog-post': 'Nobody here but us chickens!',
    '404': '404 - Page not found!',
    'see-more': 'See more!',
    loading: 'Loading...',
    'copy-to-clipboard': 'Copy to clipboard'
  },

  'manual-SEO': {
    homepage: {
      title: SHARED['pages-titles']['homepage'],
      'meta-description': 'This is the homepage metadescription'
    },

    signup: {
      title: SHARED['pages-titles']['sign-up'],
      'meta-description': 'Dashboard portal metadescription'
    }
  },

  ugly: {
    logo: 'logo'
  }
} as const satisfies VocabType;
