const siteUrl = 'https://example.com'; // {ToDo}
const DEFAULT_LANGUAGE = 'fr';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/favicon.ico', '/icon.svg', '/apple-icon.png', '/dashboard/*'],
  changefreq: 'monthly',

  transform: async (config, path) => {
    const DEFAULT_LANGUAGE_NEEDLE = '/' + DEFAULT_LANGUAGE;
    if (path.startsWith(DEFAULT_LANGUAGE_NEEDLE)) path = path.substring(DEFAULT_LANGUAGE_NEEDLE.length);

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      exclude: config.exclude
    };
  }
};
