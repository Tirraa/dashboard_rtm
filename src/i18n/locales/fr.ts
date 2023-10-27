import { SharedVocabType, VocabType } from '@/types/i18n';
import { labelsImpl as labels } from './schema';

const SHARED: SharedVocabType = {
  'pages-titles': {
    homepage: "Page d'accueil",
    'sign-up': 'Inscription',

    'patch-notes': 'Notes de patch',
    'discord-bot': 'Bot Discord',
    dashboard: 'Dashboard',

    'patch-notes-bis': 'Notes de patch (bis)',
    'discord-bot-bis': 'Bot Discord (bis)',
    'dashboard-bis': 'Dashboard (bis)'
  },
  labels
};

export default {
  'pages-titles': { ...SHARED['pages-titles'] },

  _infos: { lng: 'fr' },
  _globals: { labels },

  navbar: {
    assistance: 'Support',
    'sr-only': {
      'hamburger-menu': 'Sections du site',
      'open-hamburger-menu': 'Ouvrir le menu de la barre de navigation (sections du site)',
      'close-hamburger-menu': 'Fermer le menu de la barre de navigation (sections du site)',
      'switch-to-light-mode': 'Passer sur le thème clair',
      'switch-to-dark-mode': 'Passer sur le thème sombre'
    }
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
    },
    'sr-only': {
      'hide-sidebar': 'Masquer la barre latérale',
      'show-sidebar': 'Afficher la barre latérale'
    }
  },

  'blog-categories': {
    'patch-notes': {
      _title: SHARED['pages-titles']['patch-notes'],
      '_meta-description': 'Metadescription Notes de patch',

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
      '_meta-description': 'Metadescription Notes de patch (bis)',

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
    loading: 'Chargement en cours...',
    prev: 'Précédent',
    next: 'Suivant',
    'copy-to-clipboard': 'Copier dans le presse-papiers'
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
