import { getBlogSubCategoriesByCategory } from '@/cache/blog';
import SubCategoryRelatedBlogPosts from '@/components/pages/blog/SubCategoryRelatedBlogPosts';
import { LANGUAGES, i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getServerSideI18n } from '@/i18n/server';
import {
  getAllCategories,
  getAllPostsByCategoryAndSubCategoryAndLanguageFlagUnstrict,
  isValidCategory,
  isValidCategoryAndSubCategoryPair,
  redirectToBlogCategoryPage,
  subCategoryShouldTriggerNotFound
} from '@/lib/blog';
import { getPageTitle } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogStaticParams, BlogSubCategoryPageProps, PostBase } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: BlogSubCategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  const validCategory = isValidCategory(category);
  const equivRoutes = ROUTES_ROOTS.WEBSITE + category === ROUTES_ROOTS.BLOG + category;
  if (!validCategory && !equivRoutes) redirect(ROUTES_ROOTS.WEBSITE + category);

  const subCategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination = isValidCategoryAndSubCategoryPair(category, subCategory);
  if (!validCombination) redirectToBlogCategoryPage(category);

  const globalT = await getServerSideI18n();
  // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}.${subCategory}.title`));
  // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
  const description = globalT(`${i18ns.blogCategories}.${category}.${subCategory}.meta-description`);
  return { title, description };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const indexedParams = new Set<string>();
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubCategs = getBlogSubCategoriesByCategory(category);

      curSubCategs.forEach((subCategory) => {
        LANGUAGES.forEach((language) => {
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

  return <SubCategoryRelatedBlogPosts {...{ params }} />;
}
