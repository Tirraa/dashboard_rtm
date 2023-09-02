import BlogConfig from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getScopedI18n } from '@/i18n/server';
import { sep } from '@/i18n/settings';
import { getAllPostsByCategoryAndSubCategoryUnstrict, getBlogPostSubCategory } from '@/lib/blog';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogSubCategoryFromUnknownCategory, BlogSubCategoryPageProps, UnknownCategoryAndUnknownSubCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import PaginatedElements from '../misc/PaginatedElements';
import BlogPostPeview from './BlogPostPreview';
import BlogPostsNotFound from './BlogPostsNotFound';

const shouldTriggerNotFound = (postsCollection: PostBase[], { category, subCategory }: UnknownCategoryAndUnknownSubCategory): boolean => {
  // @ts-ignore
  return postsCollection.length === 0 && !BlogConfig.forcedBlogSubCategoriesPaths[category]?.includes(subCategory);
};

export const SubCategoryRelatedBlogPosts: FunctionComponent<BlogSubCategoryPageProps> = async ({ params }) => {
  const category = params[BlogTaxonomy.category];
  const subCategory = params[BlogTaxonomy.subCategory] as BlogSubCategoryFromUnknownCategory;
  const lng = params[i18nTaxonomy.langFlag];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategoryUnstrict({ category, subCategory });
  if (shouldTriggerNotFound(postsCollection, { category, subCategory })) notFound();
  const relatedPosts = postsCollection.filter((post) => getBlogPostSubCategory(post) === subCategory && getBlogPostLanguageFlag(post) === lng);

  if (relatedPosts.length === 0) return <BlogPostsNotFound {...{ lng }} />;
  // @ts-ignore
  const title = scopedT(`${category}${sep}${subCategory}`);

  const paginatedElements = relatedPosts.map((post, index) => <BlogPostPeview key={index} {...{ post, lng }} />);
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{title}</h1>
      <PaginatedElements {...{ paginatedElements, elementsPerPage: 5 }} />
    </div>
  );
};

export default SubCategoryRelatedBlogPosts;
