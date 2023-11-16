import { DEFAULT_LANGUAGE } from '##/config/i18n';
import type { LanguageFlag } from '##/types/hell/i18n';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import type { BlogArchitecture } from '@/config/blog';
import BlogConfig from '@/config/blog';
import ROUTES_ROOTS from '@/config/routes';
import type {
  BlogCategory,
  BlogCategoryAndSubcategoriesPair,
  BlogSubcategoryFromUnknownCategory,
  PostBase,
  UnknownBlogSlug,
  UnknownCategoryAndUnknownSubcategory
} from '@/types/Blog';
import type { Maybe } from '@/types/CustomUtilitaryTypes';
import type { AppPath } from '@/types/Next';
import type { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { buildAbsolutePathFromParts, getFormattedDate } from '../str';

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
export const getAllBlogPostsByCategory = async (categ: BlogCategory): Promise<PostBase[]> =>
  await BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();

export const getAllBlogPostsByCategoryAndSubcategoryUnstrict = async ({
  category,
  subcategory
}: UnknownCategoryAndUnknownSubcategory): Promise<PostBase[]> => {
  const allPosts = await getAllBlogPostsByCategory(category);
  return allPosts.filter((post) => post.subcategory === subcategory);
};

export const getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict = async (
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  language: LanguageFlag
): Promise<PostBase[]> => {
  const allPosts = await getAllBlogPostsByCategory(category);
  return allPosts.filter((post) => post.subcategory === subcategory && post.language === language);
};

export async function getBlogPostUnstrict(
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): Promise<Maybe<PostBase>> {
  const postsCollection: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

  if (langFlag === DEFAULT_LANGUAGE) {
    return (
      postsCollection.find(
        ({ subcategory: currentPostSubcategory, slug: currentPostSlug }) =>
          currentPostSubcategory === subcategory && currentPostSlug === targettedSlug
      ) ?? null
    );
  }

  return (
    postsCollection.find(
      ({ subcategory: currentPostSubcategory, slug: currentPostSlug, language: currentPostLanguage }) =>
        currentPostSubcategory === subcategory && currentPostSlug === targettedSlug && currentPostLanguage === langFlag
    ) ?? null
  );
}

export const getAllBlogPostsByCategoryAndSubcategoryStrict = async <C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C]
): Promise<PostBase[]> => {
  const allPosts = await getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });
  return allPosts;
};

export const getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict = async <C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  language: LanguageFlag
): Promise<PostBase[]> => {
  const allPosts = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict({ category, subcategory }, language);
  return allPosts;
};

export const getBlogPostStrict = async <C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): Promise<Maybe<PostBase>> => {
  const allPosts = await getBlogPostUnstrict({ category, subcategory }, targettedSlug, langFlag);
  return allPosts;
};

export const getAllBlogCategories = (): BlogCategory[] => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function blogSubcategoryShouldTriggerNotFound<C extends BlogCategory>(
  postsCollection: PostBase[],
  { category, subcategory }: BlogCategoryAndSubcategoriesPair<C>
): boolean {
  const isForcedPath = BlogConfig.FORCED_BLOG_SUBCATEGORIES_PATHS[category]?.includes(subcategory);
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
  const langFlag = language;
  if (langFlag === DEFAULT_LANGUAGE) return url;
  const blogPostPathWithoutI18nPart = url.replace(`/${langFlag}/`, '/');
  return blogPostPathWithoutI18nPart;
}

type DescriptionAsIs = string;
type CroppedDescription = string;

export function getSlicedBlogPostDescription(description: string): DescriptionAsIs | CroppedDescription {
  const takeLimit = BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT - 1;
  if (description.length <= takeLimit) return description;

  const slicedDescription = description.substring(0, takeLimit) + '…';
  return slicedDescription;
}
