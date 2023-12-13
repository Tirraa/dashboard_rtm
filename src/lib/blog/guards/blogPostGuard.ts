import ROUTES_ROOTS from '##/config/routes';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import type { BlogPostPageProps } from '@/types/Blog';
import { redirect } from 'next/navigation';
import {
  getBlogPostUnstrict,
  isValidBlogCategory,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  redirectToBlogCategoryAndSubcategoryPairPageUnstrict,
  redirectToBlogCategoryPage
} from '../api';

async function blogPostGuard({ params }: BlogPostPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];

  const validCombination: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);

  const slug = params[BlogTaxonomy.SLUG];
  const language = params[I18nTaxonomy.LANGUAGE];

  const post = validCombination ? await getBlogPostUnstrict(category, subcategory, slug, language) : undefined;

  if (!post && validCombination) {
    redirectToBlogCategoryAndSubcategoryPairPageUnstrict(category, subcategory);
  } else if (!post && isValidBlogCategory(category)) {
    redirectToBlogCategoryPage(category);
  } else if (!post) {
    redirect(ROUTES_ROOTS.WEBSITE + category);
  }
}

export default blogPostGuard;
