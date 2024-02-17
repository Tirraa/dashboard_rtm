/* v8 ignore start */
import type { SharedVocabType, VocabType } from '@rtm/shared-types/I18n';

import { SHARED_TESTING_BLOG_SUBCATEGORIES_PAGES_TITLES, SHARED_TESTING_BLOG_CATEGORY_METADATAS } from '../lazybones';
import capitalize from '../../lib/portable/str/capitalize';

const SHARED: SharedVocabType = {
  'pages-titles': {
    ...SHARED_TESTING_BLOG_SUBCATEGORIES_PAGES_TITLES,

    'patch-notes-bis': 'Notes de patch (bis)',
    'discord-bot-bis': 'Bot Discord (bis)',

    'dashboard-bis': 'Dashboard (bis)',
    'patch-notes': 'Notes de patch',
    'discord-bot': 'Bot Discord',

    dashboard: 'Dashboard',

    homepage: 'Accueil',
    blog: 'Blog'
  },

  vocab: {
    brand: 'Rust Team Management',
    breadcrumbs: "Fil d'ariane",
    'sign-up': 'Inscription',
    logo: 'logo',
    page: 'page'
  }
} as const;

export default {
  _infos: { lng: 'fr' },

  // eslint-disable-next-line perfectionist/sort-objects
  'blog-categories': {
    'patch-notes-bis': {
      'discord-bot-bis': {
        'meta-description': 'Metadescription Patch-notes -> Bot Discord (bis)',
        title: SHARED['pages-titles']['discord-bot-bis']
      },

      'dashboard-bis': {
        'meta-description': 'Metadescription Patch-notes -> Dashboard (bis)',
        title: SHARED['pages-titles']['dashboard-bis']
      },

      '_meta-description': 'Metadescription Notes de patch (bis)',
      _title: SHARED['pages-titles']['patch-notes-bis']
    },

    'patch-notes': {
      'discord-bot': {
        'meta-description': 'Metadescription Patch-notes -> Bot Discord',
        title: SHARED['pages-titles']['discord-bot']
      },

      dashboard: {
        'meta-description': 'Metadescription Patch-notes -> Dashboard',
        title: SHARED['pages-titles'].dashboard
      },

      '_meta-description': 'Metadescription Notes de patch',
      _title: SHARED['pages-titles']['patch-notes']
    },

    'blog-testing-category': SHARED_TESTING_BLOG_CATEGORY_METADATAS
  },

  navbar: {
    'sr-only': {
      'close-hamburger-menu': 'Fermer le menu de la barre de navigation (sections du site)',
      'open-hamburger-menu': 'Ouvrir le menu de la barre de navigation (sections du site)',
      'close-language-switcher-menu': 'Fermer le menu du choix de la langue',
      'open-language-switcher-menu': 'Ouvrir le menu du choix de la langue',
      'switch-to-light-mode': 'Passer sur le thème clair',
      'switch-to-dark-mode': 'Passer sur le thème sombre',
      'language-switcher-menu': 'Choix de la langue',
      'hamburger-menu': 'Sections du site'
    },

    assistance: 'Support'
  },

  vocab: {
    ...SHARED.vocab,
    'sr-only': {
      'brand-logo': `${capitalize(SHARED.vocab.logo)} de ${SHARED.vocab.brand}`
    },

    'copy-to-clipboard': 'Copier dans le presse-papiers',
    'no-blog-post': 'Rien à afficher ici !',
    'invite-the-bot': 'Inviter le bot',
    '404': '404 - Page introuvable !',
    loading: 'Chargement en cours...',
    'see-more': 'Voir plus !',
    'brand-short': 'RTM',
    prev: 'Précédent',
    next: 'Suivant'
  },

  dashboard: {
    'sr-only': {
      'show-sidebar': 'Afficher la barre latérale',
      'hide-sidebar': 'Masquer la barre latérale'
    },

    'pages-titles': {
      main: 'Page principale',
      foo: 'Foo',
      bar: 'Bar'
    }
  },

  auth: {
    logout: 'Déconnexion',
    signup: "S'inscrire",
    login: 'Connexion'
  },

  'pages-titles': SHARED['pages-titles']
} as const satisfies VocabType;
/* v8 ignore stop */
