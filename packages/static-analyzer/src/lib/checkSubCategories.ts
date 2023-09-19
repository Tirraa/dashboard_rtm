import { LIST_ELEMENT_PREFIX } from '../config/config';
import { CategoriesMetadatas, Category, DeclaredCategoriesMetadatas, ErrorsDetectionFeedback } from '../types/metadatas';
import getErrorLabelForDefects from './getErrorLabelForDefects';

export function checkSubCategories(
  sysData: CategoriesMetadatas,
  userDeclaredData: DeclaredCategoriesMetadatas,
  oldFeedback: ErrorsDetectionFeedback
): '' | ErrorsDetectionFeedback {
  let feedback = oldFeedback;
  const sysCategories = Object.keys(sysData);
  const userDeclaredCategories = Object.keys(userDeclaredData);
  const missingDeclaredSubCategories: CategoriesMetadatas = {};
  const unknownSubCategories: Record<Category, string[]> = {};

  for (const category of sysCategories) {
    if (!userDeclaredCategories.includes(category)) continue;
    const currentSubcategories = userDeclaredData[category];
    for (const subCategory of currentSubcategories) {
      if (!sysData[category].includes(subCategory)) {
        if (!unknownSubCategories[category]) unknownSubCategories[category] = [];
        unknownSubCategories[category].push(subCategory);
      }
    }
  }

  const categoriesWithDefect = Object.keys(unknownSubCategories);
  if (categoriesWithDefect.length > 0) {
    for (const categoryWithDefect of categoriesWithDefect) {
      const unknownSubcategories = unknownSubCategories[categoryWithDefect];
      feedback += getErrorLabelForDefects(
        unknownSubcategories,
        `Unknown subcategory for the '${categoryWithDefect}' category: ${unknownSubcategories}` + '\n',
        `Unknown subcategories for the '${categoryWithDefect}' category: ${LIST_ELEMENT_PREFIX}${unknownSubcategories.join(LIST_ELEMENT_PREFIX)}` +
          '\n'
      );

      feedback +=
        `Available subcategories for the '${categoryWithDefect}' category: ${LIST_ELEMENT_PREFIX}${sysData[categoryWithDefect].join(
          LIST_ELEMENT_PREFIX
        )}` + '\n';
    }
  }

  for (const category of userDeclaredCategories) {
    if (!sysCategories.includes(category)) continue;
    const currentSubcategories = sysData[category];
    for (const subCategory of currentSubcategories) {
      if (!userDeclaredData[category].includes(subCategory)) {
        if (!missingDeclaredSubCategories[category]) missingDeclaredSubCategories[category] = [];
        missingDeclaredSubCategories[category].push(subCategory);
      }
    }
  }

  const categoriesWithMissingDeclaredSubCategories = Object.keys(missingDeclaredSubCategories);
  if (categoriesWithMissingDeclaredSubCategories.length > 0) {
    if (feedback) feedback += '\n';
    feedback += 'Subcategories keys must be exhaustive!' + '\n';
    for (const categoryWithMissingDeclaredSubCategories of categoriesWithMissingDeclaredSubCategories) {
      const missingKeys = missingDeclaredSubCategories[categoryWithMissingDeclaredSubCategories];
      feedback += getErrorLabelForDefects(
        missingKeys,
        `Missing key from sys for the '${categoryWithMissingDeclaredSubCategories}' category: ${missingKeys}` + '\n',
        `Missing keys from sys for the '${categoryWithMissingDeclaredSubCategories}' category: ${LIST_ELEMENT_PREFIX}${missingKeys.join(
          LIST_ELEMENT_PREFIX
        )}` + '\n'
      );
    }
  }

  return feedback;
}

export default checkSubCategories;
