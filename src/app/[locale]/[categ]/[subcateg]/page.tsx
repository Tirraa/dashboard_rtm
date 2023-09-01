import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { BlogSubCategoryPageProps } from '@/types/Blog';

import { getBlogSubCategoriesByCategory } from '@/app/proxies/blog';
import { languages } from '@/i18n/settings';
import { getAllCategories } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogStaticParams, BlogSubCategory } from '@/types/Blog';

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const existingParams = new Set<string>();
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubCategs = getBlogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCateg) => {
        const subCategory = subCateg as BlogSubCategory<typeof category>;
        const staticParamsKey = `${categ}-${subCategory}`;

        if (existingParams.has(staticParamsKey)) return;
        existingParams.add(staticParamsKey);
        const entity = { [BlogTaxonomy.category]: categ, [BlogTaxonomy.subCategory]: subCategory };
        blogStaticParams.push(entity);
      });
    });
    return blogStaticParams as Partial<BlogStaticParams>[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = languages.flatMap((locale) =>
    blogStaticParamsEntities.map((entity) => ({
      [i18nTaxonomy.langFlag]: locale,
      ...entity
    }))
  );

  return staticParams;
}

export default function Page({ params }: BlogSubCategoryPageProps) {
  return <SubCategoryRelatedBlogPosts {...{ params }} />;
}
