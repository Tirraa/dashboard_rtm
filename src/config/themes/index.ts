enum EThemeVariants {
  LIGHT,
  DARK
}
type ThemeVariantKey = keyof typeof EThemeVariants;
type ThemeConfig = Record<string, string> | Record<'VARIANTS', Record<ThemeVariantKey, string>>;

export const THEME_CONFIG = {
  LOCAL_STORAGE_THEME_KEY: 'theme',
  VARIANTS: {
    LIGHT: 'light',
    DARK: 'dark'
  }
} as const satisfies ThemeConfig;

export type ThemeVariant = (typeof THEME_CONFIG.VARIANTS)[keyof typeof THEME_CONFIG.VARIANTS];

export const VARIANTS_CLS = Object.values(THEME_CONFIG.VARIANTS);

export const DEFAULT_LIGHT_VARIANT: ThemeVariant = 'light';
export const DEFAULT_DARK_VARIANT: ThemeVariant = 'dark';
export const PHANTOM_VARIANT: ThemeVariant = DEFAULT_LIGHT_VARIANT;

export default THEME_CONFIG;
