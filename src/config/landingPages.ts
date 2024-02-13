import type { LandingPageCategory } from '@/types/LandingPage';
import type { LandingPage } from 'contentlayer/generated';

import { allLandingPages } from 'contentlayer/generated';

export type LandingPagesConfigType = {
  TESTING_CATEGORY: typeof TESTING_CATEGORY;
  allLandingPages: () => LandingPage[];
  ENABLE_DRAFTS_IN_PROD: boolean;
};

const TESTING_CATEGORY = 'landing-pages-testing-category' as const satisfies LandingPageCategory;
const LandingPagesConfig: LandingPagesConfigType = {
  allLandingPages: () => allLandingPages,
  ENABLE_DRAFTS_IN_PROD: false,
  TESTING_CATEGORY
} as const;

export default LandingPagesConfig;
