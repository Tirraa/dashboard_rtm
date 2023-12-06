import type { PostToBuild } from '##/types/magic/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';
import { BLOG_POSTS_FOLDER, DEFAULT_LANGUAGE, ROUTES_ROOTS, getFlattenedPathWithoutRootFolder } from '../../../unifiedImport';

const buildBlogPostUrl = (post: PostToBuild): AppPath => {
  const OPTIONAL_LOCALE_PART_INDEX = 2;
  const root = ROUTES_ROOTS.BLOG;

  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, BLOG_POSTS_FOLDER);
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
