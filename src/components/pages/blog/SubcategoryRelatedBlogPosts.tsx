import type { BlogCategoriesAndSubcategoriesAssoc, BlogSubcategoryPageProps, TBlogPost } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  blogSubcategoryShouldTriggerNotFound
} from '@/lib/blog/api';
import MaybePaginatedElements from '@/components/ui/hoc/MaybePaginatedElements';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getScopedI18n } from '@/i18n/server';
import GithubSlugger from 'github-slugger';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';
import BlogConfig from '@/config/blog';

const slugger = new GithubSlugger();

const SubcategoryRelatedBlogPosts: FunctionComponent<BlogSubcategoryPageProps> = async ({ params }) => {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);
  if (!isValidPair) notFound();

  const scopedT = await getScopedI18n(i18ns.blogCategories);

  const postsCollection: TBlogPost[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(category, subcategory, language);

  if (blogSubcategoryShouldTriggerNotFound(postsCollection)) notFound();
  else if (postsCollection.length === 0) return <BlogPostsNotFound />;

  const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
  const [title, curSubcategTitle] = [
    scopedT(`${narrowedCategoryAndSubcategoryAssoc}.title`),
    scopedT(`${narrowedCategoryAndSubcategoryAssoc}.title`)
  ];

  const paginatedElements = postsCollection
    .sort((post1, post2) =>
      BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
    )
    .map((post) => <BlogPostPreview key={`${post._raw.flattenedPath}-paginated-blog-post`} language={language} post={post} />);

  return (
    <section id={slugger.slug(curSubcategTitle)} className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      {/* {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/41 */}
      <MaybePaginatedElements
        elementsPerPage={BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT}
        paginatedElementsBodyWrapperProps={{ className: '[&>article:not(:last-of-type)]:mb-6' }}
        paginatedElements={paginatedElements}
        paginationButtonsPosition="top"
      />
    </section>
  );
};

export default SubcategoryRelatedBlogPosts;
