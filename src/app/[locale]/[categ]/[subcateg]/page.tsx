import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { BlogCategory, BlogSubCategoryPageProps } from '@/types/Blog';

import { getBlogSubCategoriesByCategory } from '@/cache/blog';
import { LANGUAGES } from '@/config/i18n';
import RoutesBase from '@/config/routes';
import {
  getAllCategories,
  getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict,
  isValidCategory,
  isValidCategoryAndSubCategoryPair,
  redirectToBlogCategoryPage,
  subCategoryShouldTriggerNotFound
} from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogStaticParams } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { setStaticParamsLocale } from 'next-international/server';
import { notFound, redirect } from 'next/navigation';

// {ToDo} Work in progress (only a guard for now)
export function generateMetadata({ params }: BlogSubCategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  const validCategory = isValidCategory(category);
  const equivRoutes = RoutesBase.WEBSITE_ROOT + category === RoutesBase.BLOG + category;
  if (!validCategory && !equivRoutes) redirect(RoutesBase.WEBSITE_ROOT + category);

  const subCategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination = isValidCategoryAndSubCategoryPair(category, subCategory);
  if (!validCombination) redirectToBlogCategoryPage(category);

  const [title, description] = ['TODO', 'WIP'];
  return { title, description };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const indexedParams = new Set<string>();
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const curSubCategs = getBlogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCategory) => {
        LANGUAGES.forEach((language) => {
          const category = categ as BlogCategory;
          const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict({ category, subCategory }, language);

          if (subCategoryShouldTriggerNotFound(postsCollection, { category, subCategory })) return;

          const staticParamsIndexKey = `${categ}-${subCategory}-${language}`;
          if (indexedParams.has(staticParamsIndexKey)) return;

          indexedParams.add(staticParamsIndexKey);
          const entity = { [BlogTaxonomy.CATEGORY]: categ, [BlogTaxonomy.SUBCATEGORY]: subCategory, [i18nTaxonomy.LANG_FLAG]: language };
          blogStaticParams.push(entity);
        });
      });
    });
    return blogStaticParams;
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = blogStaticParamsEntities.map((entity) => ({ ...entity }));

  return staticParams;
}

export default function Page({ params }: BlogSubCategoryPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  if (!isValidCategoryAndSubCategoryPair(params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY])) notFound();

  return <SubCategoryRelatedBlogPosts {...{ params }} />;
}
