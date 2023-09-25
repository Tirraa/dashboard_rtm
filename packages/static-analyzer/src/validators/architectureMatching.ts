import { CRITICAL_ERRORS_STR } from '../config/vocab';
import checkCategories from '../lib/checkCategories';
import checkSubCategories from '../lib/checkSubCategories';
import prefixFeedback from '../lib/prefixFeedback';
import { CategoriesMetadatas, DeclaredCategoriesMetadatas, ErrorsDetectionFeedback } from '../types/metadatas';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

export function declaredBlogArchitectureValidator(
  sysData: CategoriesMetadatas,
  userDeclaredData: DeclaredCategoriesMetadatas,
  blogConfigFilePath: string
): '' | ErrorsDetectionFeedback {
  const ERROR_PREFIX_TAIL = `(${blogConfigFilePath})`;

  let feedback: ErrorsDetectionFeedback = '';
  feedback = checkCategories(Object.keys(sysData), Object.keys(userDeclaredData));
  feedback = checkSubCategories(sysData, userDeclaredData, feedback);
  feedback = prefixFeedback(feedback, ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL + '\n');
  return feedback;
}

export default declaredBlogArchitectureValidator;
