// Stryker disable all

import LandingPagesConfig from '@/config/landingPages';

type ComputedLandingPagesCtxType = {
  ALLOWED_DRAFTS: boolean;
  TESTING: boolean;
};

const TESTING = process.env.NODE_ENV === 'test';
const ALLOWED_DRAFTS = LandingPagesConfig.ENABLE_DRAFTS_IN_PROD || process.env.NODE_ENV === 'development';

const ComputedLandingPagesCtx: ComputedLandingPagesCtxType = {
  ALLOWED_DRAFTS,
  TESTING
} as const;

export default ComputedLandingPagesCtx;

// Stryker restore all
