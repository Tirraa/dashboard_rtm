import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import type { LanguageFlag } from '##/types/magic/I18n';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import type { BlogArchitecture } from '@/config/blog';
import BlogConfig from '@/config/blog';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, PostBase, UnknownBlogSlug } from '@/types/Blog';
import { buildAbsolutePathFromParts } from '@rtm/shared-lib/str';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { AppPath } from '@rtm/shared-types/Next';
import type { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { getFormattedDate } from '../str';

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
export async function getAllBlogPostsByCategory(categ: BlogCategory): Promise<PostBase[]> {
  const posts = await BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();
  return posts;
}

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
export async function getAllBlogPostsByCategoryAndLanguage(categ: BlogCategory, language: LanguageFlag): Promise<PostBase[]> {
  const allPosts = await getAllBlogPostsByCategory(categ);
  const posts = allPosts.filter((post) => post.language === language);
  return posts;
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  language: LanguageFlag
): Promise<PostBase[]> {
  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  if (!isValidPair) return [];
  const allPosts: PostBase[] = await getAllBlogPostsByCategory(category);
  return allPosts.filter((post) => post.subcategory === subcategory && post.language === language);
}

export async function getBlogPostUnstrict(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  targettedSlug: UnknownBlogSlug,
  language: LanguageFlag
): Promise<MaybeNull<PostBase>> {
  const postsCollection: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(category, subcategory, language);

  return postsCollection.find(({ slug: currentPostSlug }) => currentPostSlug === targettedSlug) ?? null;
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict<C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  language: LanguageFlag
): Promise<PostBase[]> {
  const allPosts: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(category, subcategory, language);
  return allPosts;
}

export async function getBlogPostStrict<C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  targettedSlug: UnknownBlogSlug,
  language: LanguageFlag
): Promise<MaybeNull<PostBase>> {
  const post: MaybeNull<PostBase> = await getBlogPostUnstrict(category, subcategory, targettedSlug, language);
  return post;
}

export const getAllBlogCategories = (): BlogCategory[] => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function blogSubcategoryShouldTriggerNotFound(postsCollection: PostBase[]): boolean {
  const isForcedPath = BlogConfig.USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND;
  return postsCollection.length === 0 && !isForcedPath;
}

export function getBlogPostFormattedDate(language: LanguageFlag, { date }: PostBase): string {
  const postDateHasTime = (date: IsoDateTimeString) => date.substring(date.indexOf('T') + 1) !== '00:00:00.000Z';

  const giveTime = postDateHasTime(date);
  const formattedDate = getFormattedDate(language, new Date(date), giveTime);
  return formattedDate;
}

export function isValidBlogCategory(category: string): boolean {
  const categories = getAllBlogCategories();
  if (!categories.includes(category as any)) return false;
  return true;
}

export async function isValidBlogCategoryAndSubcategoryPairInAnyLanguage(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory
): Promise<boolean> {
  if (!isValidBlogCategory(category)) return false;

  for (const language of LANGUAGES) {
    const currentSubcategories = await getBlogSubcategoriesByCategory(category, language);
    if (currentSubcategories.includes(subcategory)) return true;
  }
  return false;
}

export async function isValidBlogCategoryAndSubcategoryPair(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  language: LanguageFlag
): Promise<boolean> {
  if (!isValidBlogCategory(category)) return false;

  const subcategories = await getBlogSubcategoriesByCategory(category, language);
  if (!subcategories.includes(subcategory)) return false;
  return true;
}

export const redirectToBlogCategoryPage = (category: BlogCategory): void => redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category));

export const redirectToBlogCategoryAndSubcategoryPairPageUnstrict = (category: BlogCategory, subcategory: BlogSubcategoryFromUnknownCategory): void =>
  redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category, subcategory));

export function getBlogPostPathWithoutI18nPart({ language, url }: PostBase): AppPath {
  if (language === DEFAULT_LANGUAGE) return url;
  const blogPostPathWithoutI18nPart = url.replace(`/${language}/`, '/');
  return blogPostPathWithoutI18nPart;
}

export function getSlicedBlogPostDescription(description: string): DescriptionAsIs | CroppedDescription {
  const takeLimit = BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT - 1;
  if (description.length <= takeLimit) return description;

  const slicedDescription = description.substring(0, takeLimit) + '…';
  return slicedDescription;
}

type DescriptionAsIs = string;
type CroppedDescription = string;
