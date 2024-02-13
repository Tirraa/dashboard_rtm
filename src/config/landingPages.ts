import type { LandingPageCategory } from '@/types/LandingPage';
import type { LandingPage } from 'contentlayer/generated';

export type LandingPagesConfigType = {
  allLandingPages: () => Promise<LandingPage[]>;
  TESTING_CATEGORY: typeof TESTING_CATEGORY;
  ENABLE_DRAFTS_IN_PROD: boolean;
};

const TESTING_CATEGORY = 'landing-pages-testing-category' as const satisfies LandingPageCategory;
const LandingPagesConfig: LandingPagesConfigType = {
  allLandingPages: () => import('contentlayer/generated').then((data) => data.allLandingPages),
  ENABLE_DRAFTS_IN_PROD: false,
  TESTING_CATEGORY
} as const;

export default LandingPagesConfig;
