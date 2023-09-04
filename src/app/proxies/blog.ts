import BlogConfig from '@/config/blog';
import { getBlogPostSubCategory } from '@/lib/blog';
import { BlogCategory, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';

namespace BlogProxy {
  export const subCategoriesPtr: Partial<Record<BlogCategory, BlogSubCategoryFromUnknownCategory[]>> = {};
}

function buildSubCategoriesSet(category: BlogCategory): Set<BlogSubCategoryFromUnknownCategory> {
  const subCategoriesSet = new Set<BlogSubCategoryFromUnknownCategory>();
  const relatedPosts = BlogConfig.blogCategoriesAllPostsTypesAssoc[category]();

  relatedPosts.forEach((post) => subCategoriesSet.add(getBlogPostSubCategory(post) as BlogSubCategoryFromUnknownCategory));
  return subCategoriesSet;
}

function subCategoriesByCategoryAccessor(category: BlogCategory, fresh: boolean) {
  if (fresh || BlogProxy.subCategoriesPtr[category] === undefined) {
    const subCategsSet = buildSubCategoriesSet(category);
    BlogProxy.subCategoriesPtr[category] = Array.from(subCategsSet);
  }
  return BlogProxy.subCategoriesPtr[category] as BlogSubCategoryFromUnknownCategory[];
}

export const getBlogSubCategoriesByCategory = (category: BlogCategory, fresh: boolean = true): BlogSubCategoryFromUnknownCategory[] =>
  subCategoriesByCategoryAccessor(category, fresh);
