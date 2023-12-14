import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import type { LanguageFlag } from '##/types/magic/I18n';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BlogConfig from '@/config/blog';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, PostBase, StrictBlog, UnknownBlogSlug } from '@/types/Blog';
import { buildAbsolutePathFromParts } from '@rtm/shared-lib/str';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { AppPath } from '@rtm/shared-types/Next';
import type { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { getFormattedDate } from '../str';
import ComputedBlogCtx from './ctx';

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
async function getAllBlogPostsByCategory(categ: BlogCategory): Promise<PostBase[]> {
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
  if (!ComputedBlogCtx.TESTING && category === ('testing' satisfies BlogCategory)) return [];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  if (!isValidPair) return [];

  const getPostsWithAllowedDraftsCtx: () => PostBase[] = () =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage }) =>
        currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const getPostsWithDisallowedDraftsCtx: () => PostBase[] = () =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage, draft: currentPostDraft }) =>
        !currentPostDraft && currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const postsCollection: PostBase[] = await getAllBlogPostsByCategory(category);

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getPostsWithAllowedDraftsCtx() : getPostsWithDisallowedDraftsCtx();
}

export async function getBlogPostUnstrict(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  targettedSlug: UnknownBlogSlug,
  language: LanguageFlag
): Promise<MaybeNull<PostBase>> {
  if (!ComputedBlogCtx.TESTING && category === ('testing' satisfies BlogCategory)) return null;

  const getPostWithAllowedDraftsCtx: () => MaybeNull<PostBase> = () =>
    postsCollection.find(({ slug: currentPostSlug }) => currentPostSlug === targettedSlug) ?? null;

  const getPostWithDisallowedDraftsCtx: () => MaybeNull<PostBase> = () =>
    postsCollection.find(({ slug: currentPostSlug, draft: currentPostDraft }) => !currentPostDraft && currentPostSlug === targettedSlug) ?? null;

  const postsCollection: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(category, subcategory, language);

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getPostWithAllowedDraftsCtx() : getPostWithDisallowedDraftsCtx();
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict<C extends keyof StrictBlog>(
  category: C,
  subcategory: keyof StrictBlog[C],
  language: keyof StrictBlog[C][keyof StrictBlog[C]]
): Promise<PostBase[]> {
  const allPosts: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(
    category,
    subcategory as BlogSubcategoryFromUnknownCategory,
    language as LanguageFlag
  );
  return allPosts;
}

export async function getBlogPostStrict<
  Category extends keyof StrictBlog,
  Subcategory extends keyof StrictBlog[Category],
  Language extends keyof StrictBlog[Category][keyof StrictBlog[Category]]
>(
  category: Category,
  subcategory: Subcategory,
  language: Language,
  targettedSlug: StrictBlog[Category][Subcategory][Language]
): Promise<MaybeNull<PostBase>> {
  const post: MaybeNull<PostBase> = await getBlogPostUnstrict(
    category,
    subcategory as BlogSubcategoryFromUnknownCategory,
    targettedSlug as UnknownBlogSlug,
    language as LanguageFlag
  );
  return post;
}

export const getAllBlogCategories: () => BlogCategory[] = () => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

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
  if (!ComputedBlogCtx.TESTING && category === ('testing' satisfies BlogCategory)) return false;

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
