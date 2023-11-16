import type { MaybeObjectValue } from '@/types/CustomUtilitaryTypes';
import executionContextWarningsVocabGetter from '../../../errors/vocab/warnings/executionContext';

type TComputedNodeEnv = {
  PROD: boolean;
  DEV: boolean;
  TEST: boolean;
};

const [NODE_PROD_ENV_NEEDLE, NODE_DEV_ENV_NEEDLE, NODE_TEST_ENV_NEEDLE] = ['prod', 'dev', 'test'];
const NODE_ENV = process.env.NODE_ENV;

let devCtx: MaybeObjectValue<boolean> = NODE_ENV ? NODE_ENV.startsWith(NODE_DEV_ENV_NEEDLE) : undefined;
let testCtx: MaybeObjectValue<boolean> = NODE_ENV ? NODE_ENV.startsWith(NODE_TEST_ENV_NEEDLE) : undefined;
let prodCtx: MaybeObjectValue<boolean> = NODE_ENV ? NODE_ENV.startsWith(NODE_PROD_ENV_NEEDLE) : undefined;
let forcedToProd: boolean = Boolean(prodCtx);

if (NODE_ENV === undefined) {
  console.warn(executionContextWarningsVocabGetter('UNABLE_TO_GET_NODE_ENV'));
  forcedToProd = true;
}

if (forcedToProd) {
  devCtx = false;
  testCtx = false;
}

if (devCtx === undefined) {
  console.warn(executionContextWarningsVocabGetter('UNABLE_TO_INFER_DEV_CTX'));
  forcedToProd = true;
  devCtx = false;
}

if (testCtx === undefined) {
  console.warn(executionContextWarningsVocabGetter('UNABLE_TO_INFER_TEST_CTX'));
  testCtx = false;
}

if ([devCtx, testCtx, prodCtx, forcedToProd].every((v) => Boolean(v) === false)) {
  console.warn(executionContextWarningsVocabGetter('FAILED_TO_INFER_CTX'));
  forcedToProd = true;
}

export const ComputedNodeCtx: TComputedNodeEnv = {
  PROD: forcedToProd || !testCtx ? !devCtx : false,
  DEV: !forcedToProd ? devCtx : false,
  TEST: !forcedToProd ? testCtx : false
} as const;

export default ComputedNodeCtx;
