import { allPatchPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import BlogPostPeview from '../_components/BlogPostPreview';

// {ToDo} i18n this!
// {ToDo} Filter by category, limit to 5, and generate 'Show more' buttons!

// {ToDo} dynamically associate categ's parent folder name with postsCollection
// So we will write: verySmartFunction().map((post) => ...)
export function Page() {
  const posts = allPatchPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Patch notes</h1>
      {posts.map((post, index) => (
        <BlogPostPeview key={index} {...{ post }} />
      ))}
    </div>
  );
}

export default Page;
