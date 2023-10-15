export const SHARED = {
  'patch-notes': '',
  'discord-bot': '',
  dashboard: '',

  'patch-notes-bis': '',
  'discord-bot-bis': '',
  'dashboard-bis': ''
} as const;

export default {
  _infos: {
    lng: 'skeleton',
    label: ''
  },

  navbar: {
    assistance: ''
  },

  auth: {
    login: '',
    logout: '',
    signup: ''
  },

  dashboard: {
    'pages-titles': {
      main: '',
      foo: '',
      bar: ''
    }
  },

  'blog-categories': {
    'patch-notes': {
      _title: '',
      '_meta-description': '',

      'discord-bot': {
        title: '',
        'meta-description': ''
      },
      dashboard: {
        title: '',
        'meta-description': ''
      }
    },

    'patch-notes-bis': {
      _title: '',
      '_meta-description': '',

      'discord-bot-bis': {
        title: '',
        'meta-description': ''
      },
      'dashboard-bis': {
        title: '',
        'meta-description': ''
      }
    }
  },

  vocab: {
    ...SHARED,
    brand: '',
    'brand-short': '',
    'invite-the-bot': '',
    'no-blog-post': '',
    '404': '',
    'see-more': '',
    loading: ''
  },

  'manual-SEO': {
    homepage: {
      title: '',
      'meta-description': ''
    },

    signup: {
      title: '',
      'meta-description': ''
    }
  },

  ugly: {
    logo: ''
  }
} as const;
