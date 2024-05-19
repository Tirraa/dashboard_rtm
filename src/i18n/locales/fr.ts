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
    'start-typing': 'commencer à écrire',
    brand: 'Rust Team Management',
    breadcrumbs: "fil d'ariane",
    toc: 'table des matières',
    'sign-up': "s'inscrire",
    draft: 'ébauche',
    pages: 'pages',
    logo: 'logo',
    page: 'page',
    tags: 'tags',
    blog: 'blog',
    all: 'tout'
  }
} as const;

export default {
  blog: {
    categories: {
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

    toc: {
      'sr-only': {
        'show-toc': `Afficher la ${SHARED.vocab.toc}`,
        'hide-toc': `Masquer la ${SHARED.vocab.toc}`
      }
    },

    tags: {
      xylophone: 'Xylophone',
      bagpipes: 'Cornemuse',
      cello: 'Violoncelle',
      drums: 'Batterie'
    },

    'tags-filters': {
      'no-result-found': 'Rien trouvé !',
      'clear-filters': 'Réinitialiser'
    },

    authors: {
      Gustave: {
        bio: ''
      },

      Arnaud: {
        bio: ''
      }
    }
  },

  navbar: {
    'sr-only': {
      'close-hamburger-menu': 'Fermer le menu de la barre de navigation (sections du site)',
      'open-hamburger-menu': 'Ouvrir le menu de la barre de navigation (sections du site)',
      'close-language-switcher-menu': 'Fermer le menu du choix de la langue',
      'open-language-switcher-menu': 'Ouvrir le menu du choix de la langue',
      'switch-to-light-mode': 'Passer sur le thème clair',
      'switch-to-dark-mode': 'Passer sur le thème sombre',
      'open-search-menu': 'Ouvrir le menu de recherche',
      'language-switcher-menu': 'Choix de la langue',
      'hamburger-menu': 'Sections du site'
    },

    assistance: 'Support'
  },

  vocab: {
    ...SHARED.vocab,
    'sr-only': {
      'brand-logo': `${capitalize(SHARED.vocab.logo)} de ${SHARED.vocab.brand}`,
      goToTop: 'Remonter en haut de la page',
      'sort-by': 'trier par'
    },

    'footer-copy': `${SHARED.vocab.brand} · Réalisé avec ❤️`,
    'copy-to-clipboard': 'Copier dans le presse-papiers',
    'no-blog-post': 'Rien à afficher ici !',
    'invite-the-bot': 'Inviter le bot',
    '404': '404 - Page introuvable !',
    loading: 'Chargement en cours...',
    'more-pages': 'Plus de pages',
    'see-more': 'Voir plus !',
    pagination: 'Pagination',
    'brand-short': 'RTM',
    prev: 'Précédent',
    next: 'Suivant'
  },

  'search-menu': {
    'sr-only': {
      'choose-search-mode': 'Choisir le mode de recherche',
      'close-search-menu': 'Fermer le menu de recherche',
      'homepage-access': "Accès à la page d'accueil",
      'dashboard-access': 'Accès au dashboard',
      results: 'Résultats de la recherche',
      'prev-screen': 'Écran précédent',
      'blog-access': 'Accès au blog',
      'quick-access': 'Accès rapide',
      'next-screen': 'Écran suivant'
    },

    options: {
      blog: "Recherche d'articles de blog",
      pages: 'Recherche de pages',
      all: 'Recherche globale'
    },

    'nothing-found': 'Aucun résultat !'
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

  errors: {
    brokenPagefindIntegration: {
      message: 'La recherche ne fonctionne pas. Nous avons été alerté de ce problème. Veuillez réessayer plus tard.',
      title: 'Anomalie de la fonctionnalité de recherche'
    }
  },

  filters: {
    'date-desc': "Les plus récents d'abord",
    'select-a-filter': 'Choisir un filtre',
    'date-asc': "Les plus anciens d'abord",
    'alphabet-desc': 'Alphabétique Z-A',
    'alphabet-asc': 'Alphabétique A-Z'
  },

  auth: {
    signup: SHARED.vocab['sign-up'],
    logout: 'Déconnexion',
    login: 'Connexion'
  },

  metadescriptions: {
    homepage: "Metadescription Page d'accueil"
  },

  'pages-titles': SHARED['pages-titles'],

  _infos: { lng: 'fr' }
} as const satisfies VocabType;

/* v8 ignore stop */
