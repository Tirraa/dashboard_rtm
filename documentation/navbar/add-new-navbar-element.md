# Add a new element to the Navbar

The code aims to be as dynamic as possible. For this reason, the navbar is also configurable in a fairly straightforward manner.  
We will create a new element in the navbar quite easily here.  
This entire process is errors-driven.

---

As I write these lines, the navbar looks like this:

<p align="center"><img src="./Assets/navbar-initial-state.png" alt="Navbar initial state"/></p>

We will add a simple button that will redirect to the `/404` route.

## Our first new navbar button

### The navbar elements enum

[We will first edit the `ESitewideNavbarRoutes` enum, in the `routesMapping.ts` file of the SitewideNavbar's config folder.](/src/config/SitewideNavbar/utils/RoutesMapping.ts)

For instance, if I have:

```ts
// SitewideNavbar/utils/RoutesMapping.ts
enum ESitewideNavbarRoutes {
  HOME_PAGE,
  DASHBOARD_PAGE,
  PATCH_NOTES_PAGE,
  SUPPORT_PAGE,
  LOGIN_PAGE
}
```

I will just add a new key:

```ts
// SitewideNavbar/utils/RoutesMapping.ts
enum ESitewideNavbarRoutes {
  HOME_PAGE,
  DASHBOARD_PAGE,
  PATCH_NOTES_PAGE,
  SUPPORT_PAGE,
  NOTFOUND_PAGE, // ... Added "NOTFOUND_PAGE" key
  LOGIN_PAGE
}
```

We'll have an error.

> ./src/config/SitewideNavbar/routesImpl.ts:8:14  
> **Type error**: Property 'NOTFOUND_PAGE' is missing in type '...' but required in type 'SitewideNavbarRoutes'.

This is because we need to update [the `routesImpl.ts` file of the SitewideNavbar's config folder.](/src/config/SitewideNavbar/routesImpl.ts)

### The navbar routes implementation

Let's open this [routesImpl.ts file](/src/config/SitewideNavbar/routesImpl.ts), then:

```ts
// SitewideNavbar/routesImpl.ts
export const SITEWIDE_NAVBAR_ROUTES: SitewideNavbarRoutes = {
  HOME_PAGE: BASE,
  DASHBOARD_PAGE: RoutesBase.DASHBOARD,
  PATCH_NOTES_PAGE: RoutesBase.PATCH_NOTES,
  SUPPORT_PAGE: DiscordConfig.SUPPORT_SERVER_INVITE_LINK,
  LOGIN_PAGE: BASE + 'login'
};

const navbar = i18ns.navbar;
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${navbar}.home`,
  DASHBOARD_PAGE: `${navbar}.dashboard`,
  PATCH_NOTES_PAGE: `${navbar}.patch-notes`,
  SUPPORT_PAGE: `${navbar}.assistance`,
  LOGIN_PAGE: `${navbar}.login`
};
```

Would become:

```ts
// SitewideNavbar/routesImpl.ts
export const SITEWIDE_NAVBAR_ROUTES: SitewideNavbarRoutes = {
  HOME_PAGE: BASE,
  DASHBOARD_PAGE: RoutesBase.DASHBOARD,
  PATCH_NOTES_PAGE: RoutesBase.PATCH_NOTES,
  SUPPORT_PAGE: DiscordConfig.SUPPORT_SERVER_INVITE_LINK,
  NOTFOUND_PAGE: BASE + '404', // ... Added "NOTFOUND_PAGE" key & value
  LOGIN_PAGE: BASE + 'login'
};

const navbar = i18ns.navbar;
export const SITEWIDE_NAVBAR_ROUTES_TITLES: SitewideNavbarRoutesTitles = {
  HOME_PAGE: `${navbar}.home`,
  DASHBOARD_PAGE: `${navbar}.dashboard`,
  PATCH_NOTES_PAGE: `${navbar}.patch-notes`,
  SUPPORT_PAGE: `${navbar}.assistance`,
  NOTFOUND_PAGE: `${navbar}.not-found`, // ... Added "NOTFOUND_PAGE" key & value
  LOGIN_PAGE: `${navbar}.login`
};
```

Then, we will have a new error:

> ./src/config/SitewideNavbar/routesImpl.ts:23:3  
> **Type error**: Type '"navbar.not-found"' is not assignable to type '...'.

This is because we need to update [the _locales_ file of the i18n.](/src/i18n/locales/)

### The navbar i18n: default language

Let's start by editing our _default language_ file. In the current case, it is [fr.ts](/src/i18n/locales/fr.ts), but it would depend about
[your i18n config on your side](/src/config/i18n.ts): the _default language_ will be the _locale_ targeted by _VocabBase_, that must also match the
`ELanguageFlag` enum first key.

So:

```ts
// fr.ts
export default {
  navbar: {
    home: 'Accueil',
    dashboard: 'Dashboard',
    'patch-notes': 'Patch notes',
    assistance: 'Support',
    'discord-bot': 'Bot Discord',
    login: 'Connexion'
  }
  // * ...
};
```

Would become:

```ts
// fr.ts
export default {
  navbar: {
    home: 'Accueil',
    dashboard: 'Dashboard',
    'patch-notes': 'Patch notes',
    assistance: 'Support',
    'discord-bot': 'Bot Discord',
    'not-found': '404', // * ... Added a dummy 'not-found' label translation for the fr.ts file
    login: 'Connexion'
  }
  // * ...
};
```

We now have a new error (that will be the last one):

> ./src/i18n/locales/en.ts:4:3  
> **Type error**: Property ''not-found'' is missing in type '{ home: string; dashboard: string; 'patch-notes': string; assistance: string;
> 'discord-bot': string; login: string; }' but required in type 'MakeVocabType<{ readonly home: "Accueil"; readonly dashboard: "Dashboard"; readonly
> 'patch-notes': "Patch notes"; readonly assistance: "Support"; readonly 'discord-bot': "Bot Discord"; readonly 'not-found': "404"; readonly login:
> "Connexion"; }>'.

This is because the other languages _locales_ implement a dynamicly generated type, based on the default language.

### The navbar i18n: translations

So, you're now aware that the code forbids to forget translations.  
Now, let's open [en.ts](/src/i18n/locales/en.ts), and update it accordingly.

```ts
// en.ts
const enVocab: VocabType = {
  navbar: {
    home: 'Homepage',
    dashboard: 'Dashboard',
    'patch-notes': 'Patch notes',
    assistance: 'Assistance',
    'discord-bot': 'Discord bot',
    'not-found': '404 (en !)', // * ... Added a dummy 'not-found' label translation for the en.ts file
    login: 'Login'
  }
  // * ...
};
```

Now, let's build again.

<p align="center"><img src="./Assets/updated-navbar-en.png" alt="Updated navbar (en)"/></p>
<p align="center"><img src="./Assets/updated-navbar-fr.png" alt="Updated navbar (fr)"/></p>

Congrats!  
You made it!
