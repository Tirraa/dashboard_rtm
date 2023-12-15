import { LANGUAGES } from '##/config/i18n';
import { getAllBlogPostsByCategoryAndLanguage } from '@/lib/blog/api';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { MaybeNull } from 'packages/shared-types/src/CustomUtilityTypes';

namespace BlogCache {
  export const subcategoriesCollection = Object.fromEntries(LANGUAGES.map((language) => [language, {}])) as Record<
    LanguageFlag,
    Record<BlogCategory, BlogSubcategoryFromUnknownCategory[]>
  >;
}

async function buildSubcategoriesSet(category: BlogCategory, language: LanguageFlag): Promise<Set<BlogSubcategoryFromUnknownCategory>> {
  const relatedPosts: MaybeNull<PostBase[]> = await getAllBlogPostsByCategoryAndLanguage(category, language);
  const subcategoriesSet = new Set<BlogSubcategoryFromUnknownCategory>();

  if (relatedPosts === null) {
    const emptySet = new Set<BlogSubcategoryFromUnknownCategory>();
    return emptySet;
  }
  relatedPosts.forEach(({ subcategory }) => subcategoriesSet.add(subcategory as BlogSubcategoryFromUnknownCategory));
  return subcategoriesSet;
}

async function populateSubcategoriesCollectionCache(category: BlogCategory, language: LanguageFlag) {
  const subcategsSet: Set<BlogSubcategoryFromUnknownCategory> = await buildSubcategoriesSet(category, language);
  BlogCache.subcategoriesCollection[language][category] = Array.from(subcategsSet);
}

async function subcategoriesByCategoryGetter(category: BlogCategory, language: LanguageFlag) {
  if (BlogCache.subcategoriesCollection[language][category] === undefined) await populateSubcategoriesCollectionCache(category, language);
  return BlogCache.subcategoriesCollection[language][category];
}

export async function getBlogSubcategoriesByCategory(category: BlogCategory, language: LanguageFlag): Promise<BlogSubcategoryFromUnknownCategory[]> {
  const subcategories: BlogSubcategoryFromUnknownCategory[] = await subcategoriesByCategoryGetter(category, language);
  return subcategories;
}
