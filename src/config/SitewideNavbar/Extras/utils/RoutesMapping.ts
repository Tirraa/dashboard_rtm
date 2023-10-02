import { WeaklyBindedReactElements } from '@/types/RoutesMapping';

enum ENavbarExtrasFeatures {
  LOGIN,
  THEME
}

export type NavbarExtrasFeaturesKeys = keyof typeof ENavbarExtrasFeatures;
export type NavbarExtrasFeaturesReactElements = WeaklyBindedReactElements<NavbarExtrasFeaturesKeys>;
