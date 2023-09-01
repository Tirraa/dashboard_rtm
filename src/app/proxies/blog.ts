import BlogConfig from '@/config/blog';
import { getBlogPostSubCategory } from '@/lib/blog';
import { BlogCategory, BlogSubCategory, BlogSubCategoryUnknownKey } from '@/types/Blog';

namespace BlogProxy {
  export const subCategoriesPtr: Partial<Record<BlogCategory, BlogSubCategoryUnknownKey[]>> = {};
}

function buildSubCategoriesSet(category: BlogCategory): Set<BlogSubCategory<typeof category>> {
  const subCategoriesSet = new Set<BlogSubCategory<typeof category>>();
  const relatedPosts = BlogConfig.blogCategoriesAllPostsTypesAssoc[category]();
  relatedPosts.forEach((post) => subCategoriesSet.add(getBlogPostSubCategory(post) as BlogSubCategory<typeof category>));
  return subCategoriesSet;
}

function subCategoriesByCategoryAccessor(category: BlogCategory, fresh: boolean) {
  if (fresh || BlogProxy.subCategoriesPtr[category] === undefined) {
    const subCategsSet = buildSubCategoriesSet(category);
    BlogProxy.subCategoriesPtr[category] = Array.from(subCategsSet);
  }
  return BlogProxy.subCategoriesPtr[category] as BlogSubCategory<typeof category>[];
}

export function getBlogSubCategoriesByCategory(category: BlogCategory, fresh: boolean = true): BlogSubCategory<typeof category>[] {
  return subCategoriesByCategoryAccessor(category, fresh);
}
