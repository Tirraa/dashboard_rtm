import type { BlogSubcategoryPageProps } from '@/types/Blog';

import buildAbsolutePathFromParts from '@rtm/shared-lib/portable/str/buildAbsolutePathFromParts';
import BlogTaxonomy from '##/config/taxonomies/blog';
import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

import { isValidBlogCategoryAndSubcategoryPairInAnyLanguage, redirectToBlogCategoryPage, isValidBlogCategory } from '../api';

export default async function blogSubcategoryGuard({ params }: BlogSubcategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  const validCategory = isValidBlogCategory(category);
  // Stryker Workaround 1. Mutant will be killed with `= true` as expected, but `= false` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  const categServedAtRoot = ROUTES_ROOTS.WEBSITE + category === ROUTES_ROOTS.BLOG + category;
  if (!validCategory && !categServedAtRoot) redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.WEBSITE, category));

  const subcategory = params[BlogTaxonomy.SUBCATEGORY];

  const validCombination: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);
  if (!validCombination) redirectToBlogCategoryPage(category);
}
