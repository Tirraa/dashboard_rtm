import PostCard from '@/app/_components/PostCard';
import { allPosts } from 'contentlayer/generated';
import { FunctionComponent } from 'react';
import getCurrentBlogDir from '../../_lib/getCurrentBlogDir';

interface FolderRelatedBlogPostsProps {
  title: () => string;
}

// {ToDo} i18n this!
const FolderRelatedBlogPosts: FunctionComponent<FolderRelatedBlogPostsProps> = ({ title }) => {
  const curCateg = getCurrentBlogDir();
  console.log(curCateg); // {ToDo} Debug this hella
  const posts = allPosts.filter((post) => post._raw.sourceFileDir === curCateg);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">{title()}</h1>
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
};

export default FolderRelatedBlogPosts;
