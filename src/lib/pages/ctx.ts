// Stryker disable all

import PagesConfig from '@/config/pages';

type ComputedPagesCtxType = {
  ALLOWED_DRAFTS: boolean;
  TESTING: boolean;
};

const TESTING = process.env.NODE_ENV === 'test';
const ALLOWED_DRAFTS = PagesConfig.ENABLE_DRAFTS_IN_PROD || process.env.NODE_ENV === 'development';

const ComputedPagesCtx: ComputedPagesCtxType = {
  ALLOWED_DRAFTS,
  TESTING
} as const;

export default ComputedPagesCtx;

// Stryker restore all
