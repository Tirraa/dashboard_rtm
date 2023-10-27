import NavbarLoginButton from '@/components/layouts/navbar/NavbarLoginButton';
import NavbarThemeButton from '@/components/layouts/navbar/NavbarThemeButton';
import { NavbarExtrasFeaturesReactElements } from './RoutesMapping';

export const NAVBAR_EXTRAS_COMPONENTS_DESKTOP: NavbarExtrasFeaturesReactElements = { THEME: <NavbarThemeButton />, LOGIN: <NavbarLoginButton /> };

export const NAVBAR_EXTRAS_COMPONENTS_MOBILE: NavbarExtrasFeaturesReactElements = {
  THEME: <NavbarThemeButton isMobile />,
  LOGIN: <NavbarLoginButton isMobile />
};
