import type { Page } from 'contentlayer/generated';
import type { PageRoot } from '@/types/Page';

export type PagesConfigType = {
  TESTING_ROOT: typeof TESTING_ROOT;
  allPages: () => Promise<Page[]>;
  ENABLE_DRAFTS_IN_PROD: boolean;
};

const TESTING_ROOT = 'testing-pages-root' as const satisfies PageRoot;
const PagesConfig: PagesConfigType = {
  allPages: () => import('contentlayer/generated').then((data) => data.allPages),
  ENABLE_DRAFTS_IN_PROD: false,
  TESTING_ROOT
} as const;

export default PagesConfig;
