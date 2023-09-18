import BlogConfig from '@/config/blog';
import { getBlogPostSubCategory } from '@/lib/blog';
import { BlogCategory, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';

namespace BlogCache {
  export const subCategoriesCollection: Partial<Record<BlogCategory, BlogSubCategoryFromUnknownCategory[]>> = {};
}

function buildSubCategoriesSet(category: BlogCategory): Set<BlogSubCategoryFromUnknownCategory> {
  const subCategoriesSet = new Set<BlogSubCategoryFromUnknownCategory>();
  const relatedPosts = BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[category]();

  relatedPosts.forEach((post) => subCategoriesSet.add(getBlogPostSubCategory(post)));
  return subCategoriesSet;
}

function subCategoriesByCategoryAccessor(category: BlogCategory, fresh: boolean) {
  if (fresh || BlogCache.subCategoriesCollection[category] === undefined) {
    const subCategsSet = buildSubCategoriesSet(category);
    BlogCache.subCategoriesCollection[category] = Array.from(subCategsSet);
  }
  return BlogCache.subCategoriesCollection[category] as BlogSubCategoryFromUnknownCategory[];
}

export const getBlogSubCategoriesByCategory = (category: BlogCategory, fresh: boolean = true): BlogSubCategoryFromUnknownCategory[] =>
  subCategoriesByCategoryAccessor(category, fresh);
