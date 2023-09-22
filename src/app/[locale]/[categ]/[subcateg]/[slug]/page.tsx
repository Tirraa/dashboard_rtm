import { getBlogSubCategoriesByCategory } from '@/cache/blog';
import BlogPost from '@/components/blog/BlogPost';
import { LANGUAGES } from '@/config/i18n';
import RoutesBase from '@/config/routes';
import {
  getAllCategories,
  getAllPostsByCategoryAndSubCategoryUnstrict,
  getBlogPostSlug,
  getPostUnstrict,
  isValidCategory,
  isValidCategoryAndSubCategoryPair,
  redirectToBlogCategoryAndSubCategoryPairPageUnstrict,
  redirectToBlogCategoryPage
} from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogPostPageProps, BlogStaticParams, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { setStaticParamsLocale } from 'next-international/server';
import { notFound, redirect } from 'next/navigation';

export function generateMetadata({ params }: BlogPostPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];
  const subCategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination = isValidCategoryAndSubCategoryPair(category, subCategory);

  const slug = params[BlogTaxonomy.SLUG];
  const lang = params[i18nTaxonomy.LANG_FLAG];
  const post = validCombination ? getPostUnstrict({ category, subCategory }, slug, lang) : undefined;
  if (!post && validCombination) {
    redirectToBlogCategoryAndSubCategoryPairPageUnstrict(category, subCategory);
  } else if (!post && isValidCategory(category)) {
    redirectToBlogCategoryPage(category);
  } else if (!post) {
    redirect(RoutesBase.WEBSITE_ROOT + category);
  }

  const { title, metadescription: description } = post as PostBase;
  return { title, description };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): BlogStaticParams[] {
    const indexedParams = new Set<string>();
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubCategs = getBlogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCateg) => {
        const subCategory = subCateg as BlogSubCategoryFromUnknownCategory;
        const relatedPosts = getAllPostsByCategoryAndSubCategoryUnstrict({ category, subCategory });

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

  if (!isValidCategoryAndSubCategoryPair(params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY])) notFound();

  return <BlogPost {...{ params }} />;
}
