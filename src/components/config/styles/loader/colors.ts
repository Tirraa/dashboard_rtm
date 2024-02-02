/* v8 ignore start */
// Stryker disable all
type LoaderConfigType = {
  BACKGROUND_COLOR: string;
  COLOR: string;
};

const COLOR = '#42546E';
const BACKGROUND_COLOR = '#000';

const LOADER_CONFIG: LoaderConfigType = {
  BACKGROUND_COLOR,
  COLOR
} as const;

export default LOADER_CONFIG;
// Stryker restore all
/* v8 ignore stop */
