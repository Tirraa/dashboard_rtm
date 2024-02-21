import type { PagePath, PageRoot } from '@/types/Page';
import type { Page } from 'contentlayer/generated';

import { allPages } from 'contentlayer/generated';

export type PagesConfigType = {
  SKIP_AUTOMOUNT: { prefixes: string[]; paths: PagePath[] };
  TESTING_ROOT: typeof TESTING_ROOT;
  ENABLE_DRAFTS_IN_PROD: boolean;
  allPages: () => Page[];
};

const TESTING_ROOT = 'testing-pages-root' as const satisfies PageRoot;
const PagesConfig: PagesConfigType = {
  SKIP_AUTOMOUNT: { paths: ['index'], prefixes: [] },
  ENABLE_DRAFTS_IN_PROD: false,
  allPages: () => allPages,
  TESTING_ROOT
} as const;

export default PagesConfig;
