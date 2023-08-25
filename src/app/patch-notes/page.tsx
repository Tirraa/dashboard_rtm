import BlogPostPeview from '@/components/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/blog/BlogPostsNotFound';
import BlogConfig from '@/config/blog';
import { getBlogCategoryFromPathname, getBlogPostSlug, getBlogPostSubCategory } from '@/lib/blog';
import getServerSidePathnameWorkaround from '@/lib/misc/getServerSidePathname';
import { getLastPathStrPart } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { compareDesc } from 'date-fns';

export async function generateStaticParams() {
  const trickyPathname = __dirname;
  const onTheFlyBlogCategoryBuildtimeCtx: BlogCategory = getLastPathStrPart(trickyPathname) as BlogCategory;
  const postsGetter = BlogConfig.blogCategoriesAllPostsTypesAssoc[onTheFlyBlogCategoryBuildtimeCtx];
  const gettedOnTheFlyPosts = postsGetter();

  return gettedOnTheFlyPosts.map((post) => ({
    [BlogTaxonomy.subCategory]: getBlogPostSubCategory(post),
    [BlogTaxonomy.slug]: getBlogPostSlug(post)
  }));
}

// {ToDo} Filter by subCategory, limit to 5, and generate 'Show more' buttons! (⚠️ Using a HoC or making this generator function external, this autonomous code must be and stay agnostic!)
function postsGenerator(posts: PostBase[]) {
  if (posts.length === 0) return <BlogPostsNotFound />;
  return posts.map((post, index) => <BlogPostPeview key={index} {...{ post }} />);
}

// {ToDo} i18n this!
export default function Page() {
  const onTheFlyBlogCategoryRuntimeCtx: BlogCategory = getBlogCategoryFromPathname(getServerSidePathnameWorkaround()) as BlogCategory;
  const trickyRelatedPostsGetter = BlogConfig.blogCategoriesAllPostsTypesAssoc[onTheFlyBlogCategoryRuntimeCtx];
  const gettedOnTheFlyPosts = trickyRelatedPostsGetter();
  const posts = gettedOnTheFlyPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Patch notes</h1>
      {postsGenerator(posts)}
    </div>
  );
}
