import { WarningMessage } from '@/errors/vocab/types';

type TExecutionContextWarningsVocab = {
  UNABLE_TO_GET_NODE_ENV: WarningMessage;
  UNABLE_TO_INFER_DEV_CTX: WarningMessage;
  UNABLE_TO_INFER_TEST_CTX: WarningMessage;
  FAILED_TO_INFER_CTX: WarningMessage;
};

const PREFIX = 'Execution context inference warning:';
const EXECUTION_CONTEXT_WARNINGS_VOCAB: TExecutionContextWarningsVocab = {
  UNABLE_TO_GET_NODE_ENV: "Unable to get process.env.NODE_ENV value! 'PROD' will be initialized to True.'",
  UNABLE_TO_INFER_DEV_CTX: "Unable to infer whether the execution context is a development context or not. 'PROD' will be initialized to True.",
  UNABLE_TO_INFER_TEST_CTX: "Unable to infer whether the execution context is a test context or not. 'TEST' will be initialized to False.",
  FAILED_TO_INFER_CTX: "Failed to infer the execution context. 'PROD' will be initialized to True."
} as const;

export const executionContextWarningsVocabGetter = (key: keyof TExecutionContextWarningsVocab): WarningMessage =>
  PREFIX + ' ' + EXECUTION_CONTEXT_WARNINGS_VOCAB[key];

export default executionContextWarningsVocabGetter;
