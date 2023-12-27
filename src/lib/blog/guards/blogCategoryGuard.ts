import type { BlogCategoryPageProps } from '@/types/Blog';

import BlogTaxonomy from '##/config/taxonomies/blog';
import { notFound } from 'next/navigation';

import { isValidBlogCategory } from '../api';

export default async function blogCategoryGuard({ params }: BlogCategoryPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];

  if (!isValidBlogCategory(category)) notFound();
}
