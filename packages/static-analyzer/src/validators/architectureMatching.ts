import { ERRORS_SUFFIXES } from '../config/vocab';
import { CategoriesMetadatas, DeclaredCategoriesMetadatas } from '../types/metadatas';

const { FAILED_TO_PASS: ERROR_PREFIX } = ERRORS_SUFFIXES;
const LIST_ELEMENT_PREFIX = '\n - ';

function checkCategories(sysCategories: string[], userDeclaredCategories: string[]): string {
  let feedback = '';

  for (const userDeclaredCategory of userDeclaredCategories) {
    if (!sysCategories.includes(userDeclaredCategory)) feedback += `Invalid user defined category key: '${userDeclaredCategory}'.` + '\n';
  }
  if (feedback) feedback += `Available keys from sys: ${LIST_ELEMENT_PREFIX}${sysCategories.join(LIST_ELEMENT_PREFIX)}` + '\n';
  return feedback;
}

function checkSubCategories(sysData: CategoriesMetadatas, userDeclaredData: DeclaredCategoriesMetadatas): string {
  let feedback = '';
  const sysCategories = Object.keys(sysData);
  const userDeclaredCategories = Object.keys(userDeclaredData);

  for (const category of sysCategories) {
    let foundUnknownSubCategoryForSomeCategory = false;
    let latestCategoryDefectFound = '';
    if (!userDeclaredCategories.includes(category)) continue;
    const currentSubcategories = userDeclaredData[category];
    for (const subcategory of currentSubcategories) {
      if (!sysData[category].includes(subcategory)) {
        if (latestCategoryDefectFound && latestCategoryDefectFound !== category) feedback += '\n';
        feedback += `Unknown subcategory: '${subcategory}' for the category: '${category}'.` + '\n';
        foundUnknownSubCategoryForSomeCategory = true;
        latestCategoryDefectFound = category;
      }
    }
    if (foundUnknownSubCategoryForSomeCategory) {
      foundUnknownSubCategoryForSomeCategory = false;
      feedback += `Available subcategories for '${category}': ${LIST_ELEMENT_PREFIX}${sysData[category].join(LIST_ELEMENT_PREFIX)}` + '\n';
    }
  }
  return feedback;
}

export function declaredBlogArchitectureValidator(sysData: CategoriesMetadatas, userDeclaredData: DeclaredCategoriesMetadatas): '' | string {
  let feedback = '';
  feedback += checkCategories(Object.keys(sysData), Object.keys(userDeclaredData));
  feedback += checkSubCategories(sysData, userDeclaredData);
  if (feedback) feedback = ERROR_PREFIX + '\n' + feedback;
  return feedback;
}

export default declaredBlogArchitectureValidator;
