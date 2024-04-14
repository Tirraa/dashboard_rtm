/* v8 ignore start */
// Stryker disable all

import NavbarSearchButton from '@/components/layouts/navbar/search/NavbarSearchButton';
import NavbarLanguageMenu from '@/components/layouts/navbar/NavbarLanguageMenu';
import NavbarLoginButton from '@/components/layouts/navbar/NavbarLoginButton';
import NavbarThemeButton from '@/components/layouts/navbar/NavbarThemeButton';

import type { NavbarExtrasFeaturesReactElements } from './RoutesMapping';

export const NAVBAR_EXTRAS_COMPONENTS_DESKTOP: NavbarExtrasFeaturesReactElements = {
  SEARCH_BTN: <NavbarSearchButton />,
  LANGUAGE: <NavbarLanguageMenu />,
  THEME: <NavbarThemeButton />,
  LOGIN: <NavbarLoginButton />
};

export const NAVBAR_EXTRAS_COMPONENTS_MOBILE: NavbarExtrasFeaturesReactElements = {
  SEARCH_BTN: <NavbarSearchButton />,
  // eslint-disable-next-line perfectionist/sort-objects
  LANGUAGE: <NavbarLanguageMenu isMobile />,
  LOGIN: <NavbarLoginButton isMobile />,
  THEME: <NavbarThemeButton />
};

// Stryker restore all
/* v8 ignore stop */
