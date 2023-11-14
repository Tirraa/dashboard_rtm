import NotFoundTaxonomy from '##/config/taxonomies/notfound';
import type { NotFoundCatchallParams } from '@/types/Next';
import { RedirectType, redirect, usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

interface NotFoundCatchallProps extends NotFoundCatchallParams {}

export const NotFoundCatchall: FunctionComponent<NotFoundCatchallProps> = ({ params }) => {
  const pathname = usePathname();
  const pathnameUnknownPart = params[NotFoundTaxonomy.NOT_FOUND].join('/');
  const computedRedirectPathname = pathname.slice(0, -pathnameUnknownPart.length);
  redirect(computedRedirectPathname, RedirectType.replace);
};

export default NotFoundCatchall;
