import { getBlogSubCategoriesByCategory } from '@/cache/blog';
import BlogConfig, { BlogArchitecture } from '@/config/blog';
import { DEFAULT_LANGUAGE } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';
import {
  BlogCategory,
  BlogCategoryAndSubcategoriesPair,
  BlogSubCategoryFromUnknownCategory,
  PostBase,
  UnknownBlogSlug,
  UnknownCategoryAndUnknownSubCategory
} from '@/types/Blog';
import { AppPath } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { getBlogPostLanguageFlagFromPostObj } from './i18n';
import { buildAbsolutePathFromParts, buildPathFromParts, getFormattedDate, getLastPathPart, indexOfNthOccurrence } from './str';

export const getBlogPostLanguageFlag = (post: PostBase): LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);

const getBlogPostSubCategoryAndSlugStr = (post: PostBase): string => buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post));

const getBlogPostSubCategoryAndSlugStrAndLangFlag = (post: PostBase): string =>
  buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post), getBlogPostLanguageFlag(post));

/**
 * @throws {InvalidArgumentsError}
 */
function getBlogPostSubCategoryFromStr(sourceFileDir: string): BlogSubCategoryFromUnknownCategory {
  function subCategGetter(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubCategoryFromUnknownCategory {
    if (secondSlashIndex !== -1) return sourceFileDir.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubCategoryFromUnknownCategory;
    return sourceFileDir.substring(firstSlashIndex + 1) as BlogSubCategoryFromUnknownCategory;
  }

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) throw new InvalidArgumentsError(getBlogPostSubCategoryFromStr.name, { sourceFileDir });

  const secondSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const subCateg = subCategGetter(sourceFileDir, firstSlashIndex, secondSlashIndex);
  return subCateg;
}

function getBlogPostSubCategoryFromPostObj(post: PostBase): BlogSubCategoryFromUnknownCategory {
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

export const getBlogPostSubCategory = (post: PostBase): BlogSubCategoryFromUnknownCategory => getBlogPostSubCategoryFromPostObj(post);
export const getBlogPostSlug = (post: PostBase): UnknownBlogSlug => getLastPathPart(post._raw.flattenedPath);
export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();
export const getAllPostsByCategoryAndSubCategoryUnstrict = ({ category, subCategory }: UnknownCategoryAndUnknownSubCategory): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubCategory(post) === subCategory);

export const getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict = (
  { category, subCategory }: UnknownCategoryAndUnknownSubCategory,
  language: LanguageFlag
): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubCategory(post) === subCategory && getBlogPostLanguageFlag(post) === language);

export const filterPostsByLanguage = (posts: PostBase[], subCategory: BlogSubCategoryFromUnknownCategory, language: LanguageFlag): PostBase[] =>
  posts.filter((post) => getBlogPostSubCategory(post) === subCategory && getBlogPostLanguageFlag(post) === language);

export function getPostUnstrict(
  { category, subCategory }: UnknownCategoryAndUnknownSubCategory,
  targettedSlug: UnknownBlogSlug,
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
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase => getPostUnstrict({ category, subCategory }, targettedSlug, langFlag);

export const getAllCategories = (): BlogCategory[] => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function subCategoryShouldTriggerNotFound<C extends BlogCategory>(
  postsCollection: PostBase[],
  { category, subCategory }: BlogCategoryAndSubcategoriesPair<C>
): boolean {
  const isForcedPath = BlogConfig.FORCED_BLOG_SUBCATEGORIES_PATHS[category]?.includes(subCategory);
  return postsCollection.length === 0 && !isForcedPath;
}

export function getPostFormattedDate(lng: LanguageFlag, { date }: PostBase): string {
  const postDateHasTime = (date: IsoDateTimeString) => date.substring(date.indexOf('T') + 1) !== '00:00:00.000Z';

  const giveTime = postDateHasTime(date);
  const formattedDate = getFormattedDate(lng, new Date(date), giveTime);
  return formattedDate;
}

export function isValidCategory(category: string): boolean {
  const categories = getAllCategories();
  if (!categories.includes(category as any)) return false;
  return true;
}

export function isValidCategoryAndSubCategoryPair(category: BlogCategory, subCategory: BlogSubCategoryFromUnknownCategory): boolean {
  if (!isValidCategory(category)) return false;

  const subCategories = getBlogSubCategoriesByCategory(category);
  if (!subCategories.includes(subCategory)) return false;
  return true;
}

export const redirectToBlogCategoryPage = (category: BlogCategory): void => redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category));

export const redirectToBlogCategoryAndSubCategoryPairPageUnstrict = (category: BlogCategory, subCategory: BlogSubCategoryFromUnknownCategory): void =>
  redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category, subCategory));

export function getBlogPostPathWithoutI18nPart(post: PostBase): AppPath {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === DEFAULT_LANGUAGE) return post.url;
  const blogPostPathWithoutI18nPart = post.url.replace(`/${langFlag}/`, '/');
  return blogPostPathWithoutI18nPart;
}
