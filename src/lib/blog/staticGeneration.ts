import type {
  BlogCategoriesAndSubcategoriesAssoc,
  BlogSubcategoryFromUnknownCategory,
  BlogSubcategoryPageProps,
  BlogCategoryPageProps,
  BlogPostPageProps,
  BlogStaticParams,
  UnknownBlogSlug,
  BlogPostType,
  BlogCategory
} from '@/types/Blog';
import type { MaybeObjectValue, MaybeUndefined, MaybeNull, Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import type { I18nMiddlewareConfig, LanguageFlag } from '@rtm/shared-types/I18n';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import type { Href } from '@rtm/shared-types/Next';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import { DEFAULT_LANGUAGE, LANGUAGES, i18ns } from '##/config/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import BlogConfig from '@/config/Blog/server';

import { isValidBlogCategoryAndSubcategoryPair, getBlogPostUnstrict } from './api';
import blogSubcategoryGuard from './guards/blogSubcategoryGuard';
import doGetBlogStaticParams from './static/getBlogStaticParams';
import blogCategoryGuard from './guards/blogCategoryGuard';
import { getPathnameWithoutI18nFlag } from '../i18n';
import blogPostGuard from './guards/blogPostGuard';

/* v8 ignore start */
// Stryker disable all

export async function getBlogStaticParams(): Promise<BlogStaticParams[]> {
  const blogStaticParams = await doGetBlogStaticParams();
  return blogStaticParams;
}

export async function getBlogCategoryMetadatas({ params }: BlogCategoryPageProps) {
  const globalT = await getServerSideI18n();
  const category = params[BlogTaxonomy.CATEGORY];
  const { blogCategories, vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${blogCategories}.${category}._title`));
  const description = globalT(`${blogCategories}.${category}._meta-description`);

  const maybeOpenGraphImages = BlogConfig.OG.SUBCATEGORIES_PICTURES[
    category as keyof typeof BlogConfig.OG.SUBCATEGORIES_PICTURES
  ] as unknown as MaybeObjectValue<Href[]>;
  const openGraph: MaybeObjectValue<OpenGraph> = maybeOpenGraphImages ? { images: maybeOpenGraphImages } : undefined;

  return { description, openGraph, title };
}

export async function getBlogSubcategoryMetadatas({ params }: BlogSubcategoryPageProps) {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) return {};

  const globalT = await getServerSideI18n();
  const { blogCategories, vocab } = i18ns;
  const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${blogCategories}.${narrowedCategoryAndSubcategoryAssoc}.title`));
  const description = globalT(`${blogCategories}.${narrowedCategoryAndSubcategoryAssoc}.meta-description`);

  const maybeCategoryAndSubcategoriesOGPicturesAssoc = BlogConfig.OG.SUBCATEGORIES_PICTURES[
    category as keyof typeof BlogConfig.OG.SUBCATEGORIES_PICTURES
  ] as unknown;

  const maybeOpenGraphImages =
    typeof maybeCategoryAndSubcategoriesOGPicturesAssoc === 'object'
      ? ((maybeCategoryAndSubcategoriesOGPicturesAssoc as object)[
          subcategory as keyof typeof maybeCategoryAndSubcategoriesOGPicturesAssoc
        ] as MaybeObjectValue<Href[]>)
      : undefined;

  const openGraph: MaybeObjectValue<OpenGraph> = maybeOpenGraphImages ? { images: maybeOpenGraphImages } : undefined;

  return { description, openGraph, title };
}

async function getXDefaultAndCanonical(
  currentPost: BlogPostType,
  category: BlogCategory,
  subcategory: BlogSubcategoryFromUnknownCategory,
  slug: UnknownBlogSlug,
  language: LanguageFlag,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy']
): Promise<Couple<MaybeUndefined<Href>, Href>> {
  const maybeDefaultLanguageBlogPost = await getBlogPostUnstrict(category, subcategory, slug, DEFAULT_LANGUAGE);

  const defaultUrl = middlewareStrategy !== 'redirect' ? getPathnameWithoutI18nFlag(currentPost.url) : currentPost.url;

  const xDefault = language !== DEFAULT_LANGUAGE && maybeDefaultLanguageBlogPost !== null ? defaultUrl : undefined;

  const canonical = language === DEFAULT_LANGUAGE ? defaultUrl : currentPost.url;
  return [xDefault, canonical];
}

export async function getBlogPostMetadatas(
  { params }: BlogPostPageProps,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy'],
  metadataBase: MaybeObjectValue<URL> = process.env.METADABASE_URL ? new URL(process.env.METADABASE_URL) : undefined
): Promise<Metadata> {
  const [category, subcategory, slug, language] = [
    params[BlogTaxonomy.CATEGORY],
    params[BlogTaxonomy.SUBCATEGORY],
    params[BlogTaxonomy.SLUG],
    params[I18nTaxonomy.LANGUAGE]
  ];

  const globalT = await getServerSideI18n();

  const post: MaybeNull<BlogPostType> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (post === null || !isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) return {};

  const currentPost = post as BlogPostType;
  const { date: publishedTime, tags, url } = currentPost;
  const type = 'article';

  const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), currentPost.title);
  const { metadescription: description, seo } = currentPost;

  const maybeAlternateLanguages = LANGUAGES.filter((lang) => lang !== language);
  const languages = {} as Record<LanguageFlag | 'x-default', Href>;
  const featuredPictureUrl = currentPost.featuredPictureUrl;

  for (const maybeAlternateLanguage of maybeAlternateLanguages) {
    const maybePost = await getBlogPostUnstrict(category, subcategory, slug, maybeAlternateLanguage);
    if (maybePost === null) continue;
    languages[maybeAlternateLanguage] = maybePost.url;
  }

  const [xDefault, canonical] = await getXDefaultAndCanonical(currentPost, category, subcategory, slug, language, middlewareStrategy);
  if (xDefault !== undefined) languages['x-default'] = xDefault;

  const openGraphImages = featuredPictureUrl ? { url: featuredPictureUrl } : undefined;

  if (seo === undefined) {
    const alternates = { canonical, languages };
    const openGraph: OpenGraph = { publishedTime, tags, type, url };
    if (openGraphImages === undefined) return { metadataBase, description, alternates, openGraph, title };
    openGraph.images = openGraphImages;
    return { metadataBase, description, alternates, openGraph, title };
  }

  const { alternates, robots } = seo;
  let openGraph: OpenGraph = { publishedTime, type, tags, ...seo.openGraph };

  if (openGraphImages) {
    if (openGraph === undefined) openGraph = { images: [openGraphImages] };
    else if (openGraph.images === undefined) openGraph.images = [openGraphImages];
  }

  if (openGraph === undefined) openGraph = {};
  (openGraph as OpenGraph).url = url;
  if (alternates) (alternates as AlternateURLs).languages = languages;
  if (alternates && !alternates.canonical) (alternates as AlternateURLs).canonical = canonical;

  return { metadataBase, description, alternates, openGraph, robots, title };
}

export { blogSubcategoryGuard, blogCategoryGuard, blogPostGuard };

// Stryker restore all
/* v8 ignore stop */
