import type { BlogSubcategoryFromUnknownCategory, UnknownBlogSlug, StrictBlogPost, BlogCategory, BlogPostType, BlogAdapter } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type { IsoDateTimeString } from 'contentlayer/core';
import type { AppPath } from '@rtm/shared-types/Next';

import buildAbsolutePathFromParts from '@rtm/shared-lib/portable/str/buildAbsolutePathFromParts';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BlogConfig from '@/config/Blog/server';
import ROUTES_ROOTS from '##/config/routes';
import { LANGUAGES } from '##/config/i18n';
import { redirect } from 'next/navigation';

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

  const getBlogPostsWithAllowedDraftsCtx = (postsCollection: BlogPostType[]): BlogPostType[] =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage }) =>
        // Stryker Workaround 3. Pointless mutants: there's no ambiguity here.
        // Stryker disable next-line ConditionalExpression
        currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const getBlogPostsWithDisallowedDraftsCtx = (postsCollection: BlogPostType[]): BlogPostType[] =>
    postsCollection.filter(
      ({ subcategory: currentPostSubcategory, language: currentPostLanguage, draft: currentPostDraft }) =>
        // Stryker Workaround 4. Pointless mutants: there's no ambiguity here.
        // Stryker disable next-line ConditionalExpression
        !currentPostDraft && currentPostSubcategory === subcategory && currentPostLanguage === language
    );

  const postsCollection = (await getAllBlogPostsByCategory(category)) as BlogPostType[];

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getBlogPostsWithAllowedDraftsCtx(postsCollection) : getBlogPostsWithDisallowedDraftsCtx(postsCollection);
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

  const getBlogPostWithAllowedDraftsCtx: () => MaybeNull<BlogPostType> = () =>
    postsCollection.find(({ slug: currentPostSlug }) => currentPostSlug === targettedSlug) ?? null;

  const getBlogPostWithDisallowedDraftsCtx: () => MaybeNull<BlogPostType> = () =>
    postsCollection.find(({ draft: currentPostDraft, slug: currentPostSlug }) => !currentPostDraft && currentPostSlug === targettedSlug) ?? null;

  const postsCollection: BlogPostType[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(category, subcategory, language);

  return ComputedBlogCtx.ALLOWED_DRAFTS ? getBlogPostWithAllowedDraftsCtx() : getBlogPostWithDisallowedDraftsCtx();
}

export async function getAllBlogPostsByCategoryAndSubcategoryAndLanguageStrict<C extends keyof BlogAdapter>(
  category: C,
  subcategory: keyof BlogAdapter[C],
  language: keyof BlogAdapter[C][keyof BlogAdapter[C]] | LanguageFlag
): Promise<BlogPostType[]> {
  const allPosts: BlogPostType[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(
    category as any,
    subcategory as any,
    language as any
  );
  return allPosts;
}

export async function getBlogPostStrict({ subcategory, category, lang, slug }: StrictBlogPost): Promise<MaybeNull<BlogPostType>> {
  const post: MaybeNull<BlogPostType> = await getBlogPostUnstrict(category as any, subcategory as any, slug as any, lang as any);
  return post;
}

export const getAllBlogCategories: () => BlogCategory[] = () => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function blogSubcategoryShouldTriggerNotFound(postsCollection: Partial<BlogPostType>[]): boolean {
  const isForcedPath = BlogConfig.USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND;
  // eslint-disable-next-line no-magic-numbers
  return !isForcedPath && postsCollection.length === 0;
}

export function getBlogPostFormattedDate(language: LanguageFlag, date: IsoDateTimeString): string {
  // Stryker Workaround 6. Mutant will be killed with `if (true)` as expected, but `if (false)` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  // eslint-disable-next-line no-magic-numbers
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

export function getBlogPostPathWithoutI18nPart(language: string, url: string): AppPath {
  const blogPostPathWithoutI18nPart = url.replace(`/${language}/`, '/');
  return blogPostPathWithoutI18nPart;
}

export function getSlicedBlogPostDescription(description: string): CroppedDescription | DescriptionAsIs {
  // eslint-disable-next-line no-magic-numbers
  const takeLimit = BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT - 1;
  if (description.length <= takeLimit) return description;

  // eslint-disable-next-line no-magic-numbers
  const slicedDescription = description.substring(0, takeLimit) + '…';
  return slicedDescription;
}

type DescriptionAsIs = string;
type CroppedDescription = string;
