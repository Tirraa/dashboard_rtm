import PaginatedElements from '@/components/misc/PaginatedElements';
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
  const title = scopedT(`${category}.${subCategory}`);

  const paginatedElements = postsCollection.map((post, index) => <BlogPostPeview key={index} {...{ post, lng }} />);
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{title}</h1>
      <PaginatedElements {...{ paginatedElements, elementsPerPage: 5 }} />
    </div>
  );
};

export default SubCategoryRelatedBlogPosts;
