import RoutesBase from '../_config/routes';
import getSlashEnvelope from './getSlashEnvelope';

export const hrefMatchesPathname = (href: string, pathname: string): boolean =>
  pathname === href || (href !== RoutesBase.sitewide && pathname.startsWith(getSlashEnvelope(href)));
