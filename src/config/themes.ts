type ColorScheme = 'light' | 'dark';
type ThemeVariantKey = 'LIGHT' | 'DARK';
type ThemeConfig = Record<'VARIANTS', Record<ThemeVariantKey, string>> & Record<'VARIANTS_COLORS_SCHEME', Record<ThemeVariantKey, ColorScheme>>;

const THEME_CONFIG = {
  VARIANTS: {
    LIGHT: 'light',
    DARK: 'dark'
  },

  VARIANTS_COLORS_SCHEME: {
    LIGHT: 'light',
    DARK: 'dark'
  }
} as const satisfies ThemeConfig;

const DEFAULT_VARIANT_KEY: ThemeVariantKey = 'LIGHT';

type ThemeVariant = (typeof THEME_CONFIG.VARIANTS)[keyof typeof THEME_CONFIG.VARIANTS];

export const DEFAULT_DARK_VARIANT: ThemeVariant = 'dark';
const DEFAULT_LIGHT_VARIANT: ThemeVariant = THEME_CONFIG.VARIANTS[DEFAULT_VARIANT_KEY];
export const DEFAULT_VARIANT: ThemeVariant = DEFAULT_LIGHT_VARIANT;
export const DEFAULT_VARIANT_COLOR_SCHEME: ColorScheme = THEME_CONFIG.VARIANTS_COLORS_SCHEME[DEFAULT_VARIANT_KEY];

// export const THEME_VARIANTS: ThemeVariant[] = Object.values(THEME_CONFIG.VARIANTS);
