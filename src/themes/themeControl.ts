import THEME_CONFIG from '@/config/themes';

function memorizeInferedTheme(theme: string) {
  window.localStorage.setItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY, theme);
}

function flipTheme(choicedTheme: string, rejectedTheme: string) {
  if (choicedTheme) document.documentElement.classList.add(choicedTheme);
  if (rejectedTheme) document.documentElement.classList.remove(rejectedTheme);
}

function toggleDarkTheme() {
  flipTheme(THEME_CONFIG.DARK_THEME, THEME_CONFIG.LIGHT_THEME);
  memorizeInferedTheme(THEME_CONFIG.DARK_THEME);
}

function toggleLightTheme() {
  flipTheme(THEME_CONFIG.LIGHT_THEME, THEME_CONFIG.DARK_THEME);
  memorizeInferedTheme(THEME_CONFIG.LIGHT_THEME);
}

export function getThemeFromLocalStorage(): string | null {
  const currentTheme = window.localStorage.getItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY);
  return currentTheme;
}

export function toggleTheme(key?: string): string | null {
  function toggleThemeBasedOnLocalStorageFallback() {
    const currentTheme = getThemeFromLocalStorage();
    if (currentTheme !== null) {
      if (currentTheme === THEME_CONFIG.LIGHT_THEME) toggleDarkTheme();
      else if (currentTheme === THEME_CONFIG.DARK_THEME) toggleLightTheme();
    }
  }

  function processKey(key: string) {
    if (key === THEME_CONFIG.LIGHT_THEME) toggleLightTheme();
    else if (key === THEME_CONFIG.DARK_THEME) toggleDarkTheme();
    else toggleThemeBasedOnLocalStorageFallback();
  }

  if (key !== undefined) processKey(key);
  else toggleThemeBasedOnLocalStorageFallback();

  const newTheme = getThemeFromLocalStorage();
  return newTheme;
}
