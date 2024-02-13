import type { PagePath, PageRoot } from '@/types/Page';
import type { Page } from 'contentlayer/generated';

import { allPages } from 'contentlayer/generated';

export type PagesConfigType = {
  TESTING_ROOT: typeof TESTING_ROOT;
  ENABLE_DRAFTS_IN_PROD: boolean;
  SKIP_SSG: PagePath<any>[];
  allPages: () => Page[];
};

const TESTING_ROOT = 'testing-pages-root' as const satisfies PageRoot;
const PagesConfig: PagesConfigType = {
  ENABLE_DRAFTS_IN_PROD: false,
  allPages: () => allPages,
  SKIP_SSG: ['index'],
  TESTING_ROOT
} as const;

export default PagesConfig;
