import type { AtomicContentLayerDocumentConfig } from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentType, DocumentTypeDef } from 'contentlayer/source-files';
import blogDataAssocBuilder from '../../lib/blog/builders/blogDataAssoc';
import type { BlogDocumentsTypesMetadatas } from './contentlayerConfigTweakers';
import {
  BLOG_POSTS_FOLDER,
  BLOG_POST_SCHEMA_CONFIG,
  BLOG_DOCUMENTS_CONTENT_EXTENSION as EXT,
  BLOG_DOCUMENTS_COMPUTED_FIELDS as computedFields,
  BLOG_DOCUMENTS_CONTENT_TYPE as contentType,
  BLOG_DOCUMENTS_FIELDS as fields
} from './contentlayerConfigTweakers';

const documentsTypesMetadatas: BlogDocumentsTypesMetadatas = {
  PatchPost: {
    name: 'PatchPost',
    categoryFolder: 'patch-notes'
  },
  PatchPostBis: {
    name: 'PatchPostBis',
    categoryFolder: 'patch-notes-bis'
  },
  TestingPost: {
    name: 'TestingPost',
    categoryFolder: 'testing'
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
    const { name, categoryFolder } = documentTypeMetadatas;
    const filePathPattern = BLOG_POSTS_FOLDER + '/' + categoryFolder + `/**/*.${EXT}`;
    acc.push(
      defineDocumentType(() => ({ name, filePathPattern, contentType, fields, computedFields }) as const satisfies AtomicContentLayerDocumentConfig)
    );
    return acc;
  },
  [defineDocumentType(() => BLOG_POST_SCHEMA_CONFIG)]
);

export const categoriesBlogDataAssoc = blogDataAssocBuilder(documentsTypesMetadatas);

export default blogDocumentTypes;
