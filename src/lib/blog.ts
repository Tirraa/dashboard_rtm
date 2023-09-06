import BlogConfig, { BlogArchitecture } from '@/config/blog';
import { DEFAULT_LANGUAGE } from '@/config/i18n';
import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';
import {
  BlogCategory,
  BlogCategoryAndSubcategoriesPair,
  BlogSlug,
  BlogSubCategoryUnknownKey,
  UnknownCategoryAndUnknownSubCategory
} from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { AppPath } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { getBlogPostLanguageFlag } from './i18n';
import { buildPathFromParts, getLastPathPart, indexOfNthOccurrence } from './str';

const getBlogPostSubCategoryAndSlugStr = (post: PostBase): string => buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post));

const getBlogPostSubCategoryAndSlugStrAndLangFlag = (post: PostBase): string =>
  buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post), getBlogPostLanguageFlag(post));

/**
 * @throws {InvalidArgumentsError}
 */
function getBlogPostSubCategoryFromStr(sourceFileDir: string): BlogSubCategoryUnknownKey {
  function subCategGetter(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubCategoryUnknownKey {
    if (secondSlashIndex !== -1) return sourceFileDir.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubCategoryUnknownKey;
    return sourceFileDir.substring(firstSlashIndex + 1) as BlogSubCategoryUnknownKey;
  }

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) throw new InvalidArgumentsError(getBlogPostSubCategoryFromStr.name, { sourceFileDir });

  const secondSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const subCateg = subCategGetter(sourceFileDir, firstSlashIndex, secondSlashIndex);
  return subCateg;
}

function getBlogPostSubCategoryFromPostObj(post: PostBase): BlogSubCategoryUnknownKey {
  const { sourceFileDir } = post._raw;
  return getBlogPostSubCategoryFromStr(sourceFileDir);
}

/**
 * @throws {InvalidArgumentsError}
 */
export function getBlogCategoryFromPathname(pathname: AppPath): BlogCategory {
  const firstIndex = indexOfNthOccurrence(pathname, '/', 1);
  if (firstIndex === -1) throw new InvalidArgumentsError(getBlogCategoryFromPathname.name, { pathname });

  const secondIndex = indexOfNthOccurrence(pathname, '/', 2);
  if (secondIndex !== -1) return pathname.substring(firstIndex + 1, secondIndex) as BlogCategory;
  return pathname.substring(firstIndex + 1) as BlogCategory;
}

export const getBlogPostSubCategory = (post: PostBase): BlogSubCategoryUnknownKey => getBlogPostSubCategoryFromPostObj(post);
export const getBlogPostSlug = (post: PostBase): BlogSlug => getLastPathPart(post._raw.flattenedPath);
export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.BLOG_CATEGORIES_ALL_POSTS_TYPES_ASSOC[categ]();
export const getAllPostsByCategoryAndSubCategoryUnstrict = ({ category, subCategory }: UnknownCategoryAndUnknownSubCategory): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubCategory(post) === subCategory);

export const getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict = (
  { category, subCategory }: UnknownCategoryAndUnknownSubCategory,
  language: LanguageFlag
): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubCategory(post) === subCategory && getBlogPostLanguageFlag(post) === language);

export const filterPostsByLanguage = (posts: PostBase[], subCategory: BlogSubCategoryUnknownKey, language: LanguageFlag): PostBase[] =>
  posts.filter((post) => getBlogPostSubCategory(post) === subCategory && getBlogPostLanguageFlag(post) === language);

export function getPostUnstrict(
  { category, subCategory }: UnknownCategoryAndUnknownSubCategory,
  targettedSlug: BlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategoryUnstrict({ category, subCategory });

  if (langFlag === DEFAULT_LANGUAGE) {
    return postsCollection.find((post) => getBlogPostSubCategoryAndSlugStr(post) === buildPathFromParts(subCategory, targettedSlug));
  }
  return postsCollection.find(
    (post) => getBlogPostSubCategoryAndSlugStrAndLangFlag(post) === buildPathFromParts(subCategory, targettedSlug, langFlag)
  );
}

export const getAllPostsByCategoryAndSubCategoryStrict = <C extends BlogCategory>(category: C, subCategory: BlogArchitecture[C]): PostBase[] =>
  getAllPostsByCategoryAndSubCategoryUnstrict({ category, subCategory });

export const getAllPostsByCategoryAndSubCategoryAndLanguageFlagStrict = <C extends BlogCategory>(
  category: C,
  subCategory: BlogArchitecture[C],
  language: LanguageFlag
): PostBase[] => getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict({ category, subCategory }, language);

export const getPostStrict = <C extends BlogCategory>(
  category: C,
  subCategory: BlogArchitecture[C],
  targettedSlug: BlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase => getPostUnstrict({ category, subCategory }, targettedSlug, langFlag);

export const getAllCategories = (): BlogCategory[] => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_TYPES_ASSOC) as BlogCategory[];

export function subCategoryShouldTriggerNotFound<C extends BlogCategory>(
  postsCollection: PostBase[],
  { category, subCategory }: BlogCategoryAndSubcategoriesPair<C>
): boolean {
  const isForcedPath = BlogConfig.FORCED_BLOG_SUBCATEGORIES_PATHS[category]?.includes(subCategory);
  return postsCollection.length === 0 && !isForcedPath;
}
