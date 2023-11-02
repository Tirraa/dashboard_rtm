import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import { Button } from '@/components/ui/Button';
import BlogConfig from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getScopedI18n, getServerSideI18n } from '@/i18n/server';
import { getBlogPostLanguageFlag, getBlogPostSubcategory } from '@/lib/blog';
import { buildPathFromParts } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { BlogCategory, BlogCategoryPageProps, BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import type { LanguageFlag } from '@/types/i18n';
import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { FunctionComponent, ReactNode } from 'react';
import slugify from 'slugify';

interface CategoryRelatedSubcategoriesAndBlogPostsProps extends BlogCategoryPageProps {}

async function postsGenerator(posts: PostBase[], category: BlogCategory, lng: LanguageFlag): Promise<ReactNode[] | JSX.Element> {
  function buildHistogram() {
    for (const post of posts) {
      const curSubcateg = getBlogPostSubcategory(post);
      if (histogram[curSubcateg].length < limit + 1 && getBlogPostLanguageFlag(post) === lng) {
        histogram[curSubcateg].push(post);
        if (Object.values(histogram).every((posts2) => posts2.length >= limit + 1)) break;
      }
    }
  }

  function buildPostsCollectionsSnippets() {
    Object.entries(histogram).forEach(([subcategory, posts2]) => {
      postsCollectionsSnippets[subcategory as BlogSubcategoryFromUnknownCategory] = posts2.map((post) => (
        <BlogPostPreview key={`${post._raw.flattenedPath}-post-snippet`} {...{ post, lng }} isNotOnBlogSubcategoryPage />
      ));
    });
  }

  const isEmptySnippets = () => Object.values(postsCollectionsSnippets).every((posts2) => posts2.length === 0);

  function contentGenerator(): ReactNode[] {
    const result: ReactNode[] = [];
    let isLast = false;
    const max = Object.entries(postsCollectionsSnippets).length;
    let counter = 0;
    for (const [subcategory, posts] of Object.entries(postsCollectionsSnippets)) {
      counter += 1;
      isLast = counter >= max;
      if (posts.length === 0) continue;
      // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
      const curSubcategTitle = globalT(`${i18ns.blogCategories}.${category}.${subcategory}.title`);
      const href = buildPathFromParts(category, subcategory);
      const title = (
        <Link
          {...{ href }}
          className="mb-4 flex h-fit w-fit border-b-[2px] border-transparent leading-none transition-all hover:border-b-[2px] hover:border-inherit hover:pr-2 hover:indent-1"
        >
          <h2 className="mb-1 mt-2">{curSubcategTitle}</h2>
        </Link>
      );

      let showMoreLink = null;
      if (posts.length > limit) {
        showMoreLink = (
          <div className="flex w-full justify-center">
            <Button size="lg" className={cn(BUTTON_CONFIG.CLASSNAME, 'mt-4')} asChild>
              <Link {...{ href }}>{globalT(`${i18ns.vocab}.see-more`)}</Link>
            </Button>
          </div>
        );
        posts.pop();
      }

      const sep = <hr key={`${subcategory}-${curSubcategTitle}-sep`} className="color-inherit m-auto my-5 w-36 opacity-50" />;

      const section = (
        <section
          key={`${subcategory}-${curSubcategTitle}-section`}
          id={slugify(curSubcategTitle.toLowerCase())}
          className="[&>article:not(:last-of-type)]:mb-6"
        >
          {title}
          {posts}
          {showMoreLink}
        </section>
      );

      result.push(section);
      if (!isLast && !showMoreLink) result.push(sep);
    }
    return result;
  }

  if (posts.length === 0) return <BlogPostsNotFound {...{ lng }} />;

  const globalT = await getServerSideI18n();
  const subcategs: BlogSubcategoryFromUnknownCategory[] = getBlogSubcategoriesByCategory(category);
  const entries = subcategs.map((subcateg) => [subcateg, []]);
  const [histogram, postsCollectionsSnippets] = [
    Object.fromEntries(entries) as Record<BlogSubcategoryFromUnknownCategory, PostBase[]>,
    Object.fromEntries(entries) as Record<BlogSubcategoryFromUnknownCategory, ReactNode[]>
  ];
  const limit = BlogConfig.DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT;

  buildHistogram();
  buildPostsCollectionsSnippets();
  if (isEmptySnippets()) return <BlogPostsNotFound {...{ lng }} />;

  const result: ReactNode[] = contentGenerator();
  return result;
}

export const CategoryRelatedSubcategoriesAndBlogPosts: FunctionComponent<CategoryRelatedSubcategoriesAndBlogPostsProps> = async ({ params }) => {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  const category: BlogCategory = params[BlogTaxonomy.CATEGORY];
  const scopedT = await getScopedI18n(i18ns.blogCategories);

  let gettedOnTheFlyPosts: PostBase[] = [];
  try {
    gettedOnTheFlyPosts = BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[category]();
  } catch {
    notFound();
  }

  const posts = gettedOnTheFlyPosts.sort((post1, post2) => compareDesc(new Date(post1.date), new Date(post2.date)));
  const generatedContent = await postsGenerator(posts, category, lng);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{scopedT(`${category}._title`)}</h1>
      {generatedContent}
    </div>
  );
};

export default CategoryRelatedSubcategoriesAndBlogPosts;
