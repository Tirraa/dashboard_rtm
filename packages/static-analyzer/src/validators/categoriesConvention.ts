export function isValidCategoryOrSubcategory(categ: string): boolean {
  const regex = /^(?=.*[a-z0-9])[-_a-z0-9]+$/;
  return regex.test(categ.toLowerCase());
}

export default isValidCategoryOrSubcategory;
