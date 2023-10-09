import THEME_CONFIG, { DEFAULT_VARIANT, MaybeThemeVariant, MaybeValidThemeVariant, ThemeVariant, VARIANTS_CLS } from '@/config/themes';
import { resetTheme } from '@/themes/initializeTheme';

interface SelectThemeOptions {
  dontDispatchEvent?: boolean;
}

namespace memos {
  export const oldSavedTheme: { current: MaybeValidThemeVariant } = { current: '' };
}

export const resetLazinessMemory = () => (memos.oldSavedTheme.current = '');
export const getOldSavedThemeFromLazinessMemory = () => memos.oldSavedTheme.current;

export const isValidVariantCls = (themeCls: MaybeValidThemeVariant) => typeof themeCls === 'string' && VARIANTS_CLS.includes(themeCls as any);

export const getThemeFromLocalStorageUnstrict = (): MaybeValidThemeVariant => window.localStorage.getItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY);

export function getThemeFromLocalStorageStrict(): MaybeThemeVariant {
  const unsafeThemeValue = getThemeFromLocalStorageUnstrict();

  if (isValidVariantCls(unsafeThemeValue)) return unsafeThemeValue as MaybeThemeVariant;

  resetTheme();
  return getThemeFromLocalStorageUnstrict() as MaybeThemeVariant;
}

export function selectTheme(themeCls: ThemeVariant, { dontDispatchEvent }: SelectThemeOptions = { dontDispatchEvent: false }): void {
  const saveTheme = (themeCls: ThemeVariant) => {
    if (memos.oldSavedTheme.current === themeCls) return;
    window.localStorage.setItem(THEME_CONFIG.LOCAL_STORAGE_THEME_KEY, themeCls);
    if (!dontDispatchEvent) window.dispatchEvent(new Event('storage'));
    memos.oldSavedTheme.current = themeCls;
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
