import { getBlogSubCategoriesByCategory } from '@/app/proxies/blog';
import BlogPost from '@/components/blog/BlogPost';
import { languages } from '@/i18n/settings';
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
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: BlogPostPageProps) {
  const category = getBlogCategoryFromPathname(getPathnameWithoutI18nFlag(getServerSidePathnameWorkaround())) as BlogCategory;
  const subCategory = params[BlogTaxonomy.subCategory] as BlogSubCategoryFromUnknownCategory;
  const slug = params[BlogTaxonomy.slug];
  const lang = params[i18nTaxonomy.langFlag];
  const post = getPostUnstrict({ category, subCategory }, slug, lang);
  if (!post) notFound();

  return { title: post.title, description: post.metadescription };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): BlogStaticParams[] {
    const existingParams = new Set<string>();
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubCategs = getBlogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCateg) => {
        const subCategory = subCateg as BlogSubCategoryFromUnknownCategory;
        const relatedPosts = getAllPostsByCategoryAndSubCategoryUnstrict({ category, subCategory });

        relatedPosts.forEach((post) => {
          languages.forEach((language) => {
            const slug = getBlogPostSlug(post);

            const blogPostExists = getPostUnstrict({ category, subCategory }, slug, language as LanguageFlag);
            if (!blogPostExists) return;

            const staticParamsKey = `${categ}-${subCategory}-${slug}-${language}`;
            if (existingParams.has(staticParamsKey)) return;

            existingParams.add(staticParamsKey);
            const entity: BlogStaticParams = {
              [i18nTaxonomy.langFlag]: language,
              [BlogTaxonomy.category]: category,
              [BlogTaxonomy.subCategory]: subCategory,
              [BlogTaxonomy.slug]: slug
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
  return <BlogPost {...{ params }} />;
}
