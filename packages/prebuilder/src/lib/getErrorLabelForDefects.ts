import type { ErrorsDetectionFeedback } from '../types/metadatas';

function getErrorLabelForDefects(defectsList: unknown[], eSingular: string, ePlural: string): ErrorsDetectionFeedback {
  if (defectsList.length === 1) return eSingular;
  return ePlural;
}

export default getErrorLabelForDefects;
