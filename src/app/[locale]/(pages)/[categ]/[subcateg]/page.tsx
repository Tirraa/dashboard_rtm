import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import SubcategoryRelatedBlogPosts from '@/components/pages/blog/SubcategoryRelatedBlogPosts';
import { LANGUAGES, i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getServerSideI18n } from '@/i18n/server';
import {
  blogSubcategoryShouldTriggerNotFound,
  getAllBlogCategories,
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict,
  isValidBlogCategory,
  isValidBlogCategoryAndSubcategoryPair,
  redirectToBlogCategoryPage
} from '@/lib/blog';
import { getPageTitle } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { BlogCategory, BlogStaticParams, BlogSubcategoryPageProps, PostBase } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: BlogSubcategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  const validCategory = isValidBlogCategory(category);
  const equivRoutes = ROUTES_ROOTS.WEBSITE + category === ROUTES_ROOTS.BLOG + category;
  if (!validCategory && !equivRoutes) redirect(ROUTES_ROOTS.WEBSITE + category);

  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination = isValidBlogCategoryAndSubcategoryPair(category, subcategory);
  if (!validCombination) redirectToBlogCategoryPage(category);

  const globalT = await getServerSideI18n();
  // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}.${subcategory}.title`));
  // @ts-ignore - VERIFIED BY THE INTERNAL STATIC ANALYZER
  const description = globalT(`${i18ns.blogCategories}.${category}.${subcategory}.meta-description`);
  return { title, description };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const indexedParams = new Set<string>();
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllBlogCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubcategs = getBlogSubcategoriesByCategory(category);

      curSubcategs.forEach((subcategory) => {
        LANGUAGES.forEach((language) => {
          const postsCollection: PostBase[] = getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict({ category, subcategory }, language);

          if (blogSubcategoryShouldTriggerNotFound(postsCollection, { category, subcategory })) return;

          const staticParamsIndexKey = `${categ}-${subcategory}-${language}`;
          if (indexedParams.has(staticParamsIndexKey)) return;

          indexedParams.add(staticParamsIndexKey);
          const entity = { [BlogTaxonomy.CATEGORY]: categ, [BlogTaxonomy.SUBCATEGORY]: subcategory, [i18nTaxonomy.LANG_FLAG]: language };
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

export default function Page({ params }: BlogSubcategoryPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return <SubcategoryRelatedBlogPosts params={params} />;
}
