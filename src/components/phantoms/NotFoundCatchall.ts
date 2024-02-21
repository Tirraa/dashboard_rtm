'use client';

import type { NotFoundCatchallParams } from '@/types/Next';
import type { FunctionComponent } from 'react';

import { RedirectType, usePathname, redirect } from 'next/navigation';
import NotFoundTaxonomy from '##/config/taxonomies/notfound';

interface NotFoundCatchallProps extends NotFoundCatchallParams {}

const NotFoundCatchall: FunctionComponent<NotFoundCatchallProps> = ({ params }) => {
  const pathname = usePathname();
  const pathnameUnknownPart = params[NotFoundTaxonomy.NOT_FOUND].join('/');
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const computedRedirectPathname = pathname.slice(0, -pathnameUnknownPart.length);
  redirect(computedRedirectPathname, RedirectType.replace);
};

export default NotFoundCatchall;
