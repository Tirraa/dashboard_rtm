import { MAX_BLOG_TAXONOMY_LEN, MAX_PAGE_TAXONOMY_LEN, MAX_LP_TAXONOMY_LEN } from '../config';

export function isValidBlogTaxonomy(s: string, __MAX_LEN: number = MAX_BLOG_TAXONOMY_LEN): boolean {
  if (s.length > __MAX_LEN) return false;
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}

export function isValidLpTaxonomy(s: string, __MAX_LEN: number = MAX_LP_TAXONOMY_LEN): boolean {
  if (s.length > __MAX_LEN) return false;
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}

export function isValidPageTaxonomy(s: string, __MAX_LEN: number = MAX_PAGE_TAXONOMY_LEN): boolean {
  if (s.length > __MAX_LEN) return false;
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}
