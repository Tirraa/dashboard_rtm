import { DEFAULT_DARK_VARIANT, DEFAULT_LIGHT_VARIANT, ThemeVariant } from '@/config/themes';
import {
  getOldSavedThemeFromLazinessMemory,
  getThemeFromLocalStorageUnstrict,
  isValidVariantCls,
  resetLazinessMemory,
  selectTheme
} from '@/themes/themeControl';

export function initializeTheme() {
  const NAVIGATOR_SETTINGS_DARK_THEME_NEEDLE = '(prefers-color-scheme: dark)';
  const retrievedTheme = getThemeFromLocalStorageUnstrict();

  const rescue = () =>
    window.matchMedia && window.matchMedia(NAVIGATOR_SETTINGS_DARK_THEME_NEEDLE).matches
      ? selectTheme(DEFAULT_DARK_VARIANT)
      : selectTheme(DEFAULT_LIGHT_VARIANT);

  if (isValidVariantCls(retrievedTheme)) selectTheme(retrievedTheme as ThemeVariant);
  else rescue();
}

export const resetTheme = () => {
  const memoizedTheme = getOldSavedThemeFromLazinessMemory();
  resetLazinessMemory();
  if (isValidVariantCls(memoizedTheme)) {
    selectTheme(memoizedTheme as ThemeVariant);
    return;
  }
  initializeTheme();
};

export default initializeTheme;