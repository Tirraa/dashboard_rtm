import type { WeaklyBindedReactElements } from '@/types/RoutesMapping';

enum ENavbarExtrasFeatures {
  LOGIN,
  THEME,
  LANGUAGE
}

export type NavbarExtrasFeaturesKeys = keyof typeof ENavbarExtrasFeatures;
export type NavbarExtrasFeaturesReactElements = WeaklyBindedReactElements<NavbarExtrasFeaturesKeys>;
