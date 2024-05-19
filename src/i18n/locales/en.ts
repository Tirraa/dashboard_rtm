/* v8 ignore start */

import type { SharedVocabType, VocabType } from '@rtm/shared-types/I18n';

import { SHARED_TESTING_BLOG_SUBCATEGORIES_PAGES_TITLES, SHARED_TESTING_BLOG_CATEGORY_METADATAS } from '../lazybones';
import capitalize from '../../lib/portable/str/capitalize';

const SHARED: SharedVocabType = {
  'pages-titles': {
    ...SHARED_TESTING_BLOG_SUBCATEGORIES_PAGES_TITLES,

    'patch-notes-bis': 'Patch Notes (bis)',
    'discord-bot-bis': 'Discord Bot (bis)',

    'dashboard-bis': 'Dashboard (bis)',
    'patch-notes': 'Patch Notes',
    'discord-bot': 'Discord Bot',

    dashboard: 'Dashboard',
    homepage: 'Homepage',

    blog: 'Blog'
  },

  vocab: {
    'start-typing': 'start typing',
    brand: 'Rust Team Management',
    breadcrumbs: 'breadcrumbs',
    toc: 'table of contents',
    'sign-up': 'sign up',
    draft: 'draft',
    pages: 'pages',
    logo: 'logo',
    page: 'page',
    tags: 'tags',
    blog: 'blog',
    all: 'all'
  }
} as const;

export default {
  blog: {
    categories: {
      'patch-notes': {
        'discord-bot': {
          'meta-description': 'Discover the latest updates and improvements to the Discord bot',
          title: SHARED['pages-titles']['discord-bot']
        },

        dashboard: {
          'meta-description': 'Discover the latest updates and improvements to the dashboard',
          title: SHARED['pages-titles'].dashboard
        },

        '_meta-description': 'Discover the latest updates and improvements to the Discord bot and dashboard',
        _title: SHARED['pages-titles']['patch-notes']
      },

      'patch-notes-bis': {
        'discord-bot-bis': {
          'meta-description': 'Content just for testing purposes',
          title: SHARED['pages-titles']['discord-bot-bis']
        },

        'dashboard-bis': {
          'meta-description': 'Content just for testing purposes',
          title: SHARED['pages-titles']['dashboard-bis']
        },

        '_meta-description': 'Content just for testing purposes',
        _title: SHARED['pages-titles']['patch-notes-bis']
      },

      'blog-testing-category': SHARED_TESTING_BLOG_CATEGORY_METADATAS
    },

    toc: {
      'sr-only': {
        'hide-toc': `Hide the ${SHARED.vocab.toc}`,
        'show-toc': `Show the ${SHARED.vocab.toc}`
      }
    },

    tags: {
      xylophone: 'Xylophone',
      bagpipes: 'Bagpipes',
      drums: 'Drums',
      cello: 'Cello'
    },

    authors: {
      Gustave: {
        bio: ''
      },

      Arnaud: {
        bio: ''
      }
    },

    'tags-filters': {
      'no-result-found': 'Nothing found!',
      'clear-filters': 'Clear'
    }
  },

  vocab: {
    ...SHARED.vocab,
    'sr-only': {
      'brand-logo': `${capitalize(SHARED.vocab.brand)}'s ${SHARED.vocab.logo}`,
      goToTop: 'Go to the top of the page',
      'sort-by': 'sort by'
    },

    'footer-copy': `${SHARED.vocab.brand} · Made with ❤️`,
    'no-blog-post': 'Nobody here but us chickens!',
    'copy-to-clipboard': 'Copy to clipboard',
    'invite-the-bot': 'Invite the bot',
    '404': '404 - Page not found!',
    'more-pages': 'More pages',
    pagination: 'Pagination',
    'see-more': 'See more!',
    loading: 'Loading...',
    'brand-short': 'RTM',
    prev: 'Previous',
    next: 'Next'
  },

  navbar: {
    'sr-only': {
      'close-hamburger-menu': 'Close the navbar menu (website sections)',
      'open-hamburger-menu': 'Open the navbar menu (website sections)',
      'close-language-switcher-menu': 'Close language choice menu',
      'open-language-switcher-menu': 'Open language choice menu',
      'switch-to-light-mode': 'Switch to light mode',
      'switch-to-dark-mode': 'Switch to dark mode',
      'language-switcher-menu': 'Language choice',
      'open-search-menu': 'Open search menu',
      'hamburger-menu': 'Website sections'
    },

    assistance: 'Assistance'
  },

  'search-menu': {
    'sr-only': {
      'choose-search-mode': 'Choose search mode',
      'close-search-menu': 'Close search menu',
      'dashboard-access': 'Dashboard access',
      'homepage-access': 'Homepage access',
      'prev-screen': 'Previous screen',
      'quick-access': 'Quick access',
      'blog-access': 'Blog access',
      'next-screen': 'Next screen',
      results: 'Search results'
    },

    options: {
      blog: 'Search blog posts',
      pages: 'Search pages',
      all: 'Global search'
    },

    'nothing-found': 'Nothing found!'
  },

  dashboard: {
    'sr-only': {
      'hide-sidebar': 'Hide the sidebar',
      'show-sidebar': 'Show the sidebar'
    },

    'pages-titles': {
      main: 'Main',
      foo: 'Foo',
      bar: 'Bar'
    }
  },

  filters: {
    'select-a-filter': 'Select a filter',
    'alphabet-desc': 'Alphabetic Z-A',
    'date-desc': 'Most recent first',
    'alphabet-asc': 'Alphabetic A-Z',
    'date-asc': 'Oldest first'
  },

  errors: {
    brokenPagefindIntegration: {
      message: 'Search is broken. We have been alerted of this issue. Please try again later.',
      title: 'Search feature anomaly'
    }
  },

  metadescriptions: {
    homepage: 'Discover Rust Team Management, a new way to teamplay. Your Discord game changer!'
  },

  auth: {
    signup: SHARED.vocab['sign-up'],
    logout: 'Logout',
    login: 'Login'
  },

  'pages-titles': SHARED['pages-titles'],

  _infos: { lng: 'en' }
} as const satisfies VocabType;

/* v8 ignore stop */
