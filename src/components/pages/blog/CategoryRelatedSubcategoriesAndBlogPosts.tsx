import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import BlogPostPreview from '@/components/shared/ui/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/shared/ui/blog/BlogPostsNotFound';
import BlogConfig from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getScopedI18n, getServerSideI18n } from '@/i18n/server';
import { getBlogPostLanguageFlag, getBlogPostSubcategory } from '@/lib/blog';
import { buildPathFromParts } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogCategoryPageProps, BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import { LanguageFlag } from '@/types/i18n';
import { Button } from '@nextui-org/button';
import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FunctionComponent, ReactNode } from 'react';
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
    Object.entries(histogram).forEach(([subCategory, posts2]) => {
      postsCollectionsSnippets[subCategory as BlogSubcategoryFromUnknownCategory] = posts2.map((post) => (
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
    for (const [subCategory, posts] of Object.entries(postsCollectionsSnippets)) {
      counter += 1;
      isLast = counter === max;
      if (posts.length === 0) continue;
      // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
      const curSubcategTitle = globalT(`${i18ns.blogCategories}.${category}.${subCategory}.title`);
      const href = buildPathFromParts(category, subCategory);
      const title = (
        <Link
          {...{ href }}
          className="transition-all flex w-fit h-fit leading-none	decoration-primary-500 border-transparent	border-b-[2px] hover:border-b-[2px] hover:border-inherit hover:indent-1 hover:pr-2 mb-4"
        >
          <h2 className="mt-2 mb-1">{curSubcategTitle}</h2>
        </Link>
      );

      let showMoreLink = null;
      if (posts.length > limit) {
        showMoreLink = (
          <div className="flex w-full justify-center">
            <Button as={Link} size="md" className={cn(BUTTON_CONFIG.CLASSNAME, 'mt-4')} {...{ href }} disableRipple>
              {globalT(`${i18ns.vocab}.see-more`)}
            </Button>
          </div>
        );
        posts.pop();
      }

      const sep = <hr key={`${subCategory}-${curSubcategTitle}-sep`} className="my-5 m-auto w-36 opacity-50 color-inherit" />;

      const section = (
        <section
          key={`${subCategory}-${curSubcategTitle}-section`}
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
  const subCategs: BlogSubcategoryFromUnknownCategory[] = getBlogSubcategoriesByCategory(category);
  const entries = subCategs.map((subCateg) => [subCateg, []]);
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
