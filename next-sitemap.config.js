const DEFAULT_LANGUAGE = require('./interop/config/sitemap/defaultLanguageNextSitemapAdapter');
const APP_PROTECTED_PATHS = require('./interop/config/sitemap/excludedRoutesPrefixesNextSitemapAdapter');

const APP_PROTECTED_PATHS_AS_EXCLUDED_ROUTES_PREFIXES = APP_PROTECTED_PATHS.map((path) => path.concat(path.endsWith('/') ? '' : '/'));

const EXCLUDED_ROUTES_PREFIXES = ['/favicon.ico', '/icon.svg', '/apple-icon.png', ...APP_PROTECTED_PATHS_AS_EXCLUDED_ROUTES_PREFIXES];

const siteUrl = process.env.NEXTAUTH_URL;

const getPathWithoutI18nPart = (path) => path.substring(path.indexOf('/', path.indexOf('/') + 1));

const isIgnoredPath = (path) =>
  EXCLUDED_ROUTES_PREFIXES.some((prefix) => getPathWithoutI18nPart(path).startsWith(prefix)) ||
  EXCLUDED_ROUTES_PREFIXES.some((prefix) => path.startsWith(prefix));

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'monthly',

  transform: (config, path) => {
    const defaultLanguageNeedle = '/' + DEFAULT_LANGUAGE;
    const defaultLanguageEnvelopeNeedle = defaultLanguageNeedle + '/';
    const defaultLanguageNeedleLen = defaultLanguageNeedle.length;

    if (isIgnoredPath(path)) path = '';

    if (path.startsWith(defaultLanguageEnvelopeNeedle)) path = path.substring(defaultLanguageNeedleLen);
    else if (path === defaultLanguageNeedle) path = '/';

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority
    };
  }
};
