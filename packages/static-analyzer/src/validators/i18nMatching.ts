import { BLOG_CATEGORIES_I18N_ROOT_KEY, I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS, LIST_ELEMENT_PREFIX } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import checkCategories from '../lib/checkCategories';
import checkSubCategories from '../lib/checkSubCategories';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import prefixFeedback from '../lib/prefixFeedback';
import { CategoriesMetadatas, Category, ErrorsDetectionFeedback, I18nJSONPart } from '../types/metadatas';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

export function declaredI18nValidator(
  sysData: CategoriesMetadatas,
  i18nBlogCategoriesData: I18nJSONPart,
  i18nConfigFilePath: string
): '' | ErrorsDetectionFeedback {
  const ERROR_PREFIX_TAIL = `(${i18nConfigFilePath})`;
  let feedback = '';

  const i18nCategoriesKeys = Object.keys(i18nBlogCategoriesData);
  const i18nCategoriesMetadatas: CategoriesMetadatas = {};
  const requiredExtraFields = I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS;
  const missingFields: Record<Category, string[]> = {};

  for (const i18nCategoryKey of i18nCategoriesKeys) {
    i18nCategoriesMetadatas[i18nCategoryKey] = Object.keys(i18nBlogCategoriesData[i18nCategoryKey]);

    for (const requiredExtraField of requiredExtraFields) {
      if (!i18nCategoriesMetadatas[i18nCategoryKey].includes(requiredExtraField)) {
        if (!missingFields[i18nCategoryKey]) missingFields[i18nCategoryKey] = [];
        missingFields[i18nCategoryKey].push(requiredExtraField);
      }
    }
  }

  Object.keys(missingFields).forEach((categoryWithMissingI18nReqFields) => {
    const missingKeys = missingFields[categoryWithMissingI18nReqFields];
    feedback += getErrorLabelForDefects(
      missingKeys,
      `Missing required i18n field for the '${categoryWithMissingI18nReqFields}' category from '${BLOG_CATEGORIES_I18N_ROOT_KEY}': ${missingKeys}` +
        '\n',
      `Missing required i18n fields for the '${categoryWithMissingI18nReqFields}' category from '${BLOG_CATEGORIES_I18N_ROOT_KEY}': ${LIST_ELEMENT_PREFIX}${missingKeys.join(
        LIST_ELEMENT_PREFIX
      )}` + '\n'
    );
  });

  Object.keys(i18nCategoriesMetadatas).forEach((k) => {
    i18nCategoriesMetadatas[k] = i18nCategoriesMetadatas[k].filter((v) => !requiredExtraFields.includes(v));
  });
  feedback += checkCategories(Object.keys(sysData), i18nCategoriesKeys);
  feedback = checkSubCategories(sysData, i18nCategoriesMetadatas, feedback);
  feedback = prefixFeedback(feedback, ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL + '\n');
  return feedback;
}

export default declaredI18nValidator;
