import type { BlogSubcategoryFromUnknownCategory, BlogStaticParams, UnknownBlogSlug, BlogCategory, TBlogPost } from '@/types/Blog';

import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { LANGUAGES } from '##/config/i18n';

import { getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict, getAllBlogCategories } from '../api';

export default async function getBlogStaticParams(): Promise<BlogStaticParams[]> {
  const blogStaticParams: BlogStaticParams[] = [];
  const blogCategories = getAllBlogCategories();

  for (const language of LANGUAGES) {
    for (const categ of blogCategories) {
      const category = categ as BlogCategory;
      const curSubcategs: BlogSubcategoryFromUnknownCategory[] = await getBlogSubcategoriesByCategory(category, language);

      for (const subcateg of curSubcategs) {
        const subcategory = subcateg as BlogSubcategoryFromUnknownCategory;

        const relatedPosts: TBlogPost[] = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict(category, subcategory, language);

        for (const post of relatedPosts) {
          const slug = post.slug as UnknownBlogSlug;

          const entity: BlogStaticParams = {
            [BlogTaxonomy.SUBCATEGORY]: subcategory,
            [I18nTaxonomy.LANGUAGE]: language,
            [BlogTaxonomy.CATEGORY]: category,
            [BlogTaxonomy.SLUG]: slug
          };
          blogStaticParams.push(entity);
        }
      }
    }
  }

  return blogStaticParams;
}
