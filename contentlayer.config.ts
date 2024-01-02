/* v8 ignore start */
// Stryker disable all
import type { Element as hASTElement } from 'hast';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

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
/* v8 ignore stop */
// Stryker restore all
