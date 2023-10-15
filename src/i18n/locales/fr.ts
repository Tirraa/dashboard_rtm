import { SharedVocabType, VocabType } from '@/types/i18n';

const SHARED: SharedVocabType = {
  'patch-notes': 'Patch Notes',
  'discord-bot': 'Bot Discord',
  dashboard: 'Dashboard',

  'patch-notes-bis': 'Patch Notes (bis)',
  'discord-bot-bis': 'Bot Discord (bis)',
  'dashboard-bis': 'Dashboard (bis)'
};

export default {
  _infos: {
    lng: 'fr',
    label: 'Français'
  },

  navbar: {
    assistance: 'Support'
  },

  auth: {
    login: 'Connexion',
    logout: 'Déconnexion',
    signup: "S'inscrire"
  },

  dashboard: {
    'pages-titles': {
      main: 'Page principale',
      foo: 'Foo',
      bar: 'Bar'
    }
  },

  'blog-categories': {
    'patch-notes': {
      _title: SHARED['patch-notes'],
      '_meta-description': 'Metadescription Patch Notes',

      'discord-bot': {
        title: SHARED['discord-bot'],
        'meta-description': 'Metadescription Patch-notes -> Bot Discord'
      },
      dashboard: {
        title: SHARED['dashboard'],
        'meta-description': 'Metadescription Patch-notes -> Dashboard'
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
    'invite-the-bot': 'Inviter le bot',
    'no-blog-post': 'Rien à afficher ici !',
    '404': '404 - Page introuvable !',
    'see-more': 'Voir plus !',
    loading: 'Chargement en cours...'
  },

  'manual-SEO': {
    homepage: {
      title: 'Accueil',
      'meta-description': "Metadescription Page d'accueil"
    },

    signup: {
      title: 'Inscription',
      'meta-description': 'Metadescription portail dashboard'
    }
  },

  ugly: {
    logo: 'logo'
  }
} as const satisfies VocabType;
