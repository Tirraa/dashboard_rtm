export function isValidCategoryOrSubcategory(s: string): boolean {
  const regex = /^(?=.*[a-z0-9])[-_a-z0-9]+$/;
  return regex.test(s.toLowerCase());
}

export const NAMING_CONSTRAINTS_MSG =
  'Only dashes, underscores and alphanumerical characters are allowed! You also MUST use at least one letter or digit.';

export default isValidCategoryOrSubcategory;
