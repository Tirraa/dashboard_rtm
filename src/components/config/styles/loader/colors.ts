import type { ThemeVariant } from '@/config/themes';

type TLoaderConfig = {
  COLORS: Record<ThemeVariant, string>;
  DEFAULT_COLOR: string;
};

const DEFAULT_COLOR = '#00000066';
export const LOADER_CONFIG: TLoaderConfig = {
  COLORS: {
    dark: '#42546E',
    light: DEFAULT_COLOR
  },
  DEFAULT_COLOR
} as const;

export default LOADER_CONFIG;
