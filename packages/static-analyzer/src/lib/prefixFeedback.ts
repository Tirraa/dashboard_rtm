import { ErrorsDetectionFeedback } from '../types/metadatas';

export function prefixFeedback(feedback: '' | ErrorsDetectionFeedback, prefix: string): '' | ErrorsDetectionFeedback {
  const prefixedFeedback = feedback ? prefix + feedback : '';
  return prefixedFeedback;
}

export default prefixFeedback;
