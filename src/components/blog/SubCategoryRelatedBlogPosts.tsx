import { getAllPostsByCategoryAndSubCategory, getBlogPostSubCategoryBasedOnPostObj } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogSubCategoryPageProps } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import BlogPostPeview from './BlogPostPreview';

interface SubCategoryRelatedBlogPostsProps extends BlogSubCategoryPageProps {}

// {ToDo} i18n this!
function subCategoryRelatedBlogPostsGeneration(posts: PostBase[]) {
  if (posts.length === 0) return <p>Rien à afficher ici !</p>;
  return posts.map((post, index) => <BlogPostPeview key={index} {...{ post }} />);
}

// {ToDo} i18n this!
export const SubCategoryRelatedBlogPosts: FunctionComponent<SubCategoryRelatedBlogPostsProps> = ({ params, ...params2 }) => {
  const categ = params2[BlogTaxonomy.category];
  const subCateg = params[BlogTaxonomy.subCategory];

  let postsCollection: PostBase[] = [];
  try {
    postsCollection = getAllPostsByCategoryAndSubCategory(categ, subCateg);
  } catch {
    notFound();
  }

  const relatedPosts = postsCollection.filter((post) => getBlogPostSubCategoryBasedOnPostObj(post) === subCateg);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">{subCateg}</h1>
      {subCategoryRelatedBlogPostsGeneration(relatedPosts)}
    </div>
  );
};

export default SubCategoryRelatedBlogPosts;
