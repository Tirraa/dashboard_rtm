import { ErrorsDetectionFeedback } from '../types/metadatas';

export function prefixFeedback(feedback: '' | ErrorsDetectionFeedback, prefix: string): '' | ErrorsDetectionFeedback {
  const prefixedFeedback = feedback ? prefix + feedback : '';
  return prefixedFeedback;
}

export function mergeFeedbacks(feedback1: '' | ErrorsDetectionFeedback, feedback2: '' | ErrorsDetectionFeedback): '' | ErrorsDetectionFeedback {
  if (feedback1 && feedback2) return feedback1 + '\n' + feedback2;
  if (!feedback1) return feedback2;
  return feedback1;
}
