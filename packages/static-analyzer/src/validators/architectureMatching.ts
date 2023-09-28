import { CRITICAL_ERRORS_STR } from '../config/vocab';
import checkCategories from '../lib/checkCategories';
import checkSubCategories from '../lib/checkSubCategories';
import { mergeFeedbacks, prefixFeedback } from '../lib/feedbacksMerge';
import { CategoriesMetadatas, DeclaredCategoriesMetadatas, ErrorsDetectionFeedback, MaybeEmptyErrorsDetectionFeedback } from '../types/metadatas';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

export function declaredBlogArchitectureValidator(
  sysData: CategoriesMetadatas,
  userDeclaredData: DeclaredCategoriesMetadatas,
  blogConfigFilePath: string
): MaybeEmptyErrorsDetectionFeedback {
  const ERROR_PREFIX_TAIL = `(${blogConfigFilePath})`;

  let feedback: ErrorsDetectionFeedback = '';
  feedback = checkCategories(Object.keys(sysData), Object.keys(userDeclaredData));
  const checkSubCategoriesFeedback = checkSubCategories(sysData, userDeclaredData);
  feedback = mergeFeedbacks(feedback, checkSubCategoriesFeedback);
  feedback = prefixFeedback(feedback, ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL + '\n');
  return feedback;
}

export default declaredBlogArchitectureValidator;
