import type { BlogCategoriesAndSubcategoriesAssoc, BlogSubcategoryPageProps, BlogPostType } from '@/types/Blog';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
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
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';
import BlogConfig from '@/config/blog';

import FiltersWidgetDesktop from './FiltersWidgetDesktop';

const SubcategoryRelatedBlogPosts: FunctionComponent<BlogSubcategoryPageProps> = async ({ params }) => {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);
  if (!isValidPair) notFound();

  const scopedT = await getScopedI18n(i18ns.blogCategories);

  const postsCollection: BlogPostType[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(category, subcategory, language);

  if (blogSubcategoryShouldTriggerNotFound(postsCollection)) notFound();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  else if (postsCollection.length === 0) return <BlogPostsNotFound />;

  const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
  const title = scopedT(`${narrowedCategoryAndSubcategoryAssoc}.title`);

  const paginatedElements = postsCollection
    .sort((post1, post2) =>
      BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
    )
    .map((post) => <BlogPostPreview key={`${post._raw.flattenedPath}-paginated-blog-post`} language={language} post={post} />);

  const tags = Array.from(
    new Set<BlogTag>(postsCollection.reduce((accumulator, currentValue) => accumulator.concat(currentValue.tags), [] as BlogTag[]))
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showFilters = tags.length > 1;

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      {/* {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/41 */}
      {showFilters && <FiltersWidgetDesktop tags={tags} />}

      <MaybePaginatedElements
        elementsPerPage={BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT}
        paginatedElementsBodyWrapperProps={{ className: 'mb-4 [&>article:not(:last-of-type)]:mb-6' }}
        paginatedElements={paginatedElements}
        paginationButtonsPosition="top"
        className="min-w-full"
      />
    </section>
  );
};

export default SubcategoryRelatedBlogPosts;
