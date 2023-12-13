import BlogTaxonomy from '##/config/taxonomies/blog';
import type { BlogCategoryPageProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { isValidBlogCategory } from '../api';

async function blogCategoryGuard({ params }: BlogCategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  if (!isValidBlogCategory(category)) notFound();
}

export default blogCategoryGuard;
