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
import type { AppPath } from '@/types/Next';
import type { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { buildAbsolutePathFromParts, getFormattedDate } from './str';

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
export const getAllBlogPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();

export const getAllBlogPostsByCategoryAndSubcategoryUnstrict = ({ category, subcategory }: UnknownCategoryAndUnknownSubcategory): PostBase[] =>
  getAllBlogPostsByCategory(category).filter(({ subcategory: currentPostSubcategory }) => currentPostSubcategory === subcategory);

export const getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict = (
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  language: LanguageFlag
): PostBase[] =>
  getAllBlogPostsByCategory(category).filter(
    ({ subcategory: currentPostSubcategory, language: currentPostLanguage }) =>
      currentPostSubcategory === subcategory && currentPostLanguage === language
  );

export function getBlogPostUnstrict(
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  const postsCollection: PostBase[] = getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

  if (langFlag === DEFAULT_LANGUAGE) {
    return postsCollection.find(
      ({ subcategory: currentPostSubcategory, slug: currentPostSlug }) => currentPostSubcategory === subcategory && currentPostSlug === targettedSlug
    );
  }
  return postsCollection.find(
    ({ subcategory: currentPostSubcategory, slug: currentPostSlug, language: currentPostLanguage }) =>
      currentPostSubcategory === subcategory && currentPostSlug === targettedSlug && currentPostLanguage === langFlag
  );
}

export const getAllBlogPostsByCategoryAndSubcategoryStrict = <C extends BlogCategory>(category: C, subcategory: BlogArchitecture[C]): PostBase[] =>
  getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

export const getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict = <C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  language: LanguageFlag
): PostBase[] => getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict({ category, subcategory }, language);

export const getBlogPostStrict = <C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase => getBlogPostUnstrict({ category, subcategory }, targettedSlug, langFlag);

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

export function isValidBlogCategoryAndSubcategoryPair(category: BlogCategory, subcategory: BlogSubcategoryFromUnknownCategory): boolean {
  if (!isValidBlogCategory(category)) return false;

  const subcategories = getBlogSubcategoriesByCategory(category);
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
