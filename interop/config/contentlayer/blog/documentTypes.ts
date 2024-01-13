import type { AtomicContentLayerDocumentConfig } from '@rtm/shared-types/ContentlayerConfig';
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
  PatchPostBis: {
    categoryFolder: 'patch-notes-bis',
    name: 'PatchPostBis'
  },
  PatchPost: {
    categoryFolder: 'patch-notes',
    name: 'PatchPost'
  },
  TestingPost: {
    categoryFolder: 'testing',
    name: 'TestingPost'
  }
} as const;

const blogDocumentTypes: DocumentType[] = Object.values(documentsTypesMetadatas).reduce(
  (acc, documentTypeMetadatas) => {
    const { categoryFolder, name } = documentTypeMetadatas;
    const filePathPattern = BLOG_POSTS_FOLDER + '/' + categoryFolder + `/**/*.${EXT}`;
    acc.push(
      defineDocumentType(() => ({ filePathPattern, computedFields, contentType, fields, name }) as const satisfies AtomicContentLayerDocumentConfig)
    );
    return acc;
  },
  [defineDocumentType(() => BLOG_POST_SCHEMA_CONFIG)]
);

export const categoriesBlogDataAssoc = blogDataAssocBuilder(documentsTypesMetadatas);

export default blogDocumentTypes;
