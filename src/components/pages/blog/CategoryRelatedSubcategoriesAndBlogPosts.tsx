import { i18ns } from '##/config/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import BlogConfig from '@/config/blog';
import { getScopedI18n } from '@/i18n/server';
import { getAllBlogPostsByCategory } from '@/lib/blog/api';
import blogCategoryPageBuilder from '@/lib/blog/blogCategoryPageBuilder';
import ComputedBlogCtx from '@/lib/blog/ctx';
import type { BlogCategory, BlogCategoryPageProps, PostBase } from '@/types/Blog';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';

interface CategoryRelatedSubcategoriesAndBlogPostsProps extends BlogCategoryPageProps {}

const CategoryRelatedSubcategoriesAndBlogPosts: FunctionComponent<CategoryRelatedSubcategoriesAndBlogPostsProps> = async ({ params }) => {
  const language = params[I18nTaxonomy.LANGUAGE];
  const category: BlogCategory = params[BlogTaxonomy.CATEGORY];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  let gettedOnTheFlyPosts: PostBase[] = [];
  const getPostsWithAllowedDraftsCtx = (postsCollection: PostBase[]): PostBase[] =>
    ComputedBlogCtx.TESTING
      ? postsCollection
      : postsCollection.filter(({ category: currentPostCategory }) => currentPostCategory !== BlogConfig.TESTING_CATEGORY);

  const getPostsWithDisallowedDraftsCtx = (postsCollection: PostBase[]): PostBase[] =>
    ComputedBlogCtx.TESTING
      ? postsCollection.filter(({ draft: currentPostDraft }) => !currentPostDraft)
      : postsCollection.filter(
          ({ draft: currentPostDraft, category: currentPostCategory }) => currentPostCategory !== BlogConfig.TESTING_CATEGORY && !currentPostDraft
        );

  const postsCollection = await getAllBlogPostsByCategory(category);
  if (postsCollection === null) notFound();

  gettedOnTheFlyPosts = ComputedBlogCtx.ALLOWED_DRAFTS
    ? getPostsWithAllowedDraftsCtx(postsCollection)
    : getPostsWithDisallowedDraftsCtx(postsCollection);

  const posts = gettedOnTheFlyPosts.sort((post1, post2) =>
    BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
  );
  const generatedContent = await blogCategoryPageBuilder(posts, category, language);

  return (
    <div className="w-full">
      <h1 className="text-center">{scopedT(`${category}._title`)}</h1>
      {generatedContent}
    </div>
  );
};

export default CategoryRelatedSubcategoriesAndBlogPosts;
