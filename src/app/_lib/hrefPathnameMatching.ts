import RoutesBase from '../_config/routes';
import getSlashEnvelope from './getSlashEnvelope';

export function hrefMatchesPathname(href: string, pathname: string): boolean {
  return pathname === href || (href !== RoutesBase.sitewide && pathname.startsWith(getSlashEnvelope(href)));
}
