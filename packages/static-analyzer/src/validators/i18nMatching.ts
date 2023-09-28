import {
  BLOG_CATEGORIES_I18N_ROOT_KEY,
  I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS,
  I18N_SUBCATEGORIES_REQUIRED_FIELDS,
  LIST_ELEMENT_PREFIX
} from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import checkCategories from '../lib/checkCategories';
import checkSubCategories from '../lib/checkSubCategories';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import prefixFeedback from '../lib/prefixFeedback';
import { CategoriesMetadatas, Category, ErrorsDetectionFeedback, I18nJSONPart, SubCategory, UnknownI18nJSONObj } from '../types/metadatas';

const { FAILED_TO_PASS: ERROR_PREFIX, INTERRUPTED: INTERRUPTION_SUFFIX } = CRITICAL_ERRORS_STR;

export function declaredI18nValidator(
  sysData: CategoriesMetadatas,
  i18nBlogCategoriesData: I18nJSONPart,
  i18nConfigFilePath: string
): '' | ErrorsDetectionFeedback {
  const ERROR_PREFIX_TAIL = `(${i18nConfigFilePath})`;
  let feedback: ErrorsDetectionFeedback = '';

  const i18nCategoriesKeys = Object.keys(i18nBlogCategoriesData);
  const i18nCategoriesMetadatas: CategoriesMetadatas = {};
  const requiredExtraFields = I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS;
  const requiredSubCategoryFields = I18N_SUBCATEGORIES_REQUIRED_FIELDS;
  const missingFields: Record<Category, string[]> = {};

  for (const i18nCategoryKey of i18nCategoriesKeys) {
    if (!sysData[i18nCategoryKey]) continue;
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

  const missingSubCategoryFields: Record<Category, Record<SubCategory, string[]>> = {};
  for (const currentCategory of i18nCategoriesKeys) {
    const sysSubCategs = sysData[currentCategory];
    if (!sysSubCategs) continue;

    for (const currentExpectedSubcategory of sysSubCategs) {
      const currentCategoryI18nData = i18nBlogCategoriesData[currentCategory] as UnknownI18nJSONObj;
      if (!currentCategoryI18nData) continue;
      const currentSubcategoryI18nMetadatas = Object.keys(currentCategoryI18nData[currentExpectedSubcategory] as UnknownI18nJSONObj);

      for (const requiredSubCategoryField of requiredSubCategoryFields) {
        if (!currentSubcategoryI18nMetadatas.includes(requiredSubCategoryField)) {
          if (!missingSubCategoryFields[currentCategory]) missingSubCategoryFields[currentCategory] = {};
          if (!missingSubCategoryFields[currentCategory][currentExpectedSubcategory])
            missingSubCategoryFields[currentCategory][currentExpectedSubcategory] = [];
          missingSubCategoryFields[currentCategory][currentExpectedSubcategory].push(requiredSubCategoryField);
        }
      }
    }

    Object.keys(missingSubCategoryFields).forEach((categoryWithDefects) => {
      Object.keys(missingSubCategoryFields[categoryWithDefects]).forEach((subCategoryWithDefects) => {
        const missingSubCategoryKeys = missingSubCategoryFields[categoryWithDefects][subCategoryWithDefects];
        feedback += getErrorLabelForDefects(
          missingSubCategoryKeys,
          `Missing required i18n field for the '${subCategoryWithDefects}' subcategory from '${BLOG_CATEGORIES_I18N_ROOT_KEY}.${categoryWithDefects}': ${missingSubCategoryKeys}` +
            '\n',
          `Missing required i18n fields for the '${subCategoryWithDefects}' subcategory from '${BLOG_CATEGORIES_I18N_ROOT_KEY}.${categoryWithDefects}': ${LIST_ELEMENT_PREFIX}${missingSubCategoryKeys.join(
            LIST_ELEMENT_PREFIX
          )}` + '\n'
        );
      });
    });
  }

  Object.keys(i18nCategoriesMetadatas).forEach((k) => {
    i18nCategoriesMetadatas[k] = i18nCategoriesMetadatas[k].filter((v) => !requiredExtraFields.includes(v));
  });
  feedback += checkCategories(Object.keys(sysData), i18nCategoriesKeys);
  feedback = checkSubCategories(sysData, i18nCategoriesMetadatas, feedback);
  feedback = prefixFeedback(feedback, ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL + '\n');
  return feedback;
}

export default declaredI18nValidator;
