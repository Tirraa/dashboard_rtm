import { SharedVocabType, VocabType } from '@/types/i18n';

const SHARED: SharedVocabType = {
  'patch-notes': 'Patch Notes',
  'discord-bot': 'Discord Bot',
  dashboard: 'Dashboard',

  'patch-notes-bis': 'Patch Notes (bis)',
  'discord-bot-bis': 'Discord Bot (bis)',
  'dashboard-bis': 'Dashboard (bis)'
};

export default {
  _infos: {
    lng: 'en',
    label: 'English'
  },

  navbar: {
    assistance: 'Assistance'
  },

  auth: {
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign up'
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
      _title: SHARED['patch-notes'],
      '_meta-description': 'Patch Notes Metadescription',

      'discord-bot': {
        title: SHARED['discord-bot'],
        'meta-description': 'Patch-notes -> Discord Bot - Metadescription'
      },
      dashboard: {
        title: SHARED['dashboard'],
        'meta-description': 'Patch-notes -> Dashboard - Metadescription'
      }
    },

    'patch-notes-bis': {
      _title: SHARED['patch-notes-bis'],
      '_meta-description': 'Metadescription Patch Notes (bis)',

      'discord-bot-bis': {
        title: SHARED['discord-bot-bis'],
        'meta-description': 'Metadescription Patch-notes -> Bot Discord (bis)'
      },
      'dashboard-bis': {
        title: SHARED['dashboard-bis'],
        'meta-description': 'Metadescription Patch-notes -> Dashboard (bis)'
      }
    }
  },

  vocab: {
    ...SHARED,
    brand: 'Rust Team Management',
    'brand-short': 'RTM',
    'invite-the-bot': 'Invite the bot',
    'no-blog-post': 'Nobody here but us chickens!',
    '404': '404 - Page not found!',
    'see-more': 'See more!',
    loading: 'Loading...'
  },

  'manual-SEO': {
    homepage: {
      title: 'Homepage',
      'meta-description': 'This is the homepage metadescription'
    },

    signup: {
      title: 'Sign up',
      'meta-description': 'Dashboard portal metadescription'
    }
  },

  ugly: {
    logo: 'logo'
  }
} as const satisfies VocabType;
