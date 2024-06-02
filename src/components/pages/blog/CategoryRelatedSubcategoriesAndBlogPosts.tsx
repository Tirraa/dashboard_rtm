import type { BlogCategoryPageProps, BlogPostType } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import blogCategoryPageBuilder from '@/lib/blog/blogCategoryPageBuilder';
import { getAllBlogPostsByCategory } from '@/lib/blog/api';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getScopedI18n } from '@/i18n/server';
import BlogConfig from '@/config/Blog/server';
import ComputedBlogCtx from '@/lib/blog/ctx';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

interface CategoryRelatedSubcategoriesAndBlogPostsProps extends BlogCategoryPageProps {}

const CategoryRelatedSubcategoriesAndBlogPosts: FunctionComponent<CategoryRelatedSubcategoriesAndBlogPostsProps> = async ({ params }) => {
  const [language, category] = [params[I18nTaxonomy.LANGUAGE], params[BlogTaxonomy.CATEGORY]];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  let gettedOnTheFlyPosts: BlogPostType[] = [];
  // {ToDo} Smells like code duplicates, see blog API and review this!
  const getBlogPostsWithAllowedDraftsCtx = (postsCollection: BlogPostType[]): BlogPostType[] =>
    ComputedBlogCtx.TESTING
      ? postsCollection
      : postsCollection.filter(({ category: currentPostCategory }) => currentPostCategory !== BlogConfig.TESTING_CATEGORY);

  const getBlogPostsWithDisallowedDraftsCtx = (postsCollection: BlogPostType[]): BlogPostType[] =>
    ComputedBlogCtx.TESTING
      ? postsCollection.filter(({ draft: currentPostDraft }) => !currentPostDraft)
      : postsCollection.filter(
          ({ category: currentPostCategory, draft: currentPostDraft }) => currentPostCategory !== BlogConfig.TESTING_CATEGORY && !currentPostDraft
        );

  const postsCollection = await getAllBlogPostsByCategory(category);
  if (postsCollection === null) notFound();

  gettedOnTheFlyPosts = ComputedBlogCtx.ALLOWED_DRAFTS
    ? getBlogPostsWithAllowedDraftsCtx(postsCollection)
    : getBlogPostsWithDisallowedDraftsCtx(postsCollection);

  const posts = gettedOnTheFlyPosts.sort((post1, post2) =>
    BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
  );

  const content = await blogCategoryPageBuilder(posts, category, language);

  return (
    <div className="w-full">
      <h1 className="text-center">{scopedT(`${category}._title`)}</h1>
      {content}
    </div>
  );
};

export default CategoryRelatedSubcategoriesAndBlogPosts;
