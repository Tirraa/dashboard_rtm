import PaginatedElements from '@/components/misc/PaginatedElements';
import BlogConfig from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getScopedI18n } from '@/i18n/server';
import { getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict, subCategoryShouldTriggerNotFound } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogSubCategoryPageProps } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import BlogPostPeview from './BlogPostPreview';
import BlogPostsNotFound from './BlogPostsNotFound';

export const SubCategoryRelatedBlogPosts: FunctionComponent<BlogSubCategoryPageProps> = async ({ params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subCategory = params[BlogTaxonomy.SUBCATEGORY];
  const lng = params[i18nTaxonomy.LANG_FLAG];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict({ category, subCategory }, lng);

  if (subCategoryShouldTriggerNotFound(postsCollection, { category, subCategory })) notFound();
  if (postsCollection.length === 0) return <BlogPostsNotFound {...{ lng }} />;
  // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
  const title = scopedT(`${category}.${subCategory}.title`);

  const paginatedElements = postsCollection.map((post) => (
    <BlogPostPeview key={`${post._raw.flattenedPath}-paginated-blog-post`} {...{ post, lng }} />
  ));
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{title}</h1>
      <PaginatedElements {...{ paginatedElements, elementsPerPage: BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT }} />
    </div>
  );
};

export default SubCategoryRelatedBlogPosts;
