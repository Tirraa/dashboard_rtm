/* v8 ignore start */
import type { Element as hASTElement } from 'hast';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { h, s } from 'hastscript';

import { BLOG_POSTS_FOLDER } from './interop/config/blog/contentlayerConfigTweakers';
import CodeSnippetTheme from './interop/config/blog/code-snippet-theme.json';
import validateContentLayerConfig from './interop/validators/contentLayer';
import blogDocumentTypes from './interop/config/blog/documentTypes';
import addClassname from './interop/lib/misc/addClassname';

const contentDirPath = './content';
const contentDirInclude = [BLOG_POSTS_FOLDER];
const documentTypes = blogDocumentTypes;

validateContentLayerConfig(documentTypes);

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
          content: [
            h('span.sr-only', 'permalink'),
            s(
              'svg.autolink-svg.h-full',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'currentColor',
                viewBox: '0 0 24 24',
                height: 24,
                width: 24
              },
              s('path', {
                d: 'M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z'
              })
            )
          ],
          properties: {
            class: ['autolink-header', 'mr-1'],
            ariaHidden: false,
            tabIndex: 0
          },
          behavior: 'prepend'
        }
      ]
    ],
    remarkPlugins: [remarkGfm]
  },
  contentDirInclude,
  contentDirPath,
  documentTypes
});
/* v8 ignore stop */
