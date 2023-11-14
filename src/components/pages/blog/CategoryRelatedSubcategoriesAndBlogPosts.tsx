import { i18ns } from '##/config/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import i18nTaxonomy from '##/config/taxonomies/i18n';
import BlogConfig from '@/config/blog';
import { getScopedI18n } from '@/i18n/server';
import blogCategoryPageBuilder from '@/lib/blog/blogCategoryPageBuilder';
import type { BlogCategory, BlogCategoryPageProps, PostBase } from '@/types/Blog';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';

interface CategoryRelatedSubcategoriesAndBlogPostsProps extends BlogCategoryPageProps {}

export const CategoryRelatedSubcategoriesAndBlogPosts: FunctionComponent<CategoryRelatedSubcategoriesAndBlogPostsProps> = async ({ params }) => {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  const category: BlogCategory = params[BlogTaxonomy.CATEGORY];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  let gettedOnTheFlyPosts: PostBase[] = [];
  try {
    gettedOnTheFlyPosts = BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[category]();
  } catch {
    notFound();
  }

  const posts = gettedOnTheFlyPosts.sort((post1, post2) =>
    BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
  );
  const generatedContent = await blogCategoryPageBuilder(posts, category, lng);

  return (
    <div className="w-full">
      <h1 className="text-center">{scopedT(`${category}._title`)}</h1>
      {generatedContent}
    </div>
  );
};

export default CategoryRelatedSubcategoriesAndBlogPosts;
