import NotFoundTaxonomy from '@/taxonomies/notfound';
import { NotFoundCatchallParams } from '@/types/Next';
import { RedirectType, redirect, usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

interface NotFoundCatchallProps extends NotFoundCatchallParams {}

export const NotFoundCatchall: FunctionComponent<NotFoundCatchallProps> = ({ params }) => {
  const pathname = usePathname();
  const pathnameUnknownPart = params[NotFoundTaxonomy.NOT_FOUND].join('/');
  const computedRedirectPathname = pathname.slice(0, -pathnameUnknownPart.length);
  redirect(computedRedirectPathname, RedirectType.replace);
};

export default NotFoundCatchall;
