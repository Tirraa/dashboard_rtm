import { getBlogSubCategoriesByCategory } from '@/app/proxies/blog';
import BlogPostPeview from '@/components/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/blog/BlogPostsNotFound';
import RtmButton from '@/components/misc/RtmButton';
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
    return blogStaticParams as Partial<BlogStaticParams>[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = blogStaticParamsEntities.map((entity) => ({ ...entity }));

  return staticParams;
}

async function postsGenerator(posts: PostBase[], category: BlogCategory, lng: LanguageFlag) {
  function buildHistogram() {
    for (const post of posts) {
      const curSubCateg = getBlogPostSubCategory(post) as BlogSubCategoryFromUnknownCategory;
      if (histogram[curSubCateg].length < limit + 1 && getBlogPostLanguageFlag(post) === lng) {
        histogram[curSubCateg].push(post);
        if (Object.values(histogram).every((posts2) => posts2.length >= limit + 1)) break;
      }
    }
  }

  function buildPostsCollectionsSnippets() {
    for (const [subCategory, posts2] of Object.entries(histogram)) {
      postsCollectionsSnippets[subCategory as BlogSubCategoryFromUnknownCategory] = posts2.map((post, index) => (
        <BlogPostPeview key={index} {...{ post, lng }} />
      ));
    }
  }

  const isEmptySnippets = () => Object.values(postsCollectionsSnippets).every((posts2) => posts2.length === 0);

  function generateContent(): ReactNode[] {
    const result: ReactNode[] = [];
    for (const [subCategory, posts] of Object.entries(postsCollectionsSnippets)) {
      if (posts.length === 0) continue;
      // https://github.com/QuiiBz/next-international/issues/154
      // {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/11
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
            label={globalT(`vocab.see-more`)}
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
  const limit = BlogConfig.DISPLAYED_BLOG_POST_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT;

  buildHistogram();
  buildPostsCollectionsSnippets();
  if (isEmptySnippets()) return <BlogPostsNotFound {...{ lng }} />;

  const result: ReactNode[] = generateContent();
  return result;
}

export default async function Page({ params }: BlogCategoryPageProps) {
  const category: BlogCategory = params[BlogTaxonomy.CATEGORY];
  const scopedT = await getScopedI18n(i18ns.blogCategories);
  const lng = params[i18nTaxonomy.LANG_FLAG];
  let gettedOnTheFlyPosts: PostBase[] = [];
  try {
    gettedOnTheFlyPosts = BlogConfig.BLOG_CATEGORIES_ALL_POSTS_TYPES_ASSOC[category]();
  } catch {
    notFound();
  }

  const posts = gettedOnTheFlyPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const generatedContent = await postsGenerator(posts, category, lng);
  const title = scopedT(`${category}._title`);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{title}</h1>
      {generatedContent}
    </div>
  );
}
