import { getAllPostsByCateg, getBlogPostCategoryBasedOnPostObj } from '@/app/_lib/blog';
import BlogTaxonomy from '@/app/_taxonomies/blog';
import { BlogLayoutProps } from '@/app/_types/Blog';
import PostBase from '@/app/_types/BlogPostAbstractions';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import BlogPostPeview from '../BlogPostPreview';

interface FolderRelatedBlogPostsProps extends BlogLayoutProps {}

// {ToDo} i18n this!
function folderRelatedBlogPostsGeneration(posts: PostBase[]) {
  if (posts.length === 0) return <p>Rien à afficher ici !</p>;
  return posts.map((post, index) => <BlogPostPeview key={index} {...{ post }} />);
}

// {ToDo} i18n this!
export const FolderRelatedBlogPosts: FunctionComponent<FolderRelatedBlogPostsProps> = ({ params }) => {
  const categ = params[BlogTaxonomy.category];
  const postsCollection = getAllPostsByCateg(categ);

  if (postsCollection.every((post) => getBlogPostCategoryBasedOnPostObj(post) !== categ)) notFound();

  const relatedPosts = postsCollection.filter((post) => getBlogPostCategoryBasedOnPostObj(post) === categ);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">{categ}</h1>
      {folderRelatedBlogPostsGeneration(relatedPosts)}
    </div>
  );
};

export default FolderRelatedBlogPosts;
