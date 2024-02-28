// Stryker disable all

import BlogConfig from '@/config/blog';

type ComputedBlogCtxType = {
  ALLOWED_DRAFTS: boolean;
  TESTING: boolean;
};

const TESTING = process.env.NODE_ENV === 'test';
const ALLOWED_DRAFTS = BlogConfig.ENABLE_DRAFTS_IN_PROD || process.env.NODE_ENV === 'development';

const ComputedBlogCtx: ComputedBlogCtxType = {
  ALLOWED_DRAFTS,
  TESTING
} as const;

export default ComputedBlogCtx;

// Stryker restore all
