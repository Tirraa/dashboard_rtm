/* v8 ignore start */
// Stryker disable all
import type { Element as hASTElement } from 'hast';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { LANDING_PAGES_FOLDER, BLOG_POSTS_FOLDER, PAGES_FOLDER } from './interop/config/contentlayer/contentlayerConfigTweakers';
import landingPagesDocumentType from './interop/config/contentlayer/landing-pages/documentType';
import CodeSnippetTheme from './interop/config/contentlayer/blog/code-snippet-theme.json';
import blogDocumentTypes from './interop/config/contentlayer/blog/documentTypes';
import pagesDocumentType from './interop/config/contentlayer/pages/documentType';
import validateContentlayerConfig from './interop/validators/contentlayer';
import addClassname from './interop/lib/misc/addClassname';

const contentDirPath = './content';
const contentDirInclude = [BLOG_POSTS_FOLDER, LANDING_PAGES_FOLDER, PAGES_FOLDER];
const documentTypes = [...blogDocumentTypes, landingPagesDocumentType, pagesDocumentType];

validateContentlayerConfig(documentTypes);

export default makeSource({
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeExternalLinks, { rel: ['nofollow'] }],
      [
        rehypePrettyCode,
        {
          onVisitLine(node: hASTElement) {
            if (node.children.length === 0) node.children = [{ type: 'text', value: ' ' }];
          },
          onVisitHighlightedLine(node: hASTElement) {
            addClassname(node, 'line--highlighted');
          },
          onVisitHighlightedWord(node: hASTElement) {
            addClassname(node, 'word--highlighted');
          },
          theme: CodeSnippetTheme
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap'
        }
      ]
    ],
    remarkPlugins: [remarkGfm]
  },
  contentDirInclude,
  contentDirPath,
  documentTypes
});
// Stryker restore all
/* v8 ignore stop */
