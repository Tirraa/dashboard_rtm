import BlogConfig from '@/config/blog';
import ComputedNodeCtx from '../portable/node/env';

type TComputedBlogCtx = {
  TESTING: boolean;
  ALLOWED_DRAFTS: boolean;
};

const TESTING = ComputedNodeCtx.TEST;
const ALLOWED_DRAFTS = BlogConfig.ENABLE_DRAFTS_IN_PROD || ComputedNodeCtx.DEV;

const ComputedBlogCtx: TComputedBlogCtx = {
  TESTING,
  ALLOWED_DRAFTS
} as const;

export default ComputedBlogCtx;
