import type { BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import InvalidArgumentsError from '../../../../../../src/errors/exceptions/InvalidArgument';
import { indexOfNthOccurrence } from '../../../../../../src/lib/app-agnostic/str/indexOfNthOccurrence';

/**
 * @throws {InvalidArgumentsError}
 */
export function buildBlogPostSubcategoryFromStr(sourceFileDir: string): BlogSubcategoryFromUnknownCategory {
  function subcategBuilder(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubcategoryFromUnknownCategory {
    if (secondSlashIndex !== -1) return sourceFileDir.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubcategoryFromUnknownCategory;
    return sourceFileDir.substring(firstSlashIndex + 1) as BlogSubcategoryFromUnknownCategory;
  }

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1)
    throw new InvalidArgumentsError(buildBlogPostSubcategoryFromStr.name, { sourceFileDir }, "Can't find any '/' character in sourceFileDir");

  const secondSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const subcateg = subcategBuilder(sourceFileDir, firstSlashIndex, secondSlashIndex);
  return subcateg;
}

function buildBlogPostSubcategoryFromPostObj(post: PostBase): BlogSubcategoryFromUnknownCategory {
  const { sourceFileDir } = post._raw;
  return buildBlogPostSubcategoryFromStr(sourceFileDir);
}

export const buildBlogPostSubcategory = (post: PostBase): BlogSubcategoryFromUnknownCategory => buildBlogPostSubcategoryFromPostObj(post);

export default buildBlogPostSubcategory;
