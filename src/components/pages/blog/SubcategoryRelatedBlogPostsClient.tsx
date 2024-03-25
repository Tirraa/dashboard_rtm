'use client';

import type { BlogCategoriesAndSubcategoriesAssoc, BlogSubcategoryFromUnknownCategory, BlogCategory, BlogPostType } from '@/types/Blog';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import MaybePaginatedElements from '@/components/ui/hoc/MaybePaginatedElements';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import { useCurrentLocale, useScopedI18n } from '@/i18n/client';
import BlogConfig from '@/config/blog';
import { i18ns } from '##/config/i18n';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SubcategoryRelatedBlogPostsClientToolbar = dynamic(() => import('@/components/pages/blog/SubcategoryRelatedBlogPostsClientToolbar'), {
  loading: () => <div className="my-4 min-h-[40px]" />,
  ssr: false
});

interface SubcategoryRelatedBlogPostsClientProps {
  subcategory: BlogSubcategoryFromUnknownCategory;
  postsCollection: BlogPostType[];
  category: BlogCategory;
  tags: BlogTag[];
}

const SubcategoryRelatedBlogPostsClient: FunctionComponent<SubcategoryRelatedBlogPostsClientProps> = ({
  postsCollection,
  subcategory,
  category,
  tags
}) => {
  const [selectedTagsIds, setSelectedTagsIds] = useState<number[]>([]);

  const language = useCurrentLocale();
  const scopedT = useScopedI18n(i18ns.blogCategories);
  const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
  const title = scopedT(`${narrowedCategoryAndSubcategoryAssoc}.title`);

  const maybeFilteredPostsCollection =
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    selectedTagsIds.length === 0
      ? postsCollection
      : postsCollection.filter((post) => post.tagsIndexes.some((tagId) => selectedTagsIds.includes(tagId)));

  const paginatedElements = maybeFilteredPostsCollection
    .sort((post1, post2) =>
      BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
    )
    .map((post) => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      return <BlogPostPreview key={`${post._raw.flattenedPath}-paginated-blog-post`} language={language} post={post} />;
    });

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      {/* {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/41 */}
      <SubcategoryRelatedBlogPostsClientToolbar setSelectedTagsIds={setSelectedTagsIds} selectedTagsIds={selectedTagsIds} tags={tags} />

      <MaybePaginatedElements
        elementsPerPage={BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT}
        paginatedElementsBodyWrapperProps={{ className: 'mb-4 [&>article:not(:last-of-type)]:mb-6' }}
        paginatedElements={paginatedElements}
        className="min-w-full"
      />
    </section>
  );
};

export default SubcategoryRelatedBlogPostsClient;
