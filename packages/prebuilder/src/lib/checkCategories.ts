import type { Category, ErrorsDetectionFeedback, MaybeEmptyErrorsDetectionFeedback } from '@/types/metadatas';
import getErrorLabelForDefects from './getErrorLabelForDefects';

function checkCategories(sysCategories: Category[], userDeclaredCategories: Category[]): MaybeEmptyErrorsDetectionFeedback {
  let feedback: ErrorsDetectionFeedback = '';
  const missingDeclaredCategories = sysCategories.filter((category) => !userDeclaredCategories.includes(category));
  const unknownCategories: Category[] = [];

  for (const userDeclaredCategory of userDeclaredCategories) {
    if (!sysCategories.includes(userDeclaredCategory)) unknownCategories.push(userDeclaredCategory);
  }

  if (unknownCategories.length > 0) {
    feedback += getErrorLabelForDefects(unknownCategories, 'Unknown blog category key:', 'Unknown blog categories keys:', true);
  }

  if (feedback) feedback += getErrorLabelForDefects(sysCategories, 'Available key:', 'Available keys:', true);

  if (missingDeclaredCategories.length > 0) {
    if (feedback) feedback += '\n';
    feedback += 'Blog categories keys must be exhaustive!' + '\n';
    feedback += getErrorLabelForDefects(missingDeclaredCategories, 'Missing key:', 'Missing keys:', true);
  }
  return feedback;
}

export default checkCategories;
