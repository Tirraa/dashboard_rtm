// Stryker disable all

import LandingPagesConfig from '@/config/landingPages';

import ComputedNodeCtx from '../portable/node/env';

type ComputedLandingPagesCtxType = {
  ALLOWED_DRAFTS: boolean;
  TESTING: boolean;
};

const TESTING = ComputedNodeCtx.TEST;
const ALLOWED_DRAFTS = LandingPagesConfig.ENABLE_DRAFTS_IN_PROD || ComputedNodeCtx.DEV;

const ComputedLandingPagesCtx: ComputedLandingPagesCtxType = {
  ALLOWED_DRAFTS,
  TESTING
} as const;

export default ComputedLandingPagesCtx;

// Stryker restore all
