import type { AtomicContentlayerDocumentConfig } from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentType } from 'contentlayer/source-files';

import type { BlogDocumentsTypesMetadatas } from '../contentlayerConfigTweakers';

import {
  BLOG_DOCUMENTS_COMPUTED_FIELDS as computedFields,
  DOCUMENTS_CONTENT_TYPE as contentType,
  DOCUMENTS_CONTENT_EXTENSION as EXT,
  BLOG_DOCUMENTS_FIELDS as fields,
  BLOG_POST_SCHEMA_CONFIG,
  BLOG_POSTS_FOLDER
} from '../contentlayerConfigTweakers';
import blogDataAssocBuilder from '../../../lib/builders/blog/blogDataAssoc';
import { defineDocumentType } from '../adapters';

const documentsTypesMetadatas: BlogDocumentsTypesMetadatas = {
  TestingPost: {
    categoryFolder: 'blog-testing-category'
  },
  PatchPostBis: {
    categoryFolder: 'patch-notes-bis'
  },
  PatchPost: {
    categoryFolder: 'patch-notes'
  }
} as const;

const blogDocumentTypes: DocumentType[] = Object.entries(documentsTypesMetadatas).reduce(
  (acc, [name, documentTypeMetadatas]) => {
    const { categoryFolder } = documentTypeMetadatas;
    const filePathPattern = BLOG_POSTS_FOLDER + '/' + categoryFolder + `/**/*.${EXT}`;
    acc.push(
      defineDocumentType(
        () =>
          /* v8 ignore start */
          ({
            name: name as keyof typeof documentsTypesMetadatas,
            filePathPattern,
            computedFields,
            contentType,
            fields
          }) as const satisfies AtomicContentlayerDocumentConfig
        /* v8 ignore stop */
      )
    );
    return acc;
  },
  [defineDocumentType(() => BLOG_POST_SCHEMA_CONFIG)]
);

export const categoriesBlogDataAssoc = blogDataAssocBuilder(documentsTypesMetadatas);

export default blogDocumentTypes;
