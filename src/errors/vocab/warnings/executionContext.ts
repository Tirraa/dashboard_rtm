import type { WarningMessage } from '@/errors/vocab/types';

type TExecutionContextWarningsVocab = {
  UNABLE_TO_GET_NODE_ENV: WarningMessage;
  FAILED_TO_INFER_CTX: WarningMessage;
};

const PREFIX = 'Execution context inference warning:';
const EXECUTION_CONTEXT_WARNINGS_VOCAB: TExecutionContextWarningsVocab = {
  UNABLE_TO_GET_NODE_ENV: "unable to get process.env.NODE_ENV value! 'PROD' will be initialized to True.'",
  FAILED_TO_INFER_CTX: "failed to infer the execution context. 'PROD' will be initialized to True."
} as const;

const executionContextWarningsVocabGetter = (key: keyof TExecutionContextWarningsVocab): WarningMessage =>
  PREFIX + ' ' + EXECUTION_CONTEXT_WARNINGS_VOCAB[key];

export default executionContextWarningsVocabGetter;
