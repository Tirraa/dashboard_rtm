import { DEFAULT_LANGUAGE } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import type { LanguageFlag } from '##/types/hell/i18n';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import type { BlogArchitecture } from '@/config/blog';
import BlogConfig from '@/config/blog';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, PostBase, UnknownBlogSlug, UnknownCategoryAndUnknownSubcategory } from '@/types/Blog';
import type { Maybe } from '@/types/CustomUtilityTypes';
import type { AppPath } from '@/types/Next';
import type { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { buildAbsolutePathFromParts, getFormattedDate } from '../str';

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
export async function getAllBlogPostsByCategory(categ: BlogCategory): Promise<PostBase[]> {
  const posts = await BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();
  return posts;
}

export async function getAllBlogPostsByCategoryAndSubcategoryUnstrict({
  category,
  subcategory
}: UnknownCategoryAndUnknownSubcategory): Promise<PostBase[]> {
  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory);
  if (!isValidPair) return [];
  const allPosts: PostBase[] = await getAllBlogPostsByCategory(category);
  return allPosts.filter((post) => post.subcategory === subcategory);
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  language: LanguageFlag
): Promise<PostBase[]> {
  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory);
  if (!isValidPair) return [];
  const allPosts: PostBase[] = await getAllBlogPostsByCategory(category);
  return allPosts.filter((post) => post.subcategory === subcategory && post.language === language);
}

export async function getBlogPostUnstrict(
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): Promise<Maybe<PostBase>> {
  const postsCollection: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

  return (
    postsCollection.find(
      ({ language: currentPostLanguage, slug: currentPostSlug }) => currentPostLanguage === langFlag && currentPostSlug === targettedSlug
    ) ?? null
  );
}

export async function getAllBlogPostsByCategoryAndSubcategoryStrict<C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C]
): Promise<PostBase[]> {
  const allPosts: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });
  return allPosts;
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict<C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  language: LanguageFlag
): Promise<PostBase[]> {
  const allPosts: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict({ category, subcategory }, language);
  return allPosts;
}

export async function getBlogPostStrict<C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): Promise<Maybe<PostBase>> {
  const post: Maybe<PostBase> = await getBlogPostUnstrict({ category, subcategory }, targettedSlug, langFlag);
  return post;
}

export const getAllBlogCategories = (): BlogCategory[] => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function blogSubcategoryShouldTriggerNotFound(postsCollection: PostBase[]): boolean {
  const isForcedPath = BlogConfig.USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND;
  return postsCollection.length === 0 && !isForcedPath;
}

export function getBlogPostFormattedDate(lng: LanguageFlag, { date }: PostBase): string {
  const postDateHasTime = (date: IsoDateTimeString) => date.substring(date.indexOf('T') + 1) !== '00:00:00.000Z';

  const giveTime = postDateHasTime(date);
  const formattedDate = getFormattedDate(lng, new Date(date), giveTime);
  return formattedDate;
}

export function isValidBlogCategory(category: string): boolean {
  const categories = getAllBlogCategories();
  if (!categories.includes(category as any)) return false;
  return true;
}

export async function isValidBlogCategoryAndSubcategoryPair(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory
): Promise<boolean> {
  if (!isValidBlogCategory(category)) return false;

  const subcategories = await getBlogSubcategoriesByCategory(category);
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
