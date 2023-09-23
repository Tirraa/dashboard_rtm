import { VocabType } from '@/types/i18n';

export default {
  _infos: {
    lng: 'en',
    label: 'English'
  },

  navbar: {
    home: 'Homepage',
    dashboard: 'Dashboard',
    'patch-notes': 'Patch notes',
    assistance: 'Assistance',
    'discord-bot': 'Discord bot'
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
      'discord-bot': 'Discord bot',
      dashboard: 'Dashboard'
    }
  },

  vocab: {
    brand: 'Rust Team Management',
    'invite-the-bot': 'Invite the bot',
    'no-blog-post': 'Nobody here but us chickens!',
    '404': '404 - Page not found!',
    'see-more': 'See more!',
    loading: 'Loading...'
  },

  ugly: {
    logo: 'logo'
  }
} satisfies VocabType;
