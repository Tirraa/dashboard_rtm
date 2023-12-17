import type {
  BlogSubcategoryFromUnknownCategory,
  BlogSubcategoryPageProps,
  BlogCategoryPageProps,
  BlogPostPageProps,
  BlogStaticParams,
  UnknownBlogSlug,
  BlogCategory,
  PostBase
} from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';

import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { buildPageTitle } from '@rtm/shared-lib/str';
import { LANGUAGES, i18ns } from '##/config/i18n';
import { getServerSideI18n } from '@/i18n/server';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict,
  isValidBlogCategoryAndSubcategoryPair,
  getAllBlogCategories,
  getBlogPostUnstrict
} from './api';
import blogSubcategoryGuard from './guards/blogSubcategoryGuard';
import blogPostGuard from './guards/blogPostGuard';

export async function getBlogStaticParams(): Promise<BlogStaticParams[]> {
  const blogStaticParams: BlogStaticParams[] = [];
  const blogCategories = getAllBlogCategories();

  for (const language of LANGUAGES) {
    for (const categ of blogCategories) {
      const category = categ as BlogCategory;
      const curSubcategs: BlogSubcategoryFromUnknownCategory[] = await getBlogSubcategoriesByCategory(category, language);

      for (const subcateg of curSubcategs) {
        const subcategory = subcateg as BlogSubcategoryFromUnknownCategory;

        const relatedPosts: PostBase[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(category, subcategory, language);

        for (const post of relatedPosts) {
          const slug = post.slug as UnknownBlogSlug;

          const entity: BlogStaticParams = {
            [BlogTaxonomy.SUBCATEGORY]: subcategory,
            [I18nTaxonomy.LANGUAGE]: language,
            [BlogTaxonomy.CATEGORY]: category,
            [BlogTaxonomy.SLUG]: slug
          };
          blogStaticParams.push(entity);
        }
      }
    }
  }

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
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const language = params[I18nTaxonomy.LANGUAGE];

  if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) return {};

  const globalT = await getServerSideI18n();
  const { blogCategories, vocab } = i18ns;
  // @ts-expect-error - [i18n] this will NEVER be typesafe, so protect it by design
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${blogCategories}.${category}.${subcategory}.title`));
  // @ts-expect-error - [i18n] this will NEVER be typesafe, so protect it by design
  const description = globalT(`${blogCategories}.${category}.${subcategory}.meta-description`);
  return { description, title };
}

export async function getBlogPostMetadatas({ params }: BlogPostPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];

  const slug = params[BlogTaxonomy.SLUG];
  const language = params[I18nTaxonomy.LANGUAGE];
  const post: MaybeNull<PostBase> = await getBlogPostUnstrict(category, subcategory, slug, language);

  const globalT = await getServerSideI18n();
  const currentPost = post as PostBase;

  if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) return {};

  const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), currentPost.title);
  const { metadescription: description } = post as PostBase;
  return { description, title };
}

export { blogSubcategoryGuard, blogPostGuard };
