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
    logout: 'Déconnexion'
  },

  dashboard: {
    'base-page': 'Page de base',
    'foo-page': 'Page foo',
    'bar-page': 'Page bar'
  },

  'blog-categories': {
    'patch-notes': {
      _title: 'Patch Notes',
      '_meta-description': 'Metadescription Patch Notes',

      'discord-bot': {
        title: 'Bot Discord',
        'meta-description': 'Metadescription Patch-notes -> Bot Discord'
      },
      dashboard: {
        title: 'Dashboard',
        'meta-description': 'Metadescription Patch-notes -> Dashboard'
      }
    },

    'patch-notes-bis': {
      _title: 'Patch Notes (bis)',
      '_meta-description': 'Metadescription Patch Notes (bis)',

      'discord-bot-bis': {
        title: 'Bot Discord (bis)',
        'meta-description': 'Metadescription Patch-notes -> Bot Discord (bis)'
      },
      'dashboard-bis': {
        title: 'Dashboard (bis)',
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
      title: 'Accueil',
      'meta-description': "Metadescription Page d'accueil"
    }
  },

  ugly: {
    logo: 'logo'
  }
} as const;
