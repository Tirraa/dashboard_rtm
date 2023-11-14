type TLoaderConfig = {
  COLOR: string;
  BACKGROUND_COLOR: string;
};

const COLOR = '#42546E';
const BACKGROUND_COLOR = '#000';

export const LOADER_CONFIG: TLoaderConfig = {
  COLOR,
  BACKGROUND_COLOR
} as const;

export default LOADER_CONFIG;
