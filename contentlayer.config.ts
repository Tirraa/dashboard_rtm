import { DocumentType, defineDocumentType, makeSource } from 'contentlayer/source-files';
import { Element as hASTElement } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { AtomicDocumentConfig, DocumentsTypesMetadatas } from 'types/contentlayerConfig';
import CodeSnippetTheme from './config/blog/code-snippet-theme.json';
import { addClassname } from './src/lib/astElements';
import {
  DOCUMENTS_CONTENT_EXTENSION as EXT,
  POST_SCHEMA_CONFIG,
  DOCUMENTS_COMPUTED_FIELDS as computedFields,
  DOCUMENTS_CONTENT_TYPE as contentType,
  DOCUMENTS_FIELDS as fields
} from './types/contentlayerConfigTweakers';
import { validateContentLayerConfig } from './validators/contentLayer';

const contentDirPath = 'posts';

const documentsTypesMetadatas: DocumentsTypesMetadatas = {
  PatchPost: {
    name: 'PatchPost',
    filePathPattern: `patch-notes/**/*.${EXT}`,
    contentType
  },
  PatchPostBis: {
    name: 'PatchPostBis',
    filePathPattern: `patch-notes-bis/**/*.${EXT}`,
    contentType
  }
} as const;

const documentTypes: DocumentType<string>[] = Object.values(documentsTypesMetadatas).reduce(
  (acc, documentTypeMetadatas) => {
    const { name, filePathPattern, contentType } = documentTypeMetadatas;
    acc.push(defineDocumentType(() => ({ name, filePathPattern, contentType, fields, computedFields } as const satisfies AtomicDocumentConfig)));
    return acc;
  },
  [defineDocumentType(() => POST_SCHEMA_CONFIG)]
);

validateContentLayerConfig(documentTypes);

export default makeSource({
  contentDirPath,
  documentTypes,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: CodeSnippetTheme,
          onVisitLine(node: hASTElement) {
            if (node.children.length === 0) node.children = [{ type: 'text', value: ' ' }];
          },
          onVisitHighlightedLine(node: hASTElement) {
            addClassname(node, 'line--highlighted');
          },
          onVisitHighlightedWord(node: hASTElement) {
            addClassname(node, 'word--highlighted');
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor']
          }
        }
      ]
    ]
  }
});
