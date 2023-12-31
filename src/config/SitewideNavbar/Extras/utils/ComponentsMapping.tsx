/* v8 ignore start */
// Stryker disable all
import NavbarLanguageMenu from '@/components/layouts/navbar/NavbarLanguageMenu';
import NavbarLoginButton from '@/components/layouts/navbar/NavbarLoginButton';
import NavbarThemeButton from '@/components/layouts/navbar/NavbarThemeButton';

import type { NavbarExtrasFeaturesReactElements } from './RoutesMapping';

export const NAVBAR_EXTRAS_COMPONENTS_DESKTOP: NavbarExtrasFeaturesReactElements = {
  LANGUAGE: <NavbarLanguageMenu />,
  THEME: <NavbarThemeButton />,
  LOGIN: <NavbarLoginButton />
};

export const NAVBAR_EXTRAS_COMPONENTS_MOBILE: NavbarExtrasFeaturesReactElements = {
  LANGUAGE: <NavbarLanguageMenu isMobile />,
  LOGIN: <NavbarLoginButton isMobile />,
  THEME: <NavbarThemeButton />
};
/* v8 ignore stop */
// Stryker restore all
