import BlogPostPeview from '@/components/blog/BlogPostPreview';
import BlogConfig from '@/config/blog';
import { getBlogPostSubCategoryAndSlugStr } from '@/lib/blog';
import useServerSidePathnameWorkaround from '@/lib/misc/useServerSidePathname';
import { getLastPathStrPart } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogCategory } from '@/types/Blog';
import { compareDesc } from 'date-fns';

function lol(s: string) {
  return s.substring(1);
}

// * {ToDo} As it may crash in prod, stress-test it when the times come!
export async function generateStaticParams() {
  const onTheFlyBlogCategoryBuildtimeCtx: BlogCategory = getLastPathStrPart(__dirname) as BlogCategory;
  const unsafeRelatedPostsGetter = BlogConfig.blogCategoriesAllPostsTypesAssoc[onTheFlyBlogCategoryBuildtimeCtx];
  const gettedOnTheFlyPosts = unsafeRelatedPostsGetter();

  return gettedOnTheFlyPosts.map((post) => ({ [BlogTaxonomy.slug]: getBlogPostSubCategoryAndSlugStr(post) }));
}

// {ToDo} i18n this!
// {ToDo} Filter by subCategory, limit to 5, and generate 'Show more' buttons!
export function Page() {
  const onTheFlyBlogCategoryRuntimeCtx: BlogCategory = lol(useServerSidePathnameWorkaround()) as BlogCategory;
  const trickyRelatedPostsGetter = BlogConfig.blogCategoriesAllPostsTypesAssoc[onTheFlyBlogCategoryRuntimeCtx];
  const gettedOnTheFlyPosts = trickyRelatedPostsGetter();
  const posts = gettedOnTheFlyPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

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
