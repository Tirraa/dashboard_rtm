import { LANGUAGES, i18ns } from '##/config/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import i18nTaxonomy from '##/config/taxonomies/i18n';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import { getServerSideI18n } from '@/i18n/server';
import type {
  BlogCategory,
  BlogCategoryPageProps,
  BlogPostPageProps,
  BlogStaticParams,
  BlogSubcategoryFromUnknownCategory,
  BlogSubcategoryPageProps,
  PostBase,
  UnknownBlogSlug
} from '@/types/Blog';
import { getAllBlogCategories, getAllBlogPostsByCategoryAndSubcategoryUnstrict, getBlogPostUnstrict, isValidBlogCategoryAndSubcategoryPair } from '.';
import { buildPageTitle } from '../str';
import blogPostGuard from './guards/blogPostGuard';
import blogSubcategoryGuard from './guards/blogSubcategoryGuard';

export function getBlogStaticParams(): BlogStaticParams[] {
  const indexedParams = new Set<string>();
  const blogStaticParams: BlogStaticParams[] = [];
  const blogCategories = getAllBlogCategories();

  blogCategories.forEach((categ) => {
    const category = categ as BlogCategory;
    const curSubcategs = getBlogSubcategoriesByCategory(category);

    curSubcategs.forEach((subcateg) => {
      const subcategory = subcateg as BlogSubcategoryFromUnknownCategory;
      const relatedPosts = getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

      relatedPosts.forEach((post) => {
        LANGUAGES.forEach((language) => {
          const slug = post.slug as UnknownBlogSlug;

          const blogPostExists = getBlogPostUnstrict({ category, subcategory }, slug, language);
          if (!blogPostExists) return;

          const staticParamsIndexKey = `${language}-${categ}-${subcategory}-${slug}`;
          if (indexedParams.has(staticParamsIndexKey)) return;

          indexedParams.add(staticParamsIndexKey);
          const entity: BlogStaticParams = {
            [i18nTaxonomy.LANG_FLAG]: language,
            [BlogTaxonomy.CATEGORY]: category,
            [BlogTaxonomy.SUBCATEGORY]: subcategory,
            [BlogTaxonomy.SLUG]: slug
          };
          blogStaticParams.push(entity);
        });
      });
    });
  });

  return blogStaticParams as BlogStaticParams[];
}

export async function getBlogCategoryMetadatas({ params }: BlogCategoryPageProps) {
  const globalT = await getServerSideI18n();
  const category = params[BlogTaxonomy.CATEGORY];
  const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}._title`));
  const description = globalT(`${i18ns.blogCategories}.${category}._meta-description`);

  return { title, description };
}

export async function getBlogSubcategoryMetadatas({ params }: BlogSubcategoryPageProps) {
  try {
    const category = params[BlogTaxonomy.CATEGORY];
    const subcategory = params[BlogTaxonomy.SUBCATEGORY];

    if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory)) throw new Error('Fallbacking on the catch block...');

    const globalT = await getServerSideI18n();
    // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER (AND THE GUARD)
    const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}.${subcategory}.title`));
    // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER (AND THE GUARD)
    const description = globalT(`${i18ns.blogCategories}.${category}.${subcategory}.meta-description`);
    return { title, description };
  } catch {
    return {};
  }
}

export async function getBlogPostMetadatas({ params }: BlogPostPageProps) {
  try {
    const category = params[BlogTaxonomy.CATEGORY];
    const subcategory = params[BlogTaxonomy.SUBCATEGORY];

    const slug = params[BlogTaxonomy.SLUG];
    const lang = params[i18nTaxonomy.LANG_FLAG];
    const post = getBlogPostUnstrict({ category, subcategory }, slug, lang);

    const globalT = await getServerSideI18n();
    const currentPost = post as PostBase;

    if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory)) throw new Error('Fallbacking on the catch block...');

    const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), currentPost.title);
    const { metadescription: description } = post as PostBase;
    return { title, description };
  } catch {
    return {};
  }
}

export { blogPostGuard, blogSubcategoryGuard };
