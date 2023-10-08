import THEME_CONFIG, { DEFAULT_VARIANT, MaybeThemeVariant, MaybeValidThemeVariant, ThemeVariant, VARIANTS_CLS } from '@/config/themes';
import { resetTheme } from '@/themes/initializeTheme';

export const isValidVariantCls = (themeCls: MaybeValidThemeVariant) => typeof themeCls === 'string' && VARIANTS_CLS.includes(themeCls as any);

export const getThemeFromLocalStorageUnstrict = (): MaybeValidThemeVariant => window.localStorage.getItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY);

export function getThemeFromLocalStorageStrict(): MaybeThemeVariant {
  const unsafeThemeValue = getThemeFromLocalStorageUnstrict();

  if (isValidVariantCls(unsafeThemeValue)) return unsafeThemeValue as MaybeThemeVariant;

  resetTheme();
  return getThemeFromLocalStorageUnstrict() as MaybeThemeVariant;
}

export function selectTheme(themeCls: ThemeVariant): void {
  const saveTheme = (themeCls: ThemeVariant) => {
    window.localStorage.setItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY, themeCls);
    window.dispatchEvent(new Event('storage'));
  };

  function doSelectTheme(themeCls: ThemeVariant) {
    if (!isValidVariantCls(themeCls)) {
      resetTheme();
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
