// Stryker disable all

import BlogConfig from '@/config/blog';

import ComputedNodeCtx from '../portable/node/env';

type ComputedBlogCtxType = {
  ALLOWED_DRAFTS: boolean;
  TESTING: boolean;
};

const TESTING = ComputedNodeCtx.TEST;
const ALLOWED_DRAFTS = BlogConfig.ENABLE_DRAFTS_IN_PROD || ComputedNodeCtx.DEV;

const ComputedBlogCtx: ComputedBlogCtxType = {
  ALLOWED_DRAFTS,
  TESTING
} as const;

export default ComputedBlogCtx;

// Stryker restore all
