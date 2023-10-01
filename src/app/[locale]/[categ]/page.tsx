import CategoryRelatedSubCategoriesAndBlogPosts from '@/components/pages/blog/CategoryRelatedSubCategoriesAndBlogPosts';
import { LANGUAGES, i18ns } from '@/config/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { getAllCategories } from '@/lib/blog';
import { getPageTitle } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogCategoryPageProps, BlogStaticParams } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateMetadata({ params }: BlogCategoryPageProps) {
  const globalT = await getServerSideI18n();
  const category = params[BlogTaxonomy.CATEGORY];
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}._title`));
  const description = globalT(`${i18ns.blogCategories}.${category}._meta-description`);
  return { title, description };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      LANGUAGES.forEach((language) => {
        const entity = { [BlogTaxonomy.CATEGORY]: category, [i18nTaxonomy.LANG_FLAG]: language };
        blogStaticParams.push(entity);
      });
    });
    return blogStaticParams;
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = blogStaticParamsEntities.map((entity) => ({ ...entity }));

  return staticParams;
}

export default function Page({ params }: BlogCategoryPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return <CategoryRelatedSubCategoriesAndBlogPosts {...{ params }} />;
}
