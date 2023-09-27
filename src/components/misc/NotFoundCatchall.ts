'use client';

import NotFoundTaxonomy from '@/taxonomies/notfound';
import { NotFoundCatchallParams } from '@/types/Next';
import { redirect, usePathname } from 'next/navigation';

export function NotFoundCatchall({ params }: NotFoundCatchallParams) {
  const pathname = usePathname();
  const pathnameUnknownPart = params[NotFoundTaxonomy.NOT_FOUND].join('/');
  const computedRedirectPathname = pathname.slice(0, -pathnameUnknownPart.length);
  redirect(computedRedirectPathname);
}

export default NotFoundCatchall;
