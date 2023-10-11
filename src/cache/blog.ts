import BlogConfig from '@/config/blog';
import { getBlogPostSubCategory } from '@/lib/blog';
import { BlogCategory, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';

namespace BlogCache {
  export const subCategoriesCollection: Partial<Record<BlogCategory, BlogSubCategoryFromUnknownCategory[]>> = {};
}

function buildSubCategoriesSet(category: BlogCategory): Set<BlogSubCategoryFromUnknownCategory> {
  try {
    const relatedPosts = BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[category]();
    const subCategoriesSet = new Set<BlogSubCategoryFromUnknownCategory>();

    relatedPosts.forEach((post) => subCategoriesSet.add(getBlogPostSubCategory(post)));
    return subCategoriesSet;
  } catch {
    const emptySet = new Set<BlogSubCategoryFromUnknownCategory>();
    return emptySet;
  }
}

function populateSubCategoriesCollectionCache(category: BlogCategory) {
  const subCategsSet = buildSubCategoriesSet(category);
  BlogCache.subCategoriesCollection[category] = Array.from(subCategsSet);
}

function subCategoriesByCategoryGetter(category: BlogCategory) {
  if (BlogCache.subCategoriesCollection[category] === undefined) populateSubCategoriesCollectionCache(category);
  return BlogCache.subCategoriesCollection[category] as BlogSubCategoryFromUnknownCategory[];
}

export const getBlogSubCategoriesByCategory = (category: BlogCategory): BlogSubCategoryFromUnknownCategory[] =>
  subCategoriesByCategoryGetter(category);
