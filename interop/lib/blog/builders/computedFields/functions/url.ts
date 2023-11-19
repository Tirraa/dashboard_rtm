import type { PostBase } from '@/types/Blog';
import type { AppPath } from '@/types/Next';
import { DEFAULT_LANGUAGE } from '../../../../../config/i18n';
import ROUTES_ROOTS from '../../../../../config/routes';

export const buildBlogPostUrl = (post: PostBase): AppPath => {
  const OPTIONAL_LOCALE_PART_INDEX = 2;
  const root = ROUTES_ROOTS.BLOG;

  const flattenedPath = post._raw.flattenedPath;
  const flattenedPathParts = flattenedPath.split('/');
  if (flattenedPathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) return '/' + DEFAULT_LANGUAGE + root + flattenedPath;

  const localePart = flattenedPathParts[OPTIONAL_LOCALE_PART_INDEX];
  flattenedPathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  return '/' + localePart + root + flattenedPathParts.join('/');
};

export default buildBlogPostUrl;
