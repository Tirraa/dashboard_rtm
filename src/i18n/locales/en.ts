import { VocabType } from '@/types/i18n';

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
      _title: 'Patch Notes',
      '_meta-description': 'Patch Notes Metadescription',

      'discord-bot': {
        title: 'Discord Bot',
        'meta-description': 'Patch-notes -> Discord Bot - Metadescription'
      },
      dashboard: {
        title: 'Dashboard',
        'meta-description': 'Patch-notes -> Dashboard - Metadescription'
      }
    },

    'patch-notes-bis': {
      _title: 'Patch Notes (bis)',
      '_meta-description': 'Metadescription Patch Notes (bis)',

      'discord-bot-bis': {
        title: 'Bot Discord (bis)',
        'meta-description': 'Metadescription Patch-notes -> Bot Discord (bis)'
      },
      'dashboard-bis': {
        title: 'Dashboard (bis)',
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
} satisfies VocabType;
