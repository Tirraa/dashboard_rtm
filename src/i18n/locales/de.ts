import { VocabType } from '@/types/i18n';

export default {
  _infos: {
    lng: 'de',
    label: 'Deutsch'
  },

  navbar: {
    home: 'Startseite',
    dashboard: 'Armaturenbrett',
    'patch-notes': 'Klebenotizzettel',
    assistance: 'Hilfe',
    'discord-bot': 'Discord Bot'
  },

  auth: {
    login: 'Anmeldung',
    logout: 'Abmeldung'
  },

  dashboard: {
    'base-page': 'Base Seite',
    'foo-page': 'Foo Seite',
    'bar-page': 'Bar Seite'
  },

  'blog-categories': {
    'patch-notes': {
      _title: 'Klebenotizzettel',
      'discord-bot': 'Discord Bot',
      dashboard: 'Armaturenbrett'
    }
  },

  vocab: {
    brand: 'Rust Team Management',
    'invite-the-bot': 'Den Bot einladen',
    'no-blog-post': 'Nicht gefunden!',
    '404': '404 - Seite nicht gefunden!',
    'see-more': 'Mehr sehen!',
    loading: 'Laden...'
  },

  ugly: {
    logo: 'Logo'
  }
} satisfies VocabType;
