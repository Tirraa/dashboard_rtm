import { getBlogSubCategoriesByCategory } from '@/app/proxies/blog';
import BlogPostPeview from '@/components/blog/BlogPostPreview';
import BlogPostsNotFound from '@/components/blog/BlogPostsNotFound';
import RtmButton from '@/components/misc/RtmButton';
import BlogConfig, { BlogCategory } from '@/config/blog';
import { LanguageFlag, i18ns } from '@/config/i18n';
import { getServerSideTranslation } from '@/i18n';
import { keySeparator, languages } from '@/i18n/settings';
import { getBlogPostSubCategory } from '@/lib/blog';
import { getBlogPostLanguageFlag } from '@/lib/i18n';
import { buildPathFromParts } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategoryPageProps, BlogStaticParams, BlogStaticParamsKey, BlogStaticParamsValue, BlogSubCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const blogStaticParams: Partial<Record<BlogStaticParamsKey, BlogStaticParamsValue>>[] = [];
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
    for (const [subCategory, posts2] of Object.entries(histogram)) {
      postsCollectionsSnippets[subCategory] = posts2.map((post, index) => <BlogPostPeview key={index} {...{ post, lng }} />);
    }
  }

  const isEmptySnippets = () => Object.values(postsCollectionsSnippets).every((posts2) => posts2.length === 0);

  function generateContent(): ReactNode[] {
    const result: ReactNode[] = [];
    for (const [subCategory, posts] of Object.entries(postsCollectionsSnippets)) {
      if (posts.length === 0) continue;
      const curSubCategTitle = t(category + keySeparator + subCategory);
      const href = buildPathFromParts(category, subCategory);
      const title = (
        <h2 key={`${subCategory}-${curSubCategTitle}-h2`}>
          <Link {...{ href }}>{curSubCategTitle}</Link>
        </h2>
      );

      let showMoreLink = null;
      if (posts.length > limit) {
        showMoreLink = <RtmButton label={t2('see-more')} {...{ href, ripple: false }} />;
        posts.pop();
      }

      result.push(title);
      result.push(posts);
      result.push(showMoreLink);
    }
    return result;
  }

  if (posts.length === 0) return <BlogPostsNotFound {...{ lng }} />;
  const { t } = await getServerSideTranslation(lng, i18ns.blogCategories);
  const { t: t2 } = await getServerSideTranslation(lng);
  const subCategs: BlogSubCategory[] = getBlogSubCategoriesByCategory(category);
  const entries = subCategs.map((subCateg) => [subCateg, []]);
  const [histogram, postsCollectionsSnippets] = [
    Object.fromEntries(entries) as Record<BlogSubCategory, PostBase[]>,
    Object.fromEntries(entries) as Record<BlogSubCategory, ReactNode[]>
  ];
  const limit = BlogConfig.displayedBlogPostsPerSubCategoryOnBlogCategoryPageLimit;

  buildHistogram();
  buildPostsCollectionsSnippets();
  if (isEmptySnippets()) return <BlogPostsNotFound {...{ lng }} />;

  const result: ReactNode[] = generateContent();
  return result;
}

export default async function Page({ params }: BlogCategoryPageProps) {
  const categ: BlogCategory = params[BlogTaxonomy.category];
  const lng = params[i18nTaxonomy.langFlag];
  const { t } = await getServerSideTranslation(lng, i18ns.blogCategories);
  let gettedOnTheFlyPosts: PostBase[] = [];
  try {
    gettedOnTheFlyPosts = BlogConfig.blogCategoriesAllPostsTypesAssoc[categ]();
  } catch {
    notFound();
  }

  const posts = gettedOnTheFlyPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const generatedContent = await postsGenerator(posts, categ, params[i18nTaxonomy.langFlag]);

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center">{t(categ + keySeparator + '_title')}</h1>
      {generatedContent}
    </div>
  );
}
