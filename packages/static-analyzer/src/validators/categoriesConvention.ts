export function isValidCategoryOrSubcategory(s: string): boolean {
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}

export const NAMING_CONSTRAINTS_MSG =
  'Only dashes and alphanumeric characters are allowed, with the requirement that the first character MUST be a letter or a digit.';

export default isValidCategoryOrSubcategory;
