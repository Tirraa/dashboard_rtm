import getSlashEnvelope from './getSlashEnvelope';

export function hrefMatchesPathname(href: string, pathname: string): boolean {
  return pathname === href || (href !== '/' && pathname.startsWith(getSlashEnvelope(href)));
}
