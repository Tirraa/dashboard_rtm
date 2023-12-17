import type { BlogSubcategoryPageProps } from '@/types/Blog';

import BlogTaxonomy from '##/config/taxonomies/blog';
import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

import { isValidBlogCategoryAndSubcategoryPairInAnyLanguage, redirectToBlogCategoryPage, isValidBlogCategory } from '../api';

async function blogSubcategoryGuard({ params }: BlogSubcategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  const validCategory = isValidBlogCategory(category);
  const categServedAtRoot = ROUTES_ROOTS.WEBSITE + category === ROUTES_ROOTS.BLOG + category;
  if (!validCategory && !categServedAtRoot) redirect(ROUTES_ROOTS.WEBSITE + category);

  const subcategory = params[BlogTaxonomy.SUBCATEGORY];

  const validCombination: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);
  if (!validCombination) redirectToBlogCategoryPage(category);
}

export default blogSubcategoryGuard;
