import type { BlogSubcategoryFromUnknownCategory, UnknownBlogSlug, BlogCategory, StrictBlog, TBlogPost } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { IsoDateTimeString } from 'contentlayer/core';
import type { AppPath } from '@rtm/shared-types/Next';

import { buildAbsolutePathFromParts } from '@rtm/shared-lib/str';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import ROUTES_ROOTS from '##/config/routes';
import { LANGUAGES } from '##/config/i18n';
import { redirect } from 'next/navigation';
import BlogConfig from '@/config/blog';

import { getFormattedDate } from '../str';
import ComputedBlogCtx from './ctx';

export async function getAllBlogPostsByCategory(categ: BlogCategory): Promise<MaybeNull<TBlogPost[]>> {
  try {
    const posts = await BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();
    return posts;
  } catch {
    return null;
  }
}

export async function getAllBlogPostsByCategoryAndLanguage(categ: BlogCategory, language: LanguageFlag): Promise<MaybeNull<TBlogPost[]>> {
  const allPosts = await getAllBlogPostsByCategory(categ);
  if (allPosts === null) return null;

  const posts = allPosts.filter(({ language: currentPostLanguage }) => currentPostLanguage === language);
  return posts;
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  language: LanguageFlag
): Promise<TBlogPost[]> {
  if (!ComputedBlogCtx.TESTING && category === BlogConfig.TESTING_CATEGORY) return [];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  if (!isValidPair) return [];

  const getPostsWithAllowedDraftsCtx = (postsCollection: TBlogPost[]): TBlogPost[] =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage }) =>
        currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const getPostsWithDisallowedDraftsCtx = (postsCollection: TBlogPost[]): TBlogPost[] =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage, draft: currentPostDraft }) =>
        !currentPostDraft && currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const postsCollection: MaybeNull<TBlogPost[]> = await getAllBlogPostsByCategory(category);
  if (postsCollection === null) return [];

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getPostsWithAllowedDraftsCtx(postsCollection) : getPostsWithDisallowedDraftsCtx(postsCollection);
}

export async function getBlogPostUnstrict(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  targettedSlug: UnknownBlogSlug,
  language: LanguageFlag
): Promise<MaybeNull<TBlogPost>> {
  if (!ComputedBlogCtx.TESTING && category === BlogConfig.TESTING_CATEGORY) return null;

  const getPostWithAllowedDraftsCtx: () => MaybeNull<TBlogPost> = () =>
    postsCollection.find(({ slug: currentPostSlug }) => currentPostSlug === targettedSlug) ?? null;

  const getPostWithDisallowedDraftsCtx: () => MaybeNull<TBlogPost> = () =>
    postsCollection.find(({ draft: currentPostDraft, slug: currentPostSlug }) => !currentPostDraft && currentPostSlug === targettedSlug) ?? null;

  const postsCollection: TBlogPost[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(category, subcategory, language);

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getPostWithAllowedDraftsCtx() : getPostWithDisallowedDraftsCtx();
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict<C extends keyof StrictBlog>(
  category: C,
  subcategory: keyof StrictBlog[C],
  language: keyof StrictBlog[C][keyof StrictBlog[C]]
): Promise<TBlogPost[]> {
  const allPosts: TBlogPost[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(
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
): Promise<MaybeNull<TBlogPost>> {
  const post: MaybeNull<TBlogPost> = await getBlogPostUnstrict(
    category,
    subcategory as BlogSubcategoryFromUnknownCategory,
    targettedSlug as UnknownBlogSlug,
    language as LanguageFlag
  );
  return post;
}

export const getAllBlogCategories: () => BlogCategory[] = () => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function blogSubcategoryShouldTriggerNotFound(postsCollection: TBlogPost[]): boolean {
  const isForcedPath = BlogConfig.USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND;
  return !isForcedPath && postsCollection.length === 0;
}

export function getBlogPostFormattedDate(language: LanguageFlag, date: IsoDateTimeString): string {
  const postDateHasTime = (date: IsoDateTimeString) => date.substring(date.indexOf('T') + 1) !== '00:00:00.000Z';

  const giveTime = postDateHasTime(date);
  const formattedDate = getFormattedDate(language, new Date(date), giveTime);
  return formattedDate;
}

export function isValidBlogCategory(category: string): boolean {
  if (!ComputedBlogCtx.TESTING && category === BlogConfig.TESTING_CATEGORY) return false;

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

export function getBlogPostPathWithoutI18nPart({ language, url }: TBlogPost): AppPath {
  const blogPostPathWithoutI18nPart = url.replace(`/${language}/`, '/');
  return blogPostPathWithoutI18nPart;
}

export function getSlicedBlogPostDescription(description: string): CroppedDescription | DescriptionAsIs {
  const takeLimit = BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT - 1;
  if (description.length <= takeLimit) return description;

  const slicedDescription = description.substring(0, takeLimit) + '…';
  return slicedDescription;
}

type DescriptionAsIs = string;
type CroppedDescription = string;
