import { CRITICAL_ERRORS_STR, UPDATE_THE_BLOG_ARCHITECTURE_TYPE } from '../config/vocab';
import checkCategories from '../lib/checkCategories';
import checkSubcategories from '../lib/checkSubcategories';
import { mergeFeedbacks, prefixFeedback } from '../lib/feedbacksMerge';
import { CategoriesMetadatas, DeclaredCategoriesMetadatas, MaybeEmptyErrorsDetectionFeedback } from '../types/metadatas';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

export function declaredBlogArchitectureValidator(
  sysData: CategoriesMetadatas,
  userDeclaredData: DeclaredCategoriesMetadatas,
  blogConfigFilePath: string
): MaybeEmptyErrorsDetectionFeedback {
  const ERROR_PREFIX_TAIL = `(${blogConfigFilePath})`;

  let checkCategoriesFeedback: MaybeEmptyErrorsDetectionFeedback = checkCategories(Object.keys(sysData), Object.keys(userDeclaredData));
  if (checkCategoriesFeedback) checkCategoriesFeedback += UPDATE_THE_BLOG_ARCHITECTURE_TYPE + '\n';

  let checkSubcategoriesFeedback: MaybeEmptyErrorsDetectionFeedback = checkSubcategories(sysData, userDeclaredData);
  if (checkSubcategoriesFeedback) checkSubcategoriesFeedback += UPDATE_THE_BLOG_ARCHITECTURE_TYPE + '\n';

  const feedback = prefixFeedback(mergeFeedbacks(checkCategoriesFeedback, checkSubcategoriesFeedback), ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL + '\n');
  return feedback;
}

export default declaredBlogArchitectureValidator;
