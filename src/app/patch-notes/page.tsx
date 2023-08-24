import { allPatchPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import BlogPostPeview from '../_components/blog/BlogPostPreview';
import { getBlogPostSubCategoryAndSlugStr } from '../_lib/blog';
import BlogTaxonomy from '../_taxonomies/blog';

const relatedPosts = allPatchPosts;

export const generateStaticParams = async () => relatedPosts.map((post) => ({ [BlogTaxonomy.slug]: getBlogPostSubCategoryAndSlugStr(post) }));

// {ToDo} i18n this!
// {ToDo} Filter by subCategory, limit to 5, and generate 'Show more' buttons!
export function Page() {
  const posts = relatedPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

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
