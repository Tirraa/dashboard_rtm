import { getAllPostsByCategoryAndSubCategory, getBlogPostSubCategory } from '@/lib/blog';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogSubCategoryPageProps } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import BlogPostPeview from './BlogPostPreview';
import BlogPostsNotFound from './BlogPostsNotFound';

function subCategoryRelatedBlogPostsGeneration(posts: PostBase[], langFlag: string) {
  if (posts.length === 0) return <BlogPostsNotFound />;

  return posts.map((post, index) => {
    const postLanguageFlag = getBlogPostLanguageFlag(post);
    if (postLanguageFlag !== langFlag) return null;
    return <BlogPostPeview key={index} {...{ post }} />;
  });
}

// {ToDo} i18n this!
export const SubCategoryRelatedBlogPosts: FunctionComponent<BlogSubCategoryPageProps> = ({ params }) => {
  const categ = params[BlogTaxonomy.category];
  const subCateg = params[BlogTaxonomy.subCategory];
  const langFlag = params[i18nTaxonomy.langFlag];

  let postsCollection: PostBase[] = [];
  try {
    postsCollection = getAllPostsByCategoryAndSubCategory(categ, subCateg);
  } catch {
    notFound();
  }

  const relatedPosts = postsCollection.filter((post) => getBlogPostSubCategory(post) === subCateg);
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">{subCateg}</h1>
      {subCategoryRelatedBlogPostsGeneration(relatedPosts, langFlag)}
    </div>
  );
};

export default SubCategoryRelatedBlogPosts;
