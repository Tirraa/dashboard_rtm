import {
  BLOG_CATEGORIES_I18N_ROOT_KEY,
  I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS,
  I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS,
  LIST_ELEMENT_PREFIX
} from '../config';
import { CRITICAL_ERRORS_STR, UPDATE_THE_BLOG_CATEGORIES_OBJECT } from '../config/vocab';
import checkCategories from '../lib/checkCategories';
import checkSubcategories from '../lib/checkSubcategories';
import { foldFeedbacks, prefixFeedback } from '../lib/feedbacksMerge';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import type {
  CategoriesMetadatas,
  Category,
  I18nJSONPart,
  MaybeEmptyErrorsDetectionFeedback,
  Path,
  Subcategory,
  UnknownI18nJSONObj,
  i18nField
} from '../types/metadatas';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

function checkCategoriesDataType(sysData: CategoriesMetadatas, i18nBlogCategoriesData: I18nJSONPart): MaybeEmptyErrorsDetectionFeedback {
  let feedback = '';
  const i18nCategoriesKeys = Object.keys(i18nBlogCategoriesData);

  for (const currentCategory of i18nCategoriesKeys) {
    const sysSubcategs = sysData[currentCategory];
    if (!sysSubcategs) continue;

    const currentCategoryI18nData = i18nBlogCategoriesData[currentCategory] as UnknownI18nJSONObj;
    if (typeof currentCategoryI18nData !== 'object') {
      feedback += `Invalid data for the '${currentCategory}' category: "${currentCategoryI18nData}" is NOT an object!`;
    }
  }
  if (feedback) feedback += '\n';

  return feedback;
}

function populateI18nCategoriesMetadatas(
  i18nCategoriesMetadatas: CategoriesMetadatas,
  sysData: CategoriesMetadatas,
  i18nBlogCategoriesData: I18nJSONPart,
  i18nCategoriesKeys: i18nField[]
) {
  for (const i18nCategoryKey of i18nCategoriesKeys) {
    if (!sysData[i18nCategoryKey]) continue;
    i18nCategoriesMetadatas[i18nCategoryKey] = Object.keys(i18nBlogCategoriesData[i18nCategoryKey]);
    if (typeof i18nBlogCategoriesData[i18nCategoryKey] !== 'object') i18nCategoriesMetadatas[i18nCategoryKey] = [];
  }
}

