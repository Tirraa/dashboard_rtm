import THEME_CONFIG from '@/config/themes';
import { getThemeFromLocalStorage, toggleTheme } from './themeControl';

export function initializeTheme() {
  const NAVIGATOR_SETTINGS_DARK_THEME_NEEDLE = '(prefers-color-scheme: dark)';
  const retrievedTheme = getThemeFromLocalStorage();
  let rescueCtx = false;

  if (retrievedTheme !== null) {
    if (retrievedTheme === THEME_CONFIG.DARK_THEME) toggleTheme(THEME_CONFIG.DARK_THEME);
    else if (retrievedTheme === THEME_CONFIG.LIGHT_THEME) toggleTheme(THEME_CONFIG.LIGHT_THEME);
    else rescueCtx = true;
  } else rescueCtx = true;

  if (rescueCtx) {
    if (window.matchMedia && window.matchMedia(NAVIGATOR_SETTINGS_DARK_THEME_NEEDLE).matches) toggleTheme(THEME_CONFIG.DARK_THEME);
    else toggleTheme(THEME_CONFIG.LIGHT_THEME);
  }
}

export default initializeTheme;
