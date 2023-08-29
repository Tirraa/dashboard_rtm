import BlogConfig, { BlogCategory } from '@/config/blog';
import { LanguageFlag } from '@/config/i18n';
import { getAllPostsByCategoryAndSubCategory, getBlogPostSubCategory } from '@/lib/blog';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogSubCategory, BlogSubCategoryPageProps } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent, ReactNode } from 'react';
import BlogPostsBasedOnReactNodeCollection from '../_hoc/navbar/BlogPostsBasedOnReactNodeCollection';
import BlogPostPeview from './BlogPostPreview';
import BlogPostsNotFound from './BlogPostsNotFound';

function subCategoryRelatedBlogPostsGeneration(posts: PostBase[], lng: LanguageFlag) {
  if (posts.length === 0) return <BlogPostsNotFound {...{ lng }} />;

  const generatedPosts: ReactNode[] = posts.map((post, index) => {
    const postLanguageFlag = getBlogPostLanguageFlag(post);
    if (postLanguageFlag !== lng) return null;
    return <BlogPostPeview key={index} {...{ post }} />;
  });
  return BlogPostsBasedOnReactNodeCollection(generatedPosts, lng);
}

function shouldTriggerNotFound(postsCollection: PostBase[], categ: BlogCategory, subCateg: BlogSubCategory) {
  return postsCollection.length === 0 && !BlogConfig.forcedBlogSubCategoriesPaths[categ]?.includes(subCateg);
}

// {ToDo} i18n this!
export const SubCategoryRelatedBlogPosts: FunctionComponent<BlogSubCategoryPageProps> = ({ params }) => {
  const categ = params[BlogTaxonomy.category];
  const subCateg = params[BlogTaxonomy.subCategory];
  const lng = params[i18nTaxonomy.langFlag];

  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategory(categ, subCateg);
  if (shouldTriggerNotFound(postsCollection, categ, subCateg)) {
    notFound();
  }

  const relatedPosts = postsCollection.filter((post) => getBlogPostSubCategory(post) === subCateg);
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">{subCateg}</h1>
      {subCategoryRelatedBlogPostsGeneration(relatedPosts, lng)}
    </div>
  );
};

export default SubCategoryRelatedBlogPosts;
