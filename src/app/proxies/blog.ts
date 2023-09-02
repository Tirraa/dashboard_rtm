import BlogConfig from '@/config/blog';
import { getBlogPostSubCategory } from '@/lib/blog';
import { BlogCategory, BlogSubCategory, BlogSubCategoryUnknownKey } from '@/types/Blog';

namespace BlogProxy {
  export const subCategoriesPtr: Partial<Record<BlogCategory, BlogSubCategoryUnknownKey[]>> = {};
}

function buildSubCategoriesSet(category: BlogCategory): Set<BlogSubCategory<BlogCategory>> {
  const subCategoriesSet = new Set<BlogSubCategory<BlogCategory>>();
  const relatedPosts = BlogConfig.blogCategoriesAllPostsTypesAssoc[category]();
  relatedPosts.forEach((post) => subCategoriesSet.add(getBlogPostSubCategory(post) as BlogSubCategory<BlogCategory>));
  return subCategoriesSet;
}

function subCategoriesByCategoryAccessor(category: BlogCategory, fresh: boolean) {
  if (fresh || BlogProxy.subCategoriesPtr[category] === undefined) {
    const subCategsSet = buildSubCategoriesSet(category);
    BlogProxy.subCategoriesPtr[category] = Array.from(subCategsSet);
  }
  return BlogProxy.subCategoriesPtr[category] as BlogSubCategory<BlogCategory>[];
}

export function getBlogSubCategoriesByCategory(category: BlogCategory, fresh: boolean = true): BlogSubCategory<BlogCategory>[] {
  return subCategoriesByCategoryAccessor(category, fresh);
}
