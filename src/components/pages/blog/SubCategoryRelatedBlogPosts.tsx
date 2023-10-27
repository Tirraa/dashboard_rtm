import BlogPostPreview from '@/components/shared/ui/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/shared/ui/blog/BlogPostsNotFound';
import MaybePaginatedElements from '@/components/shared/ui/hoc/MaybePaginatedElements';
import BlogConfig from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getScopedI18n } from '@/i18n/server';
import { getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict, subCategoryShouldTriggerNotFound } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogSubCategoryPageProps, PostBase } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import slugify from 'slugify';

export const SubCategoryRelatedBlogPosts: FunctionComponent<BlogSubCategoryPageProps> = async ({ params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subCategory = params[BlogTaxonomy.SUBCATEGORY];
  const lng = params[i18nTaxonomy.LANG_FLAG];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict({ category, subCategory }, lng);

  if (subCategoryShouldTriggerNotFound(postsCollection, { category, subCategory })) notFound();
  if (postsCollection.length === 0) return <BlogPostsNotFound {...{ lng }} />;
  // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
  const [title, curSubCategTitle] = [scopedT(`${category}.${subCategory}.title`), scopedT(`${category}.${subCategory}.title`)];

  const paginatedElements = postsCollection.map((post) => (
    <BlogPostPreview key={`${post._raw.flattenedPath}-paginated-blog-post`} {...{ post, lng }} />
  ));

  return (
    <section className="mx-auto max-w-xl py-8" id={slugify(curSubCategTitle.toLowerCase())}>
      <h1 className="text-left mb-2">{title}</h1>
      <MaybePaginatedElements
        {...{ paginatedElements, elementsPerPage: BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT }}
        paginationButtonsPosition="top"
        paginatedElementsBodyWrapperProps={{ className: '[&>article:not(:last-of-type)]:mb-6' }}
      />
    </section>
  );
};

export default SubCategoryRelatedBlogPosts;
