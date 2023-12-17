type TLoaderConfig = {
  BACKGROUND_COLOR: string;
  COLOR: string;
};

const COLOR = '#42546E';
const BACKGROUND_COLOR = '#000';

const LOADER_CONFIG: TLoaderConfig = {
  BACKGROUND_COLOR,
  COLOR
} as const;

export default LOADER_CONFIG;
