import ROUTES_ROOTS from '##/config/routes';
import BlogTaxonomy from '##/config/taxonomies/blog';
import type { BlogSubcategoryPageProps } from '@/types/Blog';
import { redirect } from 'next/navigation';
import { isValidBlogCategory, isValidBlogCategoryAndSubcategoryPair, redirectToBlogCategoryPage } from '..';

export async function blogSubcategoryGuard({ params }: BlogSubcategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  const validCategory = isValidBlogCategory(category);
  const categServedAtRoot = ROUTES_ROOTS.WEBSITE + category === ROUTES_ROOTS.BLOG + category;
  if (!validCategory && !categServedAtRoot) redirect(ROUTES_ROOTS.WEBSITE + category);

  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory);
  if (!validCombination) redirectToBlogCategoryPage(category);
}

export default blogSubcategoryGuard;
