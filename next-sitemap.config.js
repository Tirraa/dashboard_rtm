const siteUrl = 'https://example.com'; // {ToDo}
const DEFAULT_LANGUAGE = 'fr';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/favicon.ico', '/icon.svg', '/apple-icon.png', '/dashboard/*'],
  changefreq: 'monthly',

  transform: (config, path) => {
    const defaultLanguageNeedle = '/' + DEFAULT_LANGUAGE;
    const defaultLanguageEnvelopeNeedle = defaultLanguageNeedle + '/';
    const defaultLanguageNeedleLen = defaultLanguageNeedle.length;
    if (path.startsWith(defaultLanguageEnvelopeNeedle)) {
      path = path.substring(defaultLanguageNeedleLen);
    } else if (path === defaultLanguageNeedle) {
      path = '/';
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority
    };
  }
};
