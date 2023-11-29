import type { SharedVocabType, VocabType } from '##/types/magic/i18n';
import { capitalize } from '../../lib/functions/str/capitalize';

const SHARED: SharedVocabType = {
  'pages-titles': {
    homepage: 'Homepage',
    'sign-up': 'Sign up',

    'patch-notes': 'Patch Notes',
    'discord-bot': 'Discord Bot',
    dashboard: 'Dashboard',

    'patch-notes-bis': 'Patch Notes (bis)',
    'discord-bot-bis': 'Discord Bot (bis)',
    'dashboard-bis': 'Dashboard (bis)'
  },
  vocab: {
    brand: 'Rust Team Management',
    logo: 'logo',
    page: 'page',
    breadcrumbs: 'Breadcrumbs'
  }
};

export default {
  'pages-titles': { ...SHARED['pages-titles'] },

  _infos: { lng: 'en' },

  navbar: {
    assistance: 'Assistance',
    'sr-only': {
      'language-switcher-menu': 'Language choice',
      'open-language-switcher-menu': 'Open language choice menu',
      'close-language-switcher-menu': 'Close language choice menu',
      'hamburger-menu': 'Website sections',
      'open-hamburger-menu': 'Open the navbar menu (website sections)',
      'close-hamburger-menu': 'Close the navbar menu (website sections)',
      'switch-to-dark-mode': 'Switch to dark mode',
      'switch-to-light-mode': 'Switch to light mode'
    }
  },

  auth: {
    login: 'Login',
    logout: 'Logout',
    signup: SHARED['pages-titles']['sign-up']
  },

  dashboard: {
    'pages-titles': {
      main: 'Main',
      foo: 'Foo',
      bar: 'Bar'
    },
    'sr-only': {
      'hide-sidebar': 'Hide the sidebar',
      'show-sidebar': 'Show the sidebar'
    }
  },

  'blog-categories': {
    'patch-notes': {
      _title: SHARED['pages-titles']['patch-notes'],
      '_meta-description': 'Patch Notes Metadescription',

      'discord-bot': {
        title: SHARED['pages-titles']['discord-bot'],
        'meta-description': 'Patch-notes -> Discord Bot - Metadescription'
      },
      dashboard: {
        title: SHARED['pages-titles'].dashboard,
        'meta-description': 'Patch-notes -> Dashboard - Metadescription'
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
    ...SHARED.vocab,
    'brand-short': 'RTM',
    'invite-the-bot': 'Invite the bot',
    'no-blog-post': 'Nobody here but us chickens!',
    '404': '404 - Page not found!',
    'see-more': 'See more!',
    loading: 'Loading...',
    prev: 'Previous',
    next: 'Next',
    'copy-to-clipboard': 'Copy to clipboard',
    'sr-only': {
      'brand-logo': `${capitalize(SHARED.vocab.brand)}'s ${SHARED.vocab.logo}`
    }
  },

  'manual-SEO': {
    homepage: {
      'meta-description': 'This is the homepage metadescription'
    },

    signup: {
      'meta-description': 'Dashboard portal metadescription'
    }
  }
} as const satisfies VocabType;
