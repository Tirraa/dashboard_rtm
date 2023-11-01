import type { ThemeVariant } from '@/config/themes';
import { RGBAColor } from '@/lib/color';
import Color from 'color';

type TLoaderConfig = {
  COLORS: Record<ThemeVariant, string>;
  DEFAULT_COLOR: string;
};

const DEFAULT_COLOR = RGBAColor({ r: 0, g: 0, b: 0, a: 0.4 }).hsl().string();
export const LOADER_CONFIG: TLoaderConfig = {
  COLORS: {
    dark: Color('#42546E').hex(),
    light: DEFAULT_COLOR
  },
  DEFAULT_COLOR
} as const;

export default LOADER_CONFIG;
