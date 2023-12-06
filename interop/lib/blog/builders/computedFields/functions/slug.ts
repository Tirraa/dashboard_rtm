import type { PostToBuild } from '##/types/magic/ContentlayerConfig';
import type { UnknownBlogSlug } from '@/types/Blog';
import { InvalidArgumentsError } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostSlugFromStr(flattenedPath: string): UnknownBlogSlug {
  const slugBuilder = (flattenedPath: string, lastSlashIndex: number): UnknownBlogSlug =>
    flattenedPath.substring(lastSlashIndex + 1) as UnknownBlogSlug;

  const lastSlashIndex = flattenedPath.lastIndexOf('/');

  if (lastSlashIndex === -1)
    throw new InvalidArgumentsError(buildBlogPostSlugFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");

  const slug = slugBuilder(flattenedPath, lastSlashIndex);
  return slug;
}

function buildBlogPostSlugFromPostObj(post: PostToBuild): UnknownBlogSlug {
  const { flattenedPath } = post._raw;
  return buildBlogPostSlugFromStr(flattenedPath);
}

const buildBlogPostSlug = (post: PostToBuild): UnknownBlogSlug => buildBlogPostSlugFromPostObj(post);

export default buildBlogPostSlug;
