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
    logout: 'Logout'
  },

  dashboard: {
    'base-page': 'Base page',
    'foo-page': 'Foo page',
    'bar-page': 'Bar page'
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
    }
  },

  ugly: {
    logo: 'logo'
  }
} satisfies VocabType;
