import NavbarLanguageMenu from '@/components/layouts/navbar/NavbarLanguageMenu';
import NavbarLoginButton from '@/components/layouts/navbar/NavbarLoginButton';
import NavbarThemeButton from '@/components/layouts/navbar/NavbarThemeButton';
import { NavbarExtrasFeaturesReactElements } from './RoutesMapping';

export const NAVBAR_EXTRAS_COMPONENTS_DESKTOP: NavbarExtrasFeaturesReactElements = {
  THEME: <NavbarThemeButton />,
  LANGUAGE: <NavbarLanguageMenu />,
  LOGIN: <NavbarLoginButton />
};

export const NAVBAR_EXTRAS_COMPONENTS_MOBILE: NavbarExtrasFeaturesReactElements = {
  THEME: <NavbarThemeButton isMobile />,
  LANGUAGE: <NavbarLanguageMenu isMobile />,
  LOGIN: <NavbarLoginButton isMobile />
};
