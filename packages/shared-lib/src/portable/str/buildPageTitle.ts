function buildPageTitle(productTitle: string, pageTitle: string, isHomepage: boolean = false): string {
  const sep = ' | ';
  if (isHomepage) return productTitle + sep + pageTitle;
  return pageTitle + sep + productTitle;
}

export default buildPageTitle;
