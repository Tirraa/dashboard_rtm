const siteUrl = 'https://example.com'; // {ToDo}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/icon.svg', '/apple-icon.png'],
}