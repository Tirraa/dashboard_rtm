import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { BlogCategory, BlogSubCategoryPageProps } from '@/types/Blog';

import { getBlogSubCategoriesByCategory } from '@/cache/blog';
import { LANGUAGES } from '@/i18n/settings';
import {
  getAllCategories,
  getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict,
  isValidCategoryAndSubCategoryPair,
  subCategoryShouldTriggerNotFound
} from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogStaticParams } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { LanguageFlag } from '@/types/i18n';
import { setStaticParamsLocale } from 'next-international/server';
import { notFound } from 'next/navigation';

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
          const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict(
            { category, subCategory },
            language as LanguageFlag
          );

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
