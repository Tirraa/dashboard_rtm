import type { PostBase } from '@/types/Blog';
import type { AppPath } from '@rtm/shared-types/src/Next';
import { POSTS_FOLDER } from '../../../../../config/blog/documentSpecs';
import { DEFAULT_LANGUAGE } from '../../../../../config/i18n';
import ROUTES_ROOTS from '../../../../../config/routes';
import { getFlattenedPathWithoutRootFolder } from '../getFlattenedPathWithoutRootFolder';

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
