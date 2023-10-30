import { LIST_ELEMENT_PREFIX } from '../config';
import {
  CategoriesMetadatas,
  Category,
  DeclaredCategoriesMetadatas,
  ErrorsDetectionFeedback,
  MaybeEmptyErrorsDetectionFeedback
} from '../types/metadatas';
import getErrorLabelForDefects from './getErrorLabelForDefects';

export function checkSubcategories(sysData: CategoriesMetadatas, userDeclaredData: DeclaredCategoriesMetadatas): MaybeEmptyErrorsDetectionFeedback {
  let feedback: ErrorsDetectionFeedback = '';
  const sysCategories = Object.keys(sysData);
  const userDeclaredCategories = Object.keys(userDeclaredData);
  const missingDeclaredSubcategories: CategoriesMetadatas = {};
  const unknownSubcategories: Record<Category, string[]> = {};

  for (const category of sysCategories) {
    if (!userDeclaredCategories.includes(category)) continue;

    const currentSubcategories = userDeclaredData[category];
    for (const subcategory of currentSubcategories) {
      if (!sysData[category].includes(subcategory)) {
        if (!unknownSubcategories[category]) unknownSubcategories[category] = [];
        unknownSubcategories[category].push(subcategory);
      }
    }
  }

  const categoriesWithDefects = Object.keys(unknownSubcategories);
  if (categoriesWithDefects.length > 0) {
    for (const categoryWithDefect of categoriesWithDefects) {
      const currentUnknownSubcategories = unknownSubcategories[categoryWithDefect];
      feedback += getErrorLabelForDefects(
        currentUnknownSubcategories,
        `Unknown blog subcategory for the '${categoryWithDefect}' category: ${unknownSubcategories}` + '\n',
        `Unknown blog subcategories for the '${categoryWithDefect}' category: ${LIST_ELEMENT_PREFIX}${currentUnknownSubcategories.join(
          LIST_ELEMENT_PREFIX
        )}` + '\n'
      );

      feedback += getErrorLabelForDefects(
        sysData[categoryWithDefect],
        `Available subcategory for the '${categoryWithDefect}' category: ${sysData[categoryWithDefect]}` + '\n',
        `Available subcategories for the '${categoryWithDefect}' category: ${LIST_ELEMENT_PREFIX}${sysData[categoryWithDefect].join(
          LIST_ELEMENT_PREFIX
        )}` + '\n'
      );
    }
  }

  for (const category of userDeclaredCategories) {
    if (!sysCategories.includes(category)) continue;
    const currentSubcategories = sysData[category];
    for (const subcategory of currentSubcategories) {
      if (!userDeclaredData[category].includes(subcategory)) {
        if (!missingDeclaredSubcategories[category]) missingDeclaredSubcategories[category] = [];
        missingDeclaredSubcategories[category].push(subcategory);
      }
    }
  }

  const categoriesWithMissingDeclaredSubcategories = Object.keys(missingDeclaredSubcategories);
  if (categoriesWithMissingDeclaredSubcategories.length > 0) {
    if (feedback) feedback += '\n';
    feedback += 'Blog subcategories keys must be exhaustive!' + '\n';
    for (const categoryWithMissingDeclaredSubcategories of categoriesWithMissingDeclaredSubcategories) {
      const missingKeys = missingDeclaredSubcategories[categoryWithMissingDeclaredSubcategories];
      feedback += getErrorLabelForDefects(
        missingKeys,
        `Missing key for the '${categoryWithMissingDeclaredSubcategories}' category: ${missingKeys}` + '\n',
        `Missing keys for the '${categoryWithMissingDeclaredSubcategories}' category: ${LIST_ELEMENT_PREFIX}${missingKeys.join(
          LIST_ELEMENT_PREFIX
        )}` + '\n'
      );
    }
  }

  return feedback;
}

export default checkSubcategories;
