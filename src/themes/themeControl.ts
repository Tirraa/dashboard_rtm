import THEME_CONFIG, { DEFAULT_VARIANT, ThemeVariant, VARIANTS_CLS } from '@/config/themes';
import initializeTheme from './retrieveOrInferTheme';

export const isValidVariantCls = (themeCls: string | null) => typeof themeCls === 'string' && VARIANTS_CLS.includes(themeCls as any);

export const getThemeFromLocalStorage = (): string | null => window.localStorage.getItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY);

export function selectTheme(themeCls: ThemeVariant): void {
  const saveTheme = (themeCls: ThemeVariant) => window.localStorage.setItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY, themeCls);

  function doSelectTheme(themeCls: ThemeVariant) {
    if (!isValidVariantCls(themeCls)) {
      initializeTheme();
      return;
    }

    for (const variantCls of VARIANTS_CLS) {
      if (!variantCls) continue;
      document.documentElement.classList.remove(variantCls);
    }

    if (themeCls && themeCls !== DEFAULT_VARIANT) document.documentElement.classList.add(themeCls);
    saveTheme(themeCls);
  }

  const process = (themeCls: ThemeVariant): void => doSelectTheme(themeCls);

  process(themeCls);
}
