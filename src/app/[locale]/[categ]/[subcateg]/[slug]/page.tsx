import { getBlogSubCategoriesByCategory } from '@/cache/blog';
import BlogPost from '@/components/blog/BlogPost';
import { LANGUAGES } from '@/i18n/settings';
import {
  getAllCategories,
  getAllPostsByCategoryAndSubCategoryUnstrict,
  getBlogCategoryFromPathname,
  getBlogPostSlug,
  getPostUnstrict
} from '@/lib/blog';
import { getPathnameWithoutI18nFlag } from '@/lib/i18n';
import getServerSidePathnameWorkaround from '@/lib/misc/getServerSidePathname';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogPostPageProps, BlogStaticParams, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';
import { LanguageFlag } from '@/types/i18n';
import { setStaticParamsLocale } from 'next-international/server';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: BlogPostPageProps) {
  const category = getBlogCategoryFromPathname(getPathnameWithoutI18nFlag(getServerSidePathnameWorkaround()));
  const subCategory = params[BlogTaxonomy.SUBCATEGORY];
  const slug = params[BlogTaxonomy.SLUG];
  const lang = params[i18nTaxonomy.LANG_FLAG];
  const post = getPostUnstrict({ category, subCategory }, slug, lang);
  if (!post) notFound();

  const { title, metadescription: description } = post;
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

            const blogPostExists = getPostUnstrict({ category, subCategory }, slug, language as LanguageFlag);
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
