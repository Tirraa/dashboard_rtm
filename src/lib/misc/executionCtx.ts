import executionContextWarningsVocabAccessor from '@/errors/warnings/executionContext';

type TNextCtx = {
  DEV: boolean;
  PROD: boolean;
};

const NODE_DEV_ENV = 'dev';
const DEV = process.env.NODE_ENV?.startsWith(NODE_DEV_ENV);
if (DEV === undefined) console.warn(executionContextWarningsVocabAccessor('UNABLE_TO_INFER_DEV_CTX'));

export const NextCtx: TNextCtx = {
  DEV: DEV || false,
  PROD: !DEV
} as const;
