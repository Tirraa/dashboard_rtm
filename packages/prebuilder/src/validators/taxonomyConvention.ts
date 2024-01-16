import { MAX_BLOG_TAXONOMY_LEN, MAX_LP_TAXONOMY_LEN } from '../config';

export function isValidBlogTaxonomy(s: string): boolean {
  if (s.length > MAX_BLOG_TAXONOMY_LEN) return false;
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}

export function isValidLpTaxonomy(s: string): boolean {
  if (s.length > MAX_LP_TAXONOMY_LEN) return false;
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}
