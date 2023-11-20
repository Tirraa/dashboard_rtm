import { i18ns } from '##/config/i18n';
import type { LanguageFlag } from '##/types/hell/i18n';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { Button } from '@/components/ui/Button';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import BlogConfig from '@/config/blog';
import { getServerSideI18n } from '@/i18n/server';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';
import slugify from 'slugify';
import { buildPathFromParts } from '../str';
import { cn } from '../tailwind';

export async function blogCategoryPageBuilder(
  posts: PostBase[],
  category: BlogCategory,
  language: LanguageFlag
): Promise<ReactNode[] | ReactElement> {
  function buildHistogram() {
    for (const post of posts) {
      const curSubcateg = post.subcategory as BlogSubcategoryFromUnknownCategory;
      if (histogram[curSubcateg] === undefined) continue;

      if (histogram[curSubcateg].length < limit + 1 && post.language === language) {
        histogram[curSubcateg].push(post);
        if (Object.values(histogram).every((posts2) => posts2.length >= limit + 1)) break;
      }
    }
  }

  function buildPostsCollectionsSnippets() {
    Object.entries(histogram).forEach(([subcategory, posts2]) => {
      postsCollectionsSnippets[subcategory as BlogSubcategoryFromUnknownCategory] = posts2.map((post) => (
        <BlogPostPreview key={`${post._raw.flattenedPath}-post-snippet`} post={post} language={language} isNotOnBlogSubcategoryPage />
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
          href={href}
          className="mb-4 flex h-fit w-fit border-b-[2px] border-transparent leading-none transition-all hover:border-b-[2px] hover:border-inherit hover:pr-2 hover:indent-1 focus:border-b-[2px] focus:border-inherit focus:pr-2 focus:indent-1"
        >
          <h2 className="mb-1 mt-2">{curSubcategTitle}</h2>
        </Link>
      );

      let showMoreLink = null;
      if (posts.length > limit) {
        showMoreLink = (
          <div className="flex w-full justify-center">
            <Button size="lg" className={cn(BUTTON_CONFIG.CLASSNAME, 'mb-6 mt-4 lg:mb-0')} asChild>
              <Link href={href}>{globalT(`${i18ns.vocab}.see-more`)}</Link>
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
      if (!isLast && !showMoreLink && max > 1) result.push(sep);
    }
    return result;
  }

  if (posts.length === 0) return <BlogPostsNotFound />;

  const globalT = await getServerSideI18n();
  const subcategs: BlogSubcategoryFromUnknownCategory[] = await getBlogSubcategoriesByCategory(category, language);
  const entries = subcategs.map((subcateg) => [subcateg, []]);

  const sortedEntries = entries.sort((entry1, entry2) =>
    BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE(
      // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
      globalT(`${i18ns.pagesTitles}.${entry1[0]}`),
      // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
      globalT(`${i18ns.pagesTitles}.${entry2[0]}`),
      language
    )
  );

  const [histogram, postsCollectionsSnippets] = [
    Object.fromEntries(entries) as Record<BlogSubcategoryFromUnknownCategory, PostBase[]>,
    Object.fromEntries(sortedEntries) as Record<BlogSubcategoryFromUnknownCategory, ReactNode[]>
  ];
  const limit = BlogConfig.DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT;

  buildHistogram();
  buildPostsCollectionsSnippets();
  if (isEmptySnippets()) return <BlogPostsNotFound />;

  const result: ReactNode[] = contentGenerator();
  return result;
}

export default blogCategoryPageBuilder;
