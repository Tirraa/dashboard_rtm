import BlogConfig, { BlogsArchitectures } from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getScopedI18n } from '@/i18n/server';
import { sep } from '@/i18n/settings';
import { getAllPostsByCategoryAndSubCategory, getBlogPostSubCategory } from '@/lib/blog';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogSubCategory, BlogSubCategoryPageProps, CategoryAndSubcategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import PaginatedElements from '../misc/PaginatedElements';
import BlogPostPeview from './BlogPostPreview';
import BlogPostsNotFound from './BlogPostsNotFound';

const shouldTriggerNotFound = <C extends BlogCategory>(postsCollection: PostBase[], { category, subCategory }: CategoryAndSubcategory<C>): boolean =>
  postsCollection.length === 0 && !BlogConfig.forcedBlogSubCategoriesPaths[category]?.includes(subCategory);

type IsValidCategoryAndSubcategory<C extends BlogCategory, S extends BlogSubCategory<C>> = C extends keyof BlogsArchitectures
  ? S extends BlogsArchitectures[C]
    ? true
    : false
  : false;

export const SubCategoryRelatedBlogPosts: FunctionComponent<BlogSubCategoryPageProps> = async ({ params }) => {
  const category = params[BlogTaxonomy.category];
  const subCategory = params[BlogTaxonomy.subCategory] as BlogSubCategory<BlogCategory>;
  const lng = params[i18nTaxonomy.langFlag];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategory({ category, subCategory });
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
