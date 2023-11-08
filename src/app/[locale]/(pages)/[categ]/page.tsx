import CategoryRelatedSubcategoriesAndBlogPosts from '@/components/pages/blog/CategoryRelatedSubcategoriesAndBlogPosts';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import { LANGUAGES, i18ns } from '@/config/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { getAllBlogCategories } from '@/lib/blog';
import { getPageTitle } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { BlogCategory, BlogCategoryPageProps, BlogStaticParams } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

// {ToDo} Move this logic in the layout?
export async function generateMetadata({ params }: BlogCategoryPageProps) {
  const globalT = await getServerSideI18n();
  const category = params[BlogTaxonomy.CATEGORY];
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.blogCategories}.${category}._title`));
  const description = globalT(`${i18ns.blogCategories}.${category}._meta-description`);
  return { title, description };
}

// {ToDo} Refactor this!
export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllBlogCategories();

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

  return (
    <div className="mx-8 flex flex-col items-center lg:mx-auto lg:max-w-[750px]">
      <Breadcrumbs className="w-full py-4" />
      <CategoryRelatedSubcategoriesAndBlogPosts params={params} />
    </div>
  );
}
