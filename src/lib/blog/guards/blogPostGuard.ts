import BlogTaxonomy from '##/config/taxonomies/blog';
import i18nTaxonomy from '##/config/taxonomies/i18n';
import ROUTES_ROOTS from '@/config/routes';
import type { BlogPostPageProps } from '@/types/Blog';
import { redirect } from 'next/navigation';
import {
  getBlogPostUnstrict,
  isValidBlogCategory,
  isValidBlogCategoryAndSubcategoryPair,
  redirectToBlogCategoryAndSubcategoryPairPageUnstrict,
  redirectToBlogCategoryPage
} from '..';

export async function blogPostGuard({ params }: BlogPostPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory);

  const slug = params[BlogTaxonomy.SLUG];
  const lang = params[i18nTaxonomy.LANG_FLAG];
  const post = validCombination ? await getBlogPostUnstrict({ category, subcategory }, slug, lang) : undefined;

  if (!post && validCombination) {
    redirectToBlogCategoryAndSubcategoryPairPageUnstrict(category, subcategory);
  } else if (!post && isValidBlogCategory(category)) {
    redirectToBlogCategoryPage(category);
  } else if (!post) {
    redirect(ROUTES_ROOTS.WEBSITE + category);
  }
}

export default blogPostGuard;
