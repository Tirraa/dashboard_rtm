import type { PostBase } from '@/types/Blog';
import type { AppPath } from '@/types/Next';

export const buildBlogPostUrl = (post: PostBase): AppPath => {
  const OPTIONAL_LOCALE_PART_INDEX = 2;

  const flattenedPath = post._raw.flattenedPath;
  const flattenedPathParts = flattenedPath.split('/');
  if (flattenedPathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) return '/' + flattenedPath;

  const localePart = flattenedPathParts[OPTIONAL_LOCALE_PART_INDEX];
  flattenedPathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  flattenedPathParts.unshift(localePart);
  return '/' + flattenedPathParts.join('/');
};

export default buildBlogPostUrl;
