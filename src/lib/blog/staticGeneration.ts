/* v8 ignore start */
// Stryker disable all

import type {
  BlogCategoriesAndSubcategoriesAssoc,
  BlogSubcategoryPageProps,
  BlogCategoryPageProps,
  BlogPostPageProps,
  BlogStaticParams,
  BlogPostType
} from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';

import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { buildPageTitle } from '@rtm/shared-lib/str';
import { getServerSideI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';

import { isValidBlogCategoryAndSubcategoryPair, getBlogPostUnstrict } from './api';
import blogSubcategoryGuard from './guards/blogSubcategoryGuard';
import doGetBlogStaticParams from './static/getBlogStaticParams';
import blogCategoryGuard from './guards/blogCategoryGuard';
import blogPostGuard from './guards/blogPostGuard';

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

  return { description, title };
}

export async function getBlogSubcategoryMetadatas({ params }: BlogSubcategoryPageProps) {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) return {};

  const globalT = await getServerSideI18n();
  const { blogCategories, vocab } = i18ns;
  const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${blogCategories}.${narrowedCategoryAndSubcategoryAssoc}.title`));
  const description = globalT(`${blogCategories}.${narrowedCategoryAndSubcategoryAssoc}.meta-description`);
  return { description, title };
}

export async function getBlogPostMetadatas({ params }: BlogPostPageProps) {
  const [category, subcategory, slug, language] = [
    params[BlogTaxonomy.CATEGORY],
    params[BlogTaxonomy.SUBCATEGORY],
    params[BlogTaxonomy.SLUG],
    params[I18nTaxonomy.LANGUAGE]
  ];

  const post: MaybeNull<BlogPostType> = await getBlogPostUnstrict(category, subcategory, slug, language);

  const globalT = await getServerSideI18n();
  const currentPost = post as BlogPostType;

  if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) return {};

  const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), currentPost.title);
  const { metadescription: description } = post as BlogPostType;
  return { description, title };
}

export { blogSubcategoryGuard, blogCategoryGuard, blogPostGuard };

// Stryker restore all
/* v8 ignore stop */
