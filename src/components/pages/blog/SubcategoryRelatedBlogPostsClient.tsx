'use client';

import type { BlogCategoriesAndSubcategoriesAssoc, BlogSubcategoryFromUnknownCategory, BlogCategory, BlogPostType } from '@/types/Blog';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { FunctionComponent } from 'react';

import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import PaginatedElements from '@/components/ui/PaginatedElements';
import { useCurrentLocale, useScopedI18n } from '@/i18n/client';
import usePagination from '@/components/hooks/usePagination';
import { useEffect, useState, useMemo, useRef } from 'react';
import { SlidingList } from '@rtm/shared-lib/datastructs';
import BlogConfig from '@/config/blog';
import { i18ns } from '##/config/i18n';
import dynamic from 'next/dynamic';

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

const elementsPerPage = BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT;

function computePaginatedElements(selectedTagsIds: number[], postsCollection: BlogPostType[], language: LanguageFlag) {
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

  return paginatedElements;
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

  const paginatedElements = useMemo(
    () => computePaginatedElements(selectedTagsIds, postsCollection, language),
    [language, postsCollection, selectedTagsIds]
  );

  const pagesAmount = usePagination(paginatedElements, elementsPerPage);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const pagesAmountHistory = useRef<SlidingList>(new SlidingList(2));

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (pagesAmount === -1) return;
    const historyLength = pagesAmountHistory.current.getPtr().length;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const historyLastIdx = historyLength - 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (historyLength === 0) {
      pagesAmountHistory.current.push(pagesAmount);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (pagesAmount !== pagesAmountHistory.current.getPtr()[historyLastIdx]) {
      // {ToDo} Remove this debug console.log
      console.log('Changed pages amount!');
      pagesAmountHistory.current.push(pagesAmount);
    }
  }, [pagesAmount]);

  const paginated = useMemo(
    () => <PaginatedElements paginatedElements={paginatedElements} elementsPerPage={elementsPerPage} pagesAmount={pagesAmount} />,
    [pagesAmount, paginatedElements]
  );

  const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
  const title = scopedT(`${narrowedCategoryAndSubcategoryAssoc}.title`);

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      <SubcategoryRelatedBlogPostsClientToolbar
        setSelectedTagsIds={setSelectedTagsIds}
        selectedTagsIds={selectedTagsIds}
        pagesAmount={pagesAmount}
        tags={tags}
      />
      <div className="mb-4 flex min-w-full flex-col [&>article:not(:last-of-type)]:mb-6">{paginated}</div>
    </section>
  );
};

export default SubcategoryRelatedBlogPostsClient;
