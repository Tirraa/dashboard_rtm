import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { BlogSubCategoryPageProps } from '@/types/Blog';

import { getBlogSubCategoriesByCategory } from '@/app/proxies/blog';
import BlogConfig, { BlogCategory } from '@/config/blog';
import { languages } from '@/i18n/settings';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogStaticParams, BlogStaticParamsValue, BlogSubCategory } from '@/types/Blog';

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const existingParams = new Set<string>();
    const blogStaticParams: Partial<Record<keyof BlogStaticParams, BlogStaticParamsValue>>[] = [];
    const blogCategories = Object.keys(BlogConfig.blogCategoriesAllPostsTypesAssoc);

    blogCategories.forEach((category) => {
      const categ = category as BlogCategory;
      const curSubCategs = getBlogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCateg) => {
        const subcateg = subCateg as BlogSubCategory;
        const staticParamsKey = `${categ}-${subcateg}`;

        if (existingParams.has(staticParamsKey)) return;
        existingParams.add(staticParamsKey);
        const entity = { [BlogTaxonomy.category]: categ, [BlogTaxonomy.subCategory]: subcateg };
        blogStaticParams.push(entity);
      });
    });
    return blogStaticParams as Partial<BlogStaticParams>[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = languages.flatMap((lng) =>
    blogStaticParamsEntities.map((entity) => ({
      lng,
      ...entity
    }))
  );

  return staticParams;
}

export default function Page({ params }: BlogSubCategoryPageProps) {
  return <SubCategoryRelatedBlogPosts {...{ params }} />;
}
