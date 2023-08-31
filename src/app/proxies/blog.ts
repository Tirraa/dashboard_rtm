import BlogConfig, { BlogCategory } from '@/config/blog';
import { getBlogPostSubCategory } from '@/lib/blog';
import { BlogSubCategory } from '@/types/Blog';

namespace BlogProxy {
  export let subCategoriesPtr: Partial<Record<BlogCategory, BlogSubCategory[]>> = {};
}

function buildSubCategoriesSet(category: BlogCategory) {
  const subCategoriesSet = new Set<string>();
  const relatedPosts = BlogConfig.blogCategoriesAllPostsTypesAssoc[category]();
  relatedPosts.forEach((post) => subCategoriesSet.add(getBlogPostSubCategory(post)));
  return subCategoriesSet;
}

function subCategoriesByCategoryAccessor(category: BlogCategory, fresh = true) {
  if (fresh || BlogProxy.subCategoriesPtr[category] === undefined) {
    const subCategsSet = buildSubCategoriesSet(category);
    BlogProxy.subCategoriesPtr[category] = Array.from(subCategsSet);
  }
  return BlogProxy.subCategoriesPtr[category] as BlogSubCategory[];
}

export function blogSubCategoriesByCategory(category: BlogCategory): BlogSubCategory[] {
  return subCategoriesByCategoryAccessor(category);
}
