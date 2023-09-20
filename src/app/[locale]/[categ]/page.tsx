import { getBlogSubCategoriesByCategory } from '@/cache/blog';
import BlogPostPeview from '@/components/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/blog/BlogPostsNotFound';
import RtmButton from '@/components/cta/RtmButton';
import BlogConfig from '@/config/blog';
import { i18ns } from '@/config/i18n';
import { getScopedI18n, getServerSideI18n } from '@/i18n/server';
import { LANGUAGES } from '@/i18n/settings';
import { getAllCategories, getBlogPostSubCategory } from '@/lib/blog';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import { buildPathFromParts } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogCategoryPageProps, BlogStaticParams, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { LanguageFlag } from '@/types/i18n';
import { compareDesc } from 'date-fns';
import { setStaticParamsLocale } from 'next-international/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      LANGUAGES.forEach((language) => {
        const entity = { [BlogTaxonomy.CATEGORY]: category, [i18nTaxonomy.LANG_FLAG]: language };
        blogStaticParams.push(entity);
      });
    });
    return blogStaticParams;
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = blogStaticParamsEntities.map((entity) => ({ ...entity }));

  return staticParams;
}

async function postsGenerator(posts: PostBase[], category: BlogCategory, lng: LanguageFlag) {
  function buildHistogram() {
    for (const post of posts) {
      const curSubCateg = getBlogPostSubCategory(post);
      if (histogram[curSubCateg].length < limit + 1 && getBlogPostLanguageFlag(post) === lng) {
        histogram[curSubCateg].push(post);
        if (Object.values(histogram).every((posts2) => posts2.length >= limit + 1)) break;
      }
    }
  }

  function buildPostsCollectionsSnippets() {
    Object.entries(histogram).forEach(([subCategory, posts2]) => {
      postsCollectionsSnippets[subCategory as BlogSubCategoryFromUnknownCategory] = posts2.map((post) => (
        <BlogPostPeview key={post._raw.flattenedPath} {...{ post, lng }} />
      ));
    });
  }

  const isEmptySnippets = () => Object.values(postsCollectionsSnippets).every((posts2) => posts2.length === 0);

  function generateContent(): ReactNode[] {
    const result: ReactNode[] = [];
    for (const [subCategory, posts] of Object.entries(postsCollectionsSnippets)) {
      if (posts.length === 0) continue;
      // [VERIFIED BY OUR INTERNAL STATIC ANALYZER]
      // @ts-ignore
      const curSubCategTitle = scopedT(`${category}.${subCategory}`);
      const href = buildPathFromParts(category, subCategory);
      const title = (
        <h2 key={`${subCategory}-${curSubCategTitle}-h2`}>
          <Link {...{ href }}>{curSubCategTitle}</Link>
        </h2>
      );

      let showMoreLink = null;
      if (posts.length > limit) {
        showMoreLink = (
          <RtmButton
            key={`${subCategory}-${curSubCategTitle}-show-more-btn`}
            label={globalT('vocab.see-more')}
            {...{ href, ripple: false, size: 'sm', textCls: 'text-sm', className: 'mb-5 normal-case flex items-center gap-2' }}
          />
        );
        posts.pop();
      }

      result.push(title);
      result.push(posts);
      result.push(showMoreLink);
    }
    return result;
  }

  if (posts.length === 0) return <BlogPostsNotFound {...{ lng }} />;

  const globalT = await getServerSideI18n();
  const scopedT = await getScopedI18n(i18ns.blogCategories);
  const subCategs: BlogSubCategoryFromUnknownCategory[] = getBlogSubCategoriesByCategory(category);
  const entries = subCategs.map((subCateg) => [subCateg, []]);
  const [histogram, postsCollectionsSnippets] = [
    Object.fromEntries(entries) as Record<BlogSubCategoryFromUnknownCategory, PostBase[]>,
    Object.fromEntries(entries) as Record<BlogSubCategoryFromUnknownCategory, ReactNode[]>
  ];
  const limit = BlogConfig.DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT;

  buildHistogram();
  buildPostsCollectionsSnippets();
  if (isEmptySnippets()) return <BlogPostsNotFound {...{ lng }} />;

  const result: ReactNode[] = generateContent();
  return result;
}

export default async function Page({ params }: BlogCategoryPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);
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
  const title = scopedT(`${category}._title`);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{title}</h1>
      {generatedContent}
    </div>
  );
}
