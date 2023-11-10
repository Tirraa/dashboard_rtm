import BlogConfig from '@/config/blog';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory } from '@/types/Blog';

namespace BlogCache {
  export const subcategoriesCollection = {} as Record<BlogCategory, BlogSubcategoryFromUnknownCategory[]>;
}

function buildSubcategoriesSet(category: BlogCategory): Set<BlogSubcategoryFromUnknownCategory> {
  try {
    const relatedPosts = BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[category]();
    const subcategoriesSet = new Set<BlogSubcategoryFromUnknownCategory>();

    relatedPosts.forEach(({ subcategory }) => subcategoriesSet.add(subcategory as BlogSubcategoryFromUnknownCategory));
    return subcategoriesSet;
  } catch {
    const emptySet = new Set<BlogSubcategoryFromUnknownCategory>();
    return emptySet;
  }
}

function populateSubcategoriesCollectionCache(category: BlogCategory) {
  const subcategsSet = buildSubcategoriesSet(category);
  BlogCache.subcategoriesCollection[category] = Array.from(subcategsSet);
}

function subcategoriesByCategoryGetter(category: BlogCategory) {
  if (BlogCache.subcategoriesCollection[category] === undefined) populateSubcategoriesCollectionCache(category);
  return BlogCache.subcategoriesCollection[category];
}

export const getBlogSubcategoriesByCategory = (category: BlogCategory): BlogSubcategoryFromUnknownCategory[] =>
  subcategoriesByCategoryGetter(category);
