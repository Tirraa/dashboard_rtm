import type { BlogPostPageProps } from '@/types/Blog';

import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

import {
  redirectToBlogCategoryAndSubcategoryPairPageUnstrict,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  redirectToBlogCategoryPage,
  getBlogPostUnstrict,
  isValidBlogCategory
} from '../api';

export default async function blogPostGuard({ params }: BlogPostPageProps) {
  const [category, subcategory] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY]];

  const validCombination: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);

  const [slug, language] = [params[BlogTaxonomy.SLUG], params[I18nTaxonomy.LANGUAGE]];

  const post = validCombination ? await getBlogPostUnstrict(category, subcategory, slug, language) : undefined;

  if (!post && validCombination) {
    redirectToBlogCategoryAndSubcategoryPairPageUnstrict(category, subcategory);
  } else if (!post && isValidBlogCategory(category)) {
    redirectToBlogCategoryPage(category);
  } else if (!post) {
    redirect(ROUTES_ROOTS.WEBSITE + category);
  }
}
