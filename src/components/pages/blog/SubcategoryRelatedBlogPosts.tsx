import { i18ns } from '##/config/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import i18nTaxonomy from '##/config/taxonomies/i18n';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import MaybePaginatedElements from '@/components/ui/hoc/MaybePaginatedElements';
import BlogConfig from '@/config/blog';
import { getScopedI18n } from '@/i18n/server';
import { blogSubcategoryShouldTriggerNotFound, getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict } from '@/lib/blog';
import type { BlogSubcategoryPageProps, PostBase } from '@/types/Blog';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';
import slugify from 'slugify';

export const SubcategoryRelatedBlogPosts: FunctionComponent<BlogSubcategoryPageProps> = async ({ params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const lng = params[i18nTaxonomy.LANG_FLAG];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  const postsCollection: PostBase[] = getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict({ category, subcategory }, lng);

  if (blogSubcategoryShouldTriggerNotFound(postsCollection, { category, subcategory })) notFound();
  if (postsCollection.length === 0) return <BlogPostsNotFound />;
  // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
  const [title, curSubcategTitle] = [scopedT(`${category}.${subcategory}.title`), scopedT(`${category}.${subcategory}.title`)];

  const paginatedElements = postsCollection
    .sort((post1, post2) =>
      BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
    )
    .map((post) => <BlogPostPreview key={`${post._raw.flattenedPath}-paginated-blog-post`} post={post} lng={lng} />);

  return (
    <section className="w-full" id={slugify(curSubcategTitle.toLowerCase())}>
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      <MaybePaginatedElements
        paginatedElements={paginatedElements}
        elementsPerPage={BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT}
        paginationButtonsPosition="top"
        paginatedElementsBodyWrapperProps={{ className: '[&>article:not(:last-of-type)]:mb-6' }}
      />
    </section>
  );
};

export default SubcategoryRelatedBlogPosts;
