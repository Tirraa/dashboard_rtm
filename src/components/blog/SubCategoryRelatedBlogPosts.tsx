import BlogConfig, { BlogCategory } from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getServerSideTranslation } from '@/i18n';
import { keySeparator } from '@/i18n/settings';
import { getAllPostsByCategoryAndSubCategory, getBlogPostSubCategory } from '@/lib/blog';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogSubCategory, BlogSubCategoryPageProps } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import PaginatedElements from '../misc/PaginatedElements';
import BlogPostPeview from './BlogPostPreview';
import BlogPostsNotFound from './BlogPostsNotFound';

function shouldTriggerNotFound(postsCollection: PostBase[], categ: BlogCategory, subCateg: BlogSubCategory) {
  return postsCollection.length === 0 && !BlogConfig.forcedBlogSubCategoriesPaths[categ]?.includes(subCateg);
}

export const SubCategoryRelatedBlogPosts: FunctionComponent<BlogSubCategoryPageProps> = async ({ params }) => {
  const categ = params[BlogTaxonomy.category];
  const subCateg = params[BlogTaxonomy.subCategory];
  const lng = params[i18nTaxonomy.langFlag];
  const { t } = await getServerSideTranslation(lng, i18ns.blogCategories);

  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategory(categ, subCateg);
  if (shouldTriggerNotFound(postsCollection, categ, subCateg)) notFound();

  const relatedPosts = postsCollection.filter((post) => getBlogPostSubCategory(post) === subCateg && getBlogPostLanguageFlag(post) === lng);

  if (relatedPosts.length === 0) return <BlogPostsNotFound {...{ lng }} />;

  const paginatedElements = relatedPosts.map((post, index) => <BlogPostPeview key={index} {...{ post, lng }} />);
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{t(categ + keySeparator + subCateg)}</h1>
      <PaginatedElements {...{ paginatedElements, elementsPerPage: 5 }} />
    </div>
  );
};

export default SubCategoryRelatedBlogPosts;
