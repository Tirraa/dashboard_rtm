/* v8 ignore start */
// @ts-check

// Stryker disable all
const DEFAULT_LANGUAGE = require('./interop/config/sitemap/defaultLanguageNextSitemapAdapter');
const APP_PROTECTED_PATHS = require('./interop/config/sitemap/excludedRoutesPrefixesNextSitemapAdapter');

const APP_PROTECTED_PATHS_AS_EXCLUDED_ROUTES_PREFIXES = APP_PROTECTED_PATHS.map((path) => path.concat(path.endsWith('/') ? '' : '/'));

const EXCLUDED_ROUTES_PREFIXES = ['/favicon.ico', '/icon.svg', '/apple-icon.png', ...APP_PROTECTED_PATHS_AS_EXCLUDED_ROUTES_PREFIXES];

const siteUrl = process.env.NEXT_SITEMAP_SITE_URL;

const getPathWithoutI18nPart = (path) => path.substring(path.indexOf('/', path.indexOf('/') + 1));

const isIgnoredPath = (path) =>
  EXCLUDED_ROUTES_PREFIXES.some((prefix) => getPathWithoutI18nPart(path).startsWith(prefix)) ||
  EXCLUDED_ROUTES_PREFIXES.some((prefix) => path.startsWith(prefix));

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  transform: (config, path) => {
    const defaultLanguageNeedle = '/' + DEFAULT_LANGUAGE;
    const defaultLanguageEnvelopeNeedle = defaultLanguageNeedle + '/';
    const defaultLanguageNeedleLen = defaultLanguageNeedle.length;

    if (isIgnoredPath(path)) path = '';

    if (path.startsWith(defaultLanguageEnvelopeNeedle)) path = path.substring(defaultLanguageNeedleLen);
    else if (path === defaultLanguageNeedle) path = '/';

    return {
      changefreq: config.changefreq,
      priority: config.priority,
      loc: path
    };
  },
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.5,

  siteUrl
};
// Stryker restore all
/* v8 ignore stop */
