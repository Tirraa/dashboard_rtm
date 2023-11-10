import type { BlogCategory, PostBase } from '@/types/Blog';
import InvalidArgumentsError from '../../../../src/errors/exceptions/InvalidArgument';
import { indexOfNthOccurrence } from '../../../../src/lib/app-agnostic/str/indexOfNthOccurrence';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostCategoryFromStr(sourceFileDir: string): BlogCategory {
  const categBuilder = (sourceFileDir: string, firstSlashIndex: number): BlogCategory => sourceFileDir.substring(0, firstSlashIndex) as BlogCategory;

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1)
    throw new InvalidArgumentsError(buildBlogPostCategoryFromStr.name, { sourceFileDir }, "Can't find any '/' character in sourceFileDir");

  const categ = categBuilder(sourceFileDir, firstSlashIndex);
  return categ;
}

function buildBlogPostCategoryFromPostObj(post: PostBase): BlogCategory {
  const { sourceFileDir } = post._raw;
  return buildBlogPostCategoryFromStr(sourceFileDir);
}

export const buildBlogPostCategory = (post: PostBase): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
