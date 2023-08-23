import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import PostCard from '../_components/PostCard';

// {ToDo} i18n this!
// {ToDo} Filter by category, limit to 5, and generate 'Show more' buttons!
export function Page() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Patch notes</h1>
      {posts.map((post, index) => (
        <PostCard key={index} {...{ post }} />
      ))}
    </div>
  );
}

export default Page;
