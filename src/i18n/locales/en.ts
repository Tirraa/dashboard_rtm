import { VocabInterface } from '@/types/i18n';

const enVocab: VocabInterface = {
  navbar: {
    home: 'Homepage',
    dashboard: 'Dashboard',
    'patch-notes': 'Patch notes',
    assistance: 'Assistance',
    'discord-bot': 'Discord bot',
    login: 'Login'
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
    'invite-the-bot': 'Inviter le bot',
    'no-blog-post': 'Rien à afficher ici !',
    '404': '404 - Page introuvable !',
    'see-more': 'Voir plus !'
  },

  ugly: {
    logo: 'logo'
  }
} as const;

export default enVocab;
