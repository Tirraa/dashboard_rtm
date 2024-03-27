import type { BlogPostPreviewComponentWithMetadatas, BlogSubcategoryPageProps } from '@/types/Blog';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  blogSubcategoryShouldTriggerNotFound
} from '@/lib/blog/api';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';
import BlogConfig from '@/config/blog';

import SubcategoryRelatedBlogPostsClient from './SubcategoryRelatedBlogPostsClient';

const SubcategoryRelatedBlogPosts: FunctionComponent<BlogSubcategoryPageProps> = async ({ params }) => {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);
  if (!isValidPair) notFound();

  const postsCollection: BlogPostPreviewComponentWithMetadatas[] = (
    await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(category, subcategory, language)
  ).map((post) => ({
    blogPostPreviewComp: <BlogPostPreview key={`${post._raw.flattenedPath}-paginated-blog-post`} language={language} post={post} />,
    tagsIndexes: post.tagsIndexes,
    tags: post.tags,
    date: post.date
  }));

  if (blogSubcategoryShouldTriggerNotFound(postsCollection)) notFound();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  else if (postsCollection.length === 0) return <BlogPostsNotFound />;

  const tags = Array.from(
    new Set<BlogTag>(postsCollection.reduce((accumulator, currentValue) => accumulator.concat(currentValue.tags), [] as BlogTag[]))
  );

  return (
    <SubcategoryRelatedBlogPostsClient
      elementsPerPage={BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT}
      postsCollection={postsCollection}
      subcategory={subcategory}
      category={category}
      tags={tags}
    />
  );
};

export default SubcategoryRelatedBlogPosts;
