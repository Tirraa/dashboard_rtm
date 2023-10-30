import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BlogPost from '@/components/pages/blog/BlogPost';
import { LANGUAGES, i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getServerSideI18n } from '@/i18n/server';
import {
  getAllCategories,
  getAllPostsByCategoryAndSubcategoryUnstrict,
  getBlogPostSlug,
  getPostUnstrict,
  isValidCategory,
  isValidCategoryAndSubcategoryPair,
  redirectToBlogCategoryAndSubcategoryPairPageUnstrict,
  redirectToBlogCategoryPage
} from '@/lib/blog';
import { getPageTitle } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogPostPageProps, BlogStaticParams, BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: BlogPostPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];
  const subCategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination = isValidCategoryAndSubcategoryPair(category, subCategory);

  const slug = params[BlogTaxonomy.SLUG];
  const lang = params[i18nTaxonomy.LANG_FLAG];
  const post = validCombination ? getPostUnstrict({ category, subCategory }, slug, lang) : undefined;
  if (!post && validCombination) {
    redirectToBlogCategoryAndSubcategoryPairPageUnstrict(category, subCategory);
  } else if (!post && isValidCategory(category)) {
    redirectToBlogCategoryPage(category);
  } else if (!post) {
    redirect(ROUTES_ROOTS.WEBSITE + category);
  }

  const globalT = await getServerSideI18n();
  const currentPost = post as PostBase;
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), currentPost.title);
  const { metadescription: description } = post as PostBase;
  return { title, description };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): BlogStaticParams[] {
    const indexedParams = new Set<string>();
    const blogStaticParams: BlogStaticParams[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubcategs = getBlogSubcategoriesByCategory(category);

      curSubcategs.forEach((subCateg) => {
        const subCategory = subCateg as BlogSubcategoryFromUnknownCategory;
        const relatedPosts = getAllPostsByCategoryAndSubcategoryUnstrict({ category, subCategory });

        relatedPosts.forEach((post) => {
          LANGUAGES.forEach((language) => {
            const slug = getBlogPostSlug(post);

            const blogPostExists = getPostUnstrict({ category, subCategory }, slug, language);
            if (!blogPostExists) return;

            const staticParamsIndexKey = `${categ}-${subCategory}-${slug}-${language}`;
            if (indexedParams.has(staticParamsIndexKey)) return;

            indexedParams.add(staticParamsIndexKey);
            const entity: BlogStaticParams = {
              [i18nTaxonomy.LANG_FLAG]: language,
              [BlogTaxonomy.CATEGORY]: category,
              [BlogTaxonomy.SUBCATEGORY]: subCategory,
              [BlogTaxonomy.SLUG]: slug
            };
            blogStaticParams.push(entity);
          });
        });
      });
    });
    return blogStaticParams as BlogStaticParams[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = blogStaticParamsEntities.map((entity) => ({ ...entity }));

  return staticParams;
}

export default function Page({ params }: BlogPostPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return <BlogPost {...{ params }} />;
}
