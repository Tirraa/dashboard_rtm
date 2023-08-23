import PostCard from '@/app/_components/PostCard';
import getBlogPostCategoryBasedOnCategPathname from '@/app/_lib/getBlogPostCategoryBasedOnCategPathname';
import { Post, allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import { useServerSidePathnameWorkaround } from '../../_lib/useServerSidePathname';

interface FolderRelatedBlogPostsProps {
  title: () => string;
}

// {ToDo} i18n this!
function relatedBlogPostsGeneration(posts: Post[]) {
  if (posts.length === 0) return <p>Rien à afficher ici !</p>;
  return posts.map((post, index) => <PostCard key={index} {...post} />);
}

// {ToDo} i18n this!
const FolderRelatedBlogPosts: FunctionComponent<FolderRelatedBlogPostsProps> = ({ title }) => {
  const pathname = useServerSidePathnameWorkaround();
  const categ = getBlogPostCategoryBasedOnCategPathname(pathname);
  if (allPosts.every((post) => post._raw.sourceFileDir !== categ)) notFound();
  const relatedPosts = allPosts.filter((post) => post._raw.sourceFileDir === categ);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">{title()}</h1>
      {relatedBlogPostsGeneration(relatedPosts)}
    </div>
  );
};

export default FolderRelatedBlogPosts;
