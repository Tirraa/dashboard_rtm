import { MAX_TAXONOMY_LEN } from '../config';

export function isValidBlogTaxonomy(s: string): boolean {
  if (s.length > MAX_TAXONOMY_LEN) return false;
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}
