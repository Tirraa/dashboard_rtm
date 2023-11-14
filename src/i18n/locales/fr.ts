import type { SharedVocabType, VocabType } from '##/types/hell/i18n';
import { capitalize } from '../../lib/app-agnostic/str/capitalize';

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
  vocab: {
    brand: 'Rust Team Management',
    logo: 'logo',
    page: 'page',
    breadcrumbs: "Fil d'ariane"
  }
};

export default {
  'pages-titles': { ...SHARED['pages-titles'] },

  _infos: { lng: 'fr' },

  navbar: {
    assistance: 'Support',
    'sr-only': {
      'language-switcher-menu': 'Choix de la langue',
      'open-language-switcher-menu': 'Ouvrir le menu du choix de la langue',
      'close-language-switcher-menu': 'Fermer le menu du choix de la langue',
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
        title: SHARED['pages-titles'].dashboard,
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
    ...SHARED.vocab,
    'brand-short': 'RTM',
    'invite-the-bot': 'Inviter le bot',
    'no-blog-post': 'Rien à afficher ici !',
    '404': '404 - Page introuvable !',
    'see-more': 'Voir plus !',
    loading: 'Chargement en cours...',
    prev: 'Précédent',
    next: 'Suivant',
    'copy-to-clipboard': 'Copier dans le presse-papiers',
    'sr-only': {
      'brand-logo': `${capitalize(SHARED.vocab.logo)} de ${SHARED.vocab.brand}`
    }
  },

  'manual-SEO': {
    homepage: {
      'meta-description': "Metadescription Page d'accueil"
    },

    signup: {
      'meta-description': 'Metadescription portail dashboard'
    }
  }
} as const satisfies VocabType;
