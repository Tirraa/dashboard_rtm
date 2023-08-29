import BlogPostsBasedOnReactNodeCollection from '@/components/_hoc/navbar/BlogPostsBasedOnReactNodeCollection';
import BlogPostPeview from '@/components/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/blog/BlogPostsNotFound';
import BlogConfig, { BlogCategory } from '@/config/blog';
import { LanguageFlag } from '@/config/i18n';
import { languages } from '@/i18n/settings';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategoryPageProps, BlogStaticParams, BlogStaticParamsValue } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { compareDesc } from 'date-fns';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const blogStaticParams: Partial<Record<keyof BlogStaticParams, BlogStaticParamsValue>>[] = [];
    const blogCategories = Object.keys(BlogConfig.blogCategoriesAllPostsTypesAssoc);

    blogCategories.forEach((category) => {
      const categ = category as BlogCategory;
      const entity = { [BlogTaxonomy.category]: categ };
      blogStaticParams.push(entity);
    });
    return blogStaticParams as Partial<BlogStaticParams>[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = languages.flatMap((lng) =>
    blogStaticParamsEntities.map((entity) => ({
      lng,
      ...entity
    }))
  );

  return staticParams;
}

// {ToDo} Filter by subCategory, limit to 5, and generate 'Show more' buttons! (⚠️ Using a HoC or making this generator function external, this autonomous code must be and stay agnostic!)
function postsGenerator(posts: PostBase[], lng: LanguageFlag) {
  if (posts.length === 0) return <BlogPostsNotFound {...{ lng }} />;
  const generatedPosts = posts.map((post, index) => {
    if (getBlogPostLanguageFlag(post) !== lng) return null;
    return <BlogPostPeview key={index} {...{ post }} />;
  });
  return BlogPostsBasedOnReactNodeCollection(generatedPosts, lng);
}

export default function Page({ params }: BlogCategoryPageProps) {
  const categ: BlogCategory = params[BlogTaxonomy.category];
  let gettedOnTheFlyPosts: PostBase[] = [];
  try {
    gettedOnTheFlyPosts = BlogConfig.blogCategoriesAllPostsTypesAssoc[categ]();
  } catch {
    notFound();
  }
  const posts = gettedOnTheFlyPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Patch notes</h1>
      {postsGenerator(posts, params[i18nTaxonomy.langFlag])}
    </div>
  );
}