function checkCategoriesMissingRequiredI18nFields(
  sysData: CategoriesMetadatas,
  i18nCategoriesMetadatas: CategoriesMetadatas,
  i18nCategoriesKeys: i18nField[],
  requiredExtraFields: i18nField[]
): MaybeEmptyErrorsDetectionFeedback {
  let feedback = '';

  const missingFields: Record<Category, i18nField[]> = {};
  for (const i18nCategoryKey of i18nCategoriesKeys) {
    if (!sysData[i18nCategoryKey]) continue;

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

  return feedback;
}

function checkSubcategoriesMissingRequiredI18nFields(
  sysData: CategoriesMetadatas,
  i18nBlogCategoriesData: I18nJSONPart,
  i18nCategoriesKeys: i18nField[],
  requiredSubcategoryFields: i18nField[]
): MaybeEmptyErrorsDetectionFeedback {
  let feedback = '';

  const missingSubcategoryFields: Record<Category, Record<Subcategory, i18nField[]>> = {};
  for (const currentCategory of i18nCategoriesKeys) {
    const sysSubcategs = sysData[currentCategory];
    if (!sysSubcategs) continue;

    for (const currentExpectedSubcategory of sysSubcategs) {
      const currentCategoryI18nData = i18nBlogCategoriesData[currentCategory] as UnknownI18nJSONObj;
      if (typeof currentCategoryI18nData !== 'object') break;

      if (!currentCategoryI18nData) continue;
      if (!currentCategoryI18nData[currentExpectedSubcategory]) continue;

      const currentSubcategoryI18nMetadatas = Object.keys(currentCategoryI18nData[currentExpectedSubcategory] as UnknownI18nJSONObj);

      for (const requiredSubcategoryField of requiredSubcategoryFields) {
        if (!currentSubcategoryI18nMetadatas.includes(requiredSubcategoryField)) {
          if (!missingSubcategoryFields[currentCategory]) missingSubcategoryFields[currentCategory] = {};
          if (!missingSubcategoryFields[currentCategory][currentExpectedSubcategory])
            missingSubcategoryFields[currentCategory][currentExpectedSubcategory] = [];
          missingSubcategoryFields[currentCategory][currentExpectedSubcategory].push(requiredSubcategoryField);
        }
      }
    }
  }

  Object.keys(missingSubcategoryFields).forEach((categoryWithDefects) => {
    Object.keys(missingSubcategoryFields[categoryWithDefects]).forEach((subcategoryWithDefects) => {
      const missingSubcategoryKeys = missingSubcategoryFields[categoryWithDefects][subcategoryWithDefects];
      feedback += getErrorLabelForDefects(
        missingSubcategoryKeys,
        `Missing required i18n field for the '${subcategoryWithDefects}' subcategory from '${BLOG_CATEGORIES_I18N_ROOT_KEY}.${categoryWithDefects}': ${missingSubcategoryKeys}` +
          '\n',
        `Missing required i18n fields for the '${subcategoryWithDefects}' subcategory from '${BLOG_CATEGORIES_I18N_ROOT_KEY}.${categoryWithDefects}': ${LIST_ELEMENT_PREFIX}${missingSubcategoryKeys.join(
          LIST_ELEMENT_PREFIX
        )}` + '\n'
      );
    });
  });

  return feedback;
}

function removeFieldsFromCategoriesMetadatasObj(i18nCategoriesMetadatas: CategoriesMetadatas, ignoredFields: i18nField[]) {
  Object.keys(i18nCategoriesMetadatas).forEach((k) => {
    i18nCategoriesMetadatas[k] = i18nCategoriesMetadatas[k].filter((v) => !ignoredFields.includes(v));
  });
}

export function declaredI18nValidator(
  sysData: CategoriesMetadatas,
  i18nBlogCategoriesData: I18nJSONPart,
  i18nSchemaFilePath: Path
): MaybeEmptyErrorsDetectionFeedback {
  const ERROR_PREFIX_TAIL = `(${i18nSchemaFilePath})`;

  const i18nCategoriesKeys = Object.keys(i18nBlogCategoriesData);
  const i18nCategoriesMetadatas: CategoriesMetadatas = {};
  const requiredExtraFieldsForCategories = I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS;
  const requiredExtraFieldsForSubcategories = I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS;

  populateI18nCategoriesMetadatas(i18nCategoriesMetadatas, sysData, i18nBlogCategoriesData, i18nCategoriesKeys);

  const checkCategoriesDataTypeFeedback = checkCategoriesDataType(sysData, i18nBlogCategoriesData);
  const checkCategoriesMissingRequiredI18nFieldsFeedback = checkCategoriesMissingRequiredI18nFields(
    sysData,
    i18nCategoriesMetadatas,
    i18nCategoriesKeys,
    requiredExtraFieldsForCategories
  );
  const checkSubcategoriesMissingRequiredI18nFieldsFeedback = checkSubcategoriesMissingRequiredI18nFields(
    sysData,
    i18nBlogCategoriesData,
    i18nCategoriesKeys,
    requiredExtraFieldsForSubcategories
  );

  removeFieldsFromCategoriesMetadatasObj(i18nCategoriesMetadatas, requiredExtraFieldsForCategories);
  let checkCategoriesFeedback: MaybeEmptyErrorsDetectionFeedback = checkCategories(Object.keys(sysData), i18nCategoriesKeys);
  if (checkCategoriesFeedback) checkCategoriesFeedback += UPDATE_THE_BLOG_CATEGORIES_OBJECT + '\n';

  let checkSubcategoriesFeedback: MaybeEmptyErrorsDetectionFeedback = checkSubcategories(sysData, i18nCategoriesMetadatas);
  if (checkSubcategoriesFeedback) checkSubcategoriesFeedback += UPDATE_THE_BLOG_CATEGORIES_OBJECT + '\n';

  const feedback = prefixFeedback(
    foldFeedbacks(
      checkCategoriesDataTypeFeedback,
      checkCategoriesMissingRequiredI18nFieldsFeedback,
      checkSubcategoriesMissingRequiredI18nFieldsFeedback,
      checkCategoriesFeedback,
      checkSubcategoriesFeedback
    ),
    ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL + '\n'
  );

  return feedback;
}

export default declaredI18nValidator;
