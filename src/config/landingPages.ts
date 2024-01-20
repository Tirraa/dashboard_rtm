import type { LandingPageCategory } from '@/types/LandingPage';

export type TLandingPagesConfig = {
  TESTING_CATEGORY: typeof TESTING_CATEGORY;
  ENABLE_DRAFTS_IN_PROD: boolean;
};

const TESTING_CATEGORY = 'testing' as const satisfies LandingPageCategory;
const LandingPagesConfig: TLandingPagesConfig = {
  ENABLE_DRAFTS_IN_PROD: false,
  TESTING_CATEGORY
} as const;

export default LandingPagesConfig;
