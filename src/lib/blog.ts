import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BlogConfig, { BlogArchitecture } from '@/config/blog';
import { DEFAULT_LANGUAGE } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';
import {
  BlogCategory,
  BlogCategoryAndSubcategoriesPair,
  BlogSubcategoryFromUnknownCategory,
  PostBase,
  UnknownBlogSlug,
  UnknownCategoryAndUnknownSubcategory
} from '@/types/Blog';
import { AppPath } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { getBlogPostLanguageFlagFromPostObj } from './i18n';
import { buildAbsolutePathFromParts, buildPathFromParts, getFormattedDate, getLastPathPart, indexOfNthOccurrence } from './str';

export const getBlogPostLanguageFlag = (post: PostBase): LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);

const getBlogPostSubcategoryAndSlugStr = (post: PostBase): string => buildPathFromParts(getBlogPostSubcategory(post), getBlogPostSlug(post));

const getBlogPostSubcategoryAndSlugStrAndLangFlag = (post: PostBase): string =>
  buildPathFromParts(getBlogPostSubcategory(post), getBlogPostSlug(post), getBlogPostLanguageFlag(post));

/**
 * @throws {InvalidArgumentsError}
 */
function getBlogPostSubcategoryFromStr(sourceFileDir: string): BlogSubcategoryFromUnknownCategory {
  function subCategGetter(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubcategoryFromUnknownCategory {
    if (secondSlashIndex !== -1) return sourceFileDir.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubcategoryFromUnknownCategory;
    return sourceFileDir.substring(firstSlashIndex + 1) as BlogSubcategoryFromUnknownCategory;
  }

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) throw new InvalidArgumentsError(getBlogPostSubcategoryFromStr.name, { sourceFileDir });

  const secondSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const subCateg = subCategGetter(sourceFileDir, firstSlashIndex, secondSlashIndex);
  return subCateg;
}

function getBlogPostSubcategoryFromPostObj(post: PostBase): BlogSubcategoryFromUnknownCategory {
  const { sourceFileDir } = post._raw;
  return getBlogPostSubcategoryFromStr(sourceFileDir);
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

export const getBlogPostSubcategory = (post: PostBase): BlogSubcategoryFromUnknownCategory => getBlogPostSubcategoryFromPostObj(post);
export const getBlogPostSlug = (post: PostBase): UnknownBlogSlug => getLastPathPart(post._raw.flattenedPath);

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();

export const getAllPostsByCategoryAndSubcategoryUnstrict = ({ category, subCategory }: UnknownCategoryAndUnknownSubcategory): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubcategory(post) === subCategory);

export const getAllPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict = (
  { category, subCategory }: UnknownCategoryAndUnknownSubcategory,
  language: LanguageFlag
): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubcategory(post) === subCategory && getBlogPostLanguageFlag(post) === language);

export const filterPostsByLanguage = (posts: PostBase[], subCategory: BlogSubcategoryFromUnknownCategory, language: LanguageFlag): PostBase[] =>
  posts.filter((post) => getBlogPostSubcategory(post) === subCategory && getBlogPostLanguageFlag(post) === language);

export function getPostUnstrict(
  { category, subCategory }: UnknownCategoryAndUnknownSubcategory,
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubcategoryUnstrict({ category, subCategory });

  if (langFlag === DEFAULT_LANGUAGE) {
    return postsCollection.find((post) => getBlogPostSubcategoryAndSlugStr(post) === buildPathFromParts(subCategory, targettedSlug));
  }
  return postsCollection.find(
    (post) => getBlogPostSubcategoryAndSlugStrAndLangFlag(post) === buildPathFromParts(subCategory, targettedSlug, langFlag)
  );
}

export const getAllPostsByCategoryAndSubcategoryStrict = <C extends BlogCategory>(category: C, subCategory: BlogArchitecture[C]): PostBase[] =>
  getAllPostsByCategoryAndSubcategoryUnstrict({ category, subCategory });

export const getAllPostsByCategoryAndSubcategoryAndLanguageFlagStrict = <C extends BlogCategory>(
  category: C,
  subCategory: BlogArchitecture[C],
  language: LanguageFlag
): PostBase[] => getAllPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict({ category, subCategory }, language);

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

export function isValidCategoryAndSubcategoryPair(category: BlogCategory, subCategory: BlogSubcategoryFromUnknownCategory): boolean {
  if (!isValidCategory(category)) return false;

  const subCategories = getBlogSubcategoriesByCategory(category);
  if (!subCategories.includes(subCategory)) return false;
  return true;
}

export const redirectToBlogCategoryPage = (category: BlogCategory): void => redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category));

export const redirectToBlogCategoryAndSubcategoryPairPageUnstrict = (category: BlogCategory, subCategory: BlogSubcategoryFromUnknownCategory): void =>
  redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category, subCategory));

export function getBlogPostPathWithoutI18nPart(post: PostBase): AppPath {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === DEFAULT_LANGUAGE) return post.url;
  const blogPostPathWithoutI18nPart = post.url.replace(`/${langFlag}/`, '/');
  return blogPostPathWithoutI18nPart;
}
