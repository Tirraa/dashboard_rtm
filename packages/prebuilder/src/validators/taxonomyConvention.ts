import { MAX_TAXONOMY_LEN } from '@/config';

function isValidTaxonomy(s: string): boolean {
  if (s.length > MAX_TAXONOMY_LEN) return false;
  const regex = /^[a-z0-9][-a-z0-9]*$/;
  return regex.test(s.toLowerCase());
}

export const NAMING_CONSTRAINTS_MSG = `Only dashes and alphanumeric characters are allowed, with the requirement that the first character MUST be a letter or a digit. Also, the maximum length allowed is: ${MAX_TAXONOMY_LEN} characters.`;

export default isValidTaxonomy;
