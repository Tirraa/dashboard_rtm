import { SharedVocabType, VocabType } from '@/types/i18n';

const SHARED: SharedVocabType = {
  'pages-titles': {
    homepage: "Page d'accueil",
    'sign-up': 'Inscription',

    'patch-notes': 'Patch Notes',
    'discord-bot': 'Bot Discord',
    dashboard: 'Dashboard',

    'patch-notes-bis': 'Patch Notes (bis)',
    'discord-bot-bis': 'Bot Discord (bis)',
    'dashboard-bis': 'Dashboard (bis)'
  }
};

export default {
  'pages-titles': { ...SHARED['pages-titles'] },

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
      _title: SHARED['pages-titles']['patch-notes'],
      '_meta-description': 'Metadescription Patch Notes',

      'discord-bot': {
        title: SHARED['pages-titles']['discord-bot'],
        'meta-description': 'Metadescription Patch-notes -> Bot Discord'
      },
      dashboard: {
        title: SHARED['pages-titles']['dashboard'],
        'meta-description': 'Metadescription Patch-notes -> Dashboard'
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
    'invite-the-bot': 'Inviter le bot',
    'no-blog-post': 'Rien à afficher ici !',
    '404': '404 - Page introuvable !',
    'see-more': 'Voir plus !',
    loading: 'Chargement en cours...'
  },

  'manual-SEO': {
    homepage: {
      title: SHARED['pages-titles']['homepage'],
      'meta-description': "Metadescription Page d'accueil"
    },

    signup: {
      title: SHARED['pages-titles']['sign-up'],
      'meta-description': 'Metadescription portail dashboard'
    }
  },

  ugly: {
    logo: 'logo'
  }
} as const satisfies VocabType;
