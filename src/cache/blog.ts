import BlogConfig from '@/config/blog';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory } from '@/types/Blog';

namespace BlogCache {
  export const subcategoriesCollection = {} as Record<BlogCategory, BlogSubcategoryFromUnknownCategory[]>;
}

async function buildSubcategoriesSet(category: BlogCategory): Promise<Set<BlogSubcategoryFromUnknownCategory>> {
  try {
    const relatedPosts = await BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[category]();
    const subcategoriesSet = new Set<BlogSubcategoryFromUnknownCategory>();

    relatedPosts.forEach(({ subcategory }) => subcategoriesSet.add(subcategory as BlogSubcategoryFromUnknownCategory));
    return subcategoriesSet;
  } catch {
    const emptySet = new Set<BlogSubcategoryFromUnknownCategory>();
    return emptySet;
  }
}

async function populateSubcategoriesCollectionCache(category: BlogCategory) {
  const subcategsSet = await buildSubcategoriesSet(category);
  BlogCache.subcategoriesCollection[category] = Array.from(subcategsSet);
}

async function subcategoriesByCategoryGetter(category: BlogCategory) {
  if (BlogCache.subcategoriesCollection[category] === undefined) await populateSubcategoriesCollectionCache(category);
  return BlogCache.subcategoriesCollection[category];
}

export async function getBlogSubcategoriesByCategory(category: BlogCategory): Promise<BlogSubcategoryFromUnknownCategory[]> {
  const subcategories = await subcategoriesByCategoryGetter(category);
  return subcategories;
}
