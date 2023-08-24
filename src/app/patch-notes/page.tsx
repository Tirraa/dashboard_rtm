import { compareDesc } from 'date-fns';
import BlogPostPeview from '../_components/blog/BlogPostPreview';
import BlogConfig from '../_config/blog';
import { getBlogPostSubCategoryAndSlugStr } from '../_lib/blog';
import useServerSidePathnameWorkaround from '../_lib/misc/useServerSidePathname';
import { getLastPathStrPart } from '../_lib/str';
import BlogTaxonomy from '../_taxonomies/blog';
import { BlogCategory } from '../_types/Blog';

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
