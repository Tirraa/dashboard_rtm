import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { BlogSubCategoryPageProps } from '@/types/Blog';

import { languages } from '@/app/i18n/settings';
import { blogSubCategoriesByCategory } from '@/app/proxies/blog';
import BlogConfig, { BlogCategory } from '@/config/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogStaticParams, BlogStaticParamsValue, BlogSubCategory } from '@/types/Blog';
import { PartialRecord } from '@/types/UglyTypes';

export async function generateStaticParams() {
  function generateBlogStaticParams(): Partial<BlogStaticParams>[] {
    const existingParams = new Set<string>();
    const blogStaticParams: PartialRecord<keyof BlogStaticParams, BlogStaticParamsValue>[] = [];
    const blogCategories = Object.keys(BlogConfig.blogCategoriesAllPostsTypesAssoc);

    blogCategories.forEach((category) => {
      const categ = category as BlogCategory;
      const curSubCategs = blogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCateg) => {
        const subcateg = subCateg as BlogSubCategory;
        const staticParamsKey = `${categ}-${subcateg}`;

        if (!existingParams.has(staticParamsKey)) {
          existingParams.add(staticParamsKey);
          const entity = { [BlogTaxonomy.category]: categ, [BlogTaxonomy.subCategory]: subcateg };
          blogStaticParams.push(entity);
        }
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
