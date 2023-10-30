import BlogConfig from '@/config/blog';
import { getBlogPostSubcategory } from '@/lib/blog';
import { BlogCategory, BlogSubcategoryFromUnknownCategory } from '@/types/Blog';

namespace BlogCache {
  export const subCategoriesCollection = {} as Record<BlogCategory, BlogSubcategoryFromUnknownCategory[]>;
}

function buildSubcategoriesSet(category: BlogCategory): Set<BlogSubcategoryFromUnknownCategory> {
  try {
    const relatedPosts = BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[category]();
    const subCategoriesSet = new Set<BlogSubcategoryFromUnknownCategory>();

    relatedPosts.forEach((post) => subCategoriesSet.add(getBlogPostSubcategory(post)));
    return subCategoriesSet;
  } catch {
    const emptySet = new Set<BlogSubcategoryFromUnknownCategory>();
    return emptySet;
  }
}

function populateSubcategoriesCollectionCache(category: BlogCategory) {
  const subCategsSet = buildSubcategoriesSet(category);
  BlogCache.subCategoriesCollection[category] = Array.from(subCategsSet);
}

function subCategoriesByCategoryGetter(category: BlogCategory) {
  if (BlogCache.subCategoriesCollection[category] === undefined) populateSubcategoriesCollectionCache(category);
  return BlogCache.subCategoriesCollection[category];
}

export const getBlogSubcategoriesByCategory = (category: BlogCategory): BlogSubcategoryFromUnknownCategory[] =>
  subCategoriesByCategoryGetter(category);
