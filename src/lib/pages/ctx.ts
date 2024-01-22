import PagesConfig from '@/config/pages';

import ComputedNodeCtx from '../portable/node/env';

type TComputedPagesCtx = {
  ALLOWED_DRAFTS: boolean;
  TESTING: boolean;
};

const TESTING = ComputedNodeCtx.TEST;
const ALLOWED_DRAFTS = PagesConfig.ENABLE_DRAFTS_IN_PROD || ComputedNodeCtx.DEV;

const ComputedPagesCtx: TComputedPagesCtx = {
  ALLOWED_DRAFTS,
  TESTING
} as const;

export default ComputedPagesCtx;
