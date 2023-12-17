import BlogConfig from '@/config/blog';

import ComputedNodeCtx from '../portable/node/env';

type TComputedBlogCtx = {
  ALLOWED_DRAFTS: boolean;
  TESTING: boolean;
};

const TESTING = ComputedNodeCtx.TEST;
const ALLOWED_DRAFTS = BlogConfig.ENABLE_DRAFTS_IN_PROD || ComputedNodeCtx.DEV;

const ComputedBlogCtx: TComputedBlogCtx = {
  ALLOWED_DRAFTS,
  TESTING
} as const;

export default ComputedBlogCtx;
