import { LANGUAGES, i18ns } from '##/config/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
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
import { buildPageTitle } from '@rtm/shared-lib/str';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import {
  getAllBlogCategories,
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict,
  getBlogPostUnstrict,
  isValidBlogCategoryAndSubcategoryPair
} from '.';
import blogPostGuard from './guards/blogPostGuard';
import blogSubcategoryGuard from './guards/blogSubcategoryGuard';

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
            [I18nTaxonomy.LANGUAGE]: language,
            [BlogTaxonomy.CATEGORY]: category,
            [BlogTaxonomy.SUBCATEGORY]: subcategory,
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
  const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}._title`));
  const description = globalT(`${i18ns.blogCategories}.${category}._meta-description`);

  return { title, description };
}

export async function getBlogSubcategoryMetadatas({ params }: BlogSubcategoryPageProps) {
  try {
    const category = params[BlogTaxonomy.CATEGORY];
    const subcategory = params[BlogTaxonomy.SUBCATEGORY];
    const language = params[I18nTaxonomy.LANGUAGE];

    if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) throw new Error('Fallbacking on the catch block...');

    const globalT = await getServerSideI18n();
    // @ts-ignore - checked via the static analyzer (and the guard)
    const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}.${subcategory}.title`));
    // @ts-ignore - checked via the static analyzer (and the guard)
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
    const language = params[I18nTaxonomy.LANGUAGE];
    const post: MaybeNull<PostBase> = await getBlogPostUnstrict(category, subcategory, slug, language);

    const globalT = await getServerSideI18n();
    const currentPost = post as PostBase;

    if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory, language)) throw new Error('Fallbacking on the catch block...');

    const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), currentPost.title);
    const { metadescription: description } = post as PostBase;
    return { title, description };
  } catch {
    return {};
  }
}

export { blogPostGuard, blogSubcategoryGuard };
