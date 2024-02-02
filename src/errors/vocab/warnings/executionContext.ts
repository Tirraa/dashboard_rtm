import type { WarningMessage } from '@/errors/vocab/types';

type ExecutionContextWarningsVocabType = {
  UNABLE_TO_GET_NODE_ENV: WarningMessage;
  FAILED_TO_INFER_CTX: WarningMessage;
};

// Stryker Workaround 1. Pointless mutant.
// Stryker disable next-line StringLiteral
const PREFIX = 'Execution context inference warning:';
const EXECUTION_CONTEXT_WARNINGS_VOCAB: ExecutionContextWarningsVocabType = {
  UNABLE_TO_GET_NODE_ENV: "unable to get process.env.NODE_ENV value! 'PROD' will be initialized to True.'",
  FAILED_TO_INFER_CTX: "failed to infer the execution context. 'PROD' will be initialized to True."
} as const;

const executionContextWarningsVocabGetter = (key: keyof ExecutionContextWarningsVocabType): WarningMessage =>
  // Stryker Workaround 2. Pointless mutant.
  // Stryker disable next-line StringLiteral
  PREFIX + ' ' + EXECUTION_CONTEXT_WARNINGS_VOCAB[key];

export default executionContextWarningsVocabGetter;
