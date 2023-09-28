import { MaybeEmptyErrorsDetectionFeedback } from '../types/metadatas';

export function prefixFeedback(feedback: MaybeEmptyErrorsDetectionFeedback, prefix: string): MaybeEmptyErrorsDetectionFeedback {
  const prefixedFeedback = feedback ? prefix + feedback : '';
  return prefixedFeedback;
}

export function mergeFeedbacks(
  feedback1: MaybeEmptyErrorsDetectionFeedback,
  feedback2: MaybeEmptyErrorsDetectionFeedback
): MaybeEmptyErrorsDetectionFeedback {
  if (feedback1 && feedback2) return feedback1 + '\n' + feedback2;
  if (!feedback1) return feedback2;
  return feedback1;
}

export const foldFeedbacks = (...feedbacks: MaybeEmptyErrorsDetectionFeedback[]): MaybeEmptyErrorsDetectionFeedback =>
  feedbacks.reduce((mergedFeedback, feedback) => mergeFeedbacks(mergedFeedback, feedback), '');
