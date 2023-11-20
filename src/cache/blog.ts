import { LANGUAGES } from '##/config/i18n';
import type { LanguageFlag } from '##/types/hell/i18n';
import { getAllBlogPostsByCategoryAndLanguage } from '@/lib/blog';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';

namespace BlogCache {
  export const subcategoriesCollection = Object.fromEntries(LANGUAGES.map((language) => [language, {}])) as Record<
    LanguageFlag,
    Record<BlogCategory, BlogSubcategoryFromUnknownCategory[]>
  >;
}

async function buildSubcategoriesSet(category: BlogCategory, language: LanguageFlag): Promise<Set<BlogSubcategoryFromUnknownCategory>> {
  try {
    const relatedPosts: PostBase[] = await getAllBlogPostsByCategoryAndLanguage(category, language);
    const subcategoriesSet = new Set<BlogSubcategoryFromUnknownCategory>();

    relatedPosts.forEach(({ subcategory }) => subcategoriesSet.add(subcategory as BlogSubcategoryFromUnknownCategory));
    return subcategoriesSet;
  } catch {
    const emptySet = new Set<BlogSubcategoryFromUnknownCategory>();
    return emptySet;
  }
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
