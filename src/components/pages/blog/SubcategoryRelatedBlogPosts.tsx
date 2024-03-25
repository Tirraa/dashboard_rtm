import type { BlogSubcategoryPageProps, BlogPostType } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  blogSubcategoryShouldTriggerNotFound
} from '@/lib/blog/api';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';

import SubcategoryRelatedBlogPostsClient from './SubcategoryRelatedBlogPostsClient';

const SubcategoryRelatedBlogPosts: FunctionComponent<BlogSubcategoryPageProps> = async ({ params }) => {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);
  if (!isValidPair) notFound();

  const postsCollection: BlogPostType[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(category, subcategory, language);

  if (blogSubcategoryShouldTriggerNotFound(postsCollection)) notFound();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  else if (postsCollection.length === 0) return <BlogPostsNotFound />;

  return <SubcategoryRelatedBlogPostsClient postsCollection={postsCollection} subcategory={subcategory} category={category} />;
};

export default SubcategoryRelatedBlogPosts;
