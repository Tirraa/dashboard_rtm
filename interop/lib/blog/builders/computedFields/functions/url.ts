import type { PostBase } from '@/types/Blog';
import type { AppPath } from '@rtm/shared-types/Next';
import { DEFAULT_LANGUAGE, POSTS_FOLDER, ROUTES_ROOTS, getFlattenedPathWithoutRootFolder } from '../../../unifiedImport';

export const buildBlogPostUrl = (post: PostBase): AppPath => {
  const OPTIONAL_LOCALE_PART_INDEX = 2;
  const root = ROUTES_ROOTS.BLOG;

  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, POSTS_FOLDER);
  const flattenedPathParts = flattenedPath.split('/');
  if (flattenedPathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) {
    const url = '/' + DEFAULT_LANGUAGE + root + flattenedPath;
    return url;
  }

  const localePart = flattenedPathParts[OPTIONAL_LOCALE_PART_INDEX];
  flattenedPathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  const url = '/' + localePart + root + flattenedPathParts.join('/');
  return url;
};

export default buildBlogPostUrl;
