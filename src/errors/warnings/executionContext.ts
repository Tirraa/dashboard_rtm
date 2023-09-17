import { WarningMessage } from '../_types';

type TExecutionContextWarningsVocab = {
  UNABLE_TO_INFER_DEV_CTX: WarningMessage;
};

const PREFIX = 'Execution Context Warning:';
const EXECUTION_CONTEXT_WARNINGS_VOCAB: TExecutionContextWarningsVocab = {
  UNABLE_TO_INFER_DEV_CTX:
    "Unable to infer whether the execution context is a development execution context or not. 'PROD' will be initialized to True."
} as const;

export const executionContextWarningsVocabAccessor = (key: keyof TExecutionContextWarningsVocab): WarningMessage =>
  PREFIX + ' ' + EXECUTION_CONTEXT_WARNINGS_VOCAB[key];
export default executionContextWarningsVocabAccessor;
