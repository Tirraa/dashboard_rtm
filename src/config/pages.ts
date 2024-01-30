import type { PageRoot } from '@/types/Page';

export type TPagesConfig = {
  TESTING_ROOT: typeof TESTING_ROOT;
  ENABLE_DRAFTS_IN_PROD: boolean;
};

const TESTING_ROOT = 'testing-pages-root' as const satisfies PageRoot;
const PagesConfig: TPagesConfig = {
  ENABLE_DRAFTS_IN_PROD: false,
  TESTING_ROOT
} as const;

export default PagesConfig;
