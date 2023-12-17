import type { AtomicContentLayerDocumentConfig } from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentTypeDef, DocumentType } from 'contentlayer/source-files';

import type { BlogDocumentsTypesMetadatas } from './contentlayerConfigTweakers';

import {
  BLOG_DOCUMENTS_COMPUTED_FIELDS as computedFields,
  BLOG_DOCUMENTS_CONTENT_TYPE as contentType,
  BLOG_DOCUMENTS_CONTENT_EXTENSION as EXT,
  BLOG_DOCUMENTS_FIELDS as fields,
  BLOG_POST_SCHEMA_CONFIG,
  BLOG_POSTS_FOLDER
} from './contentlayerConfigTweakers';
import blogDataAssocBuilder from '../../lib/blog/builders/blogDataAssoc';

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

// * ... Adapter
const defineDocumentType = (def: () => DocumentTypeDef<string>) =>
  ({
    type: 'document',
    def
  }) as const;

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
