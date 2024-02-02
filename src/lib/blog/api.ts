import type { BlogSubcategoryFromUnknownCategory, UnknownBlogSlug, BlogCategory, BlogPostType, StrictBlog } from '@/types/Blog';
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

export async function getAllBlogPostsByCategory(categ: BlogCategory): Promise<MaybeNull<BlogPostType[]>> {
  try {
    const posts = await BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();
    return posts;
  } catch {
    return null;
  }
}

export async function getAllBlogPostsByCategoryAndLanguage(categ: BlogCategory, language: LanguageFlag): Promise<MaybeNull<BlogPostType[]>> {
  const allPosts = await getAllBlogPostsByCategory(categ);
  if (allPosts === null) return null;

  const posts = allPosts.filter(({ language: currentPostLanguage }) => currentPostLanguage === language);
  return posts;
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  language: LanguageFlag
): Promise<BlogPostType[]> {
  // Stryker Workaround 1. Pointless mutants: there's no ambiguity here.
  // Stryker disable next-line ConditionalExpression,EqualityOperator
  if (!ComputedBlogCtx.TESTING && category === BlogConfig.TESTING_CATEGORY) return [];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  // Stryker Workaround 2. Mutant will be killed with `if (true)` as expected, but `if (false)` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!isValidPair) return [];

  const getPostsWithAllowedDraftsCtx = (postsCollection: BlogPostType[]): BlogPostType[] =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage }) =>
        // Stryker Workaround 3. Pointless mutants: there's no ambiguity here.
        // Stryker disable next-line ConditionalExpression
        currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const getPostsWithDisallowedDraftsCtx = (postsCollection: BlogPostType[]): BlogPostType[] =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage, draft: currentPostDraft }) =>
        // Stryker Workaround 4. Pointless mutants: there's no ambiguity here.
        // Stryker disable next-line ConditionalExpression
        !currentPostDraft && currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const postsCollection = (await getAllBlogPostsByCategory(category)) as BlogPostType[];

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getPostsWithAllowedDraftsCtx(postsCollection) : getPostsWithDisallowedDraftsCtx(postsCollection);
}

export async function getBlogPostUnstrict(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  targettedSlug: UnknownBlogSlug,
  language: LanguageFlag
): Promise<MaybeNull<BlogPostType>> {
  // Stryker Workaround 5. Pointless mutants: there's no ambiguity here.
  // Stryker disable next-line ConditionalExpression,EqualityOperator
  if (!ComputedBlogCtx.TESTING && category === BlogConfig.TESTING_CATEGORY) return null;

  const getPostWithAllowedDraftsCtx: () => MaybeNull<BlogPostType> = () =>
    postsCollection.find(({ slug: currentPostSlug }) => currentPostSlug === targettedSlug) ?? null;

  const getPostWithDisallowedDraftsCtx: () => MaybeNull<BlogPostType> = () =>
    postsCollection.find(({ draft: currentPostDraft, slug: currentPostSlug }) => !currentPostDraft && currentPostSlug === targettedSlug) ?? null;

  const postsCollection: BlogPostType[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(category, subcategory, language);

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getPostWithAllowedDraftsCtx() : getPostWithDisallowedDraftsCtx();
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageStrict<C extends keyof StrictBlog>(
  category: C,
  subcategory: keyof StrictBlog[C],
  language: keyof StrictBlog[C][keyof StrictBlog[C]]
): Promise<BlogPostType[]> {
  const allPosts: BlogPostType[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(
    category as any,
    subcategory as any,
    language as any
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
): Promise<MaybeNull<BlogPostType>> {
  const post: MaybeNull<BlogPostType> = await getBlogPostUnstrict(category as any, subcategory as any, targettedSlug as any, language as any);
  return post;
}

export const getAllBlogCategories: () => BlogCategory[] = () => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function blogSubcategoryShouldTriggerNotFound(postsCollection: BlogPostType[]): boolean {
  const isForcedPath = BlogConfig.USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND;
  return !isForcedPath && postsCollection.length === 0;
}

export function getBlogPostFormattedDate(language: LanguageFlag, date: IsoDateTimeString): string {
  // Stryker Workaround 6. Mutant will be killed with `if (true)` as expected, but `if (false)` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  const postDateHasTime = (date: IsoDateTimeString) => date.substring(date.indexOf('T') + 1) !== '00:00:00.000Z';

  const giveTime = postDateHasTime(date);
  const formattedDate = getFormattedDate(language, new Date(date), giveTime);
  return formattedDate;
}

export function isValidBlogCategory(category: string): boolean {
  // Stryker Workaround 7. Testing "&& true" is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!ComputedBlogCtx.TESTING && category === BlogConfig.TESTING_CATEGORY) return false;

  const categories = getAllBlogCategories();
  if (!categories.includes(category as any)) return false;
  return true;
}

export async function isValidBlogCategoryAndSubcategoryPairInAnyLanguage(
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory
): Promise<boolean> {
  // Stryker Workaround 8. Mutant will be killed with `if (true)` as expected, but `if (false)` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
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
  // Stryker Workaround 9. Mutant will be killed with `if (true)` as expected, but `if (false)` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!isValidBlogCategory(category)) return false;

  const subcategories = await getBlogSubcategoriesByCategory(category, language);
  if (!subcategories.includes(subcategory)) return false;
  return true;
}

export const redirectToBlogCategoryPage = (category: BlogCategory): void => redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category));

export const redirectToBlogCategoryAndSubcategoryPairPageUnstrict = (category: BlogCategory, subcategory: BlogSubcategoryFromUnknownCategory): void =>
  redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category, subcategory));

export function getBlogPostPathWithoutI18nPart({ language, url }: BlogPostType): AppPath {
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
