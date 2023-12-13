import { LIST_ELEMENT_PREFIX } from '@/config';
import type { ErrorsDetectionFeedback } from '@/types/metadatas';

function getErrorLabelForDefects(
  defectsList: unknown[],
  eSingular: string,
  ePlural: string,
  autoFormatter: boolean = false
): ErrorsDetectionFeedback {
  if (defectsList.length === 1) return autoFormatter ? eSingular + ' ' + `${defectsList}` + '\n' : eSingular;
  return autoFormatter ? ePlural + ' ' + `${LIST_ELEMENT_PREFIX}${defectsList.join(LIST_ELEMENT_PREFIX)}` + '\n' : ePlural;
}

export default getErrorLabelForDefects;
