import { LIST_ELEMENT_PREFIX } from '../config/config';
import { Category, ErrorsDetectionFeedback } from '../types/metadatas';

export function checkCategories(sysCategories: Category[], userDeclaredCategories: Category[]): '' | ErrorsDetectionFeedback {
  let feedback = '';
  const missingDeclaredCategories = sysCategories.filter((item) => !userDeclaredCategories.includes(item));

  for (const userDeclaredCategory of userDeclaredCategories) {
    if (!sysCategories.includes(userDeclaredCategory)) feedback += `Invalid category key: '${userDeclaredCategory}'.` + '\n';
  }
  if (feedback) feedback += `Available keys from sys: ${LIST_ELEMENT_PREFIX}${sysCategories.join(LIST_ELEMENT_PREFIX)}` + '\n';

  if (missingDeclaredCategories.length > 0) {
    if (feedback) feedback += '\n';
    feedback += 'Categories keys must be exhaustive!' + '\n';
    feedback += `Missing keys from sys: ${LIST_ELEMENT_PREFIX}${missingDeclaredCategories.join(LIST_ELEMENT_PREFIX)}` + '\n';
  }
  return feedback;
}

export default checkCategories;
