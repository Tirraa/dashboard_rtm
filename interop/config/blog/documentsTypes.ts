import type { DocumentType, DocumentTypeDef } from 'contentlayer/source-files';
import blogDataAssocBuilder from '../../lib/blog/builders/blogDataAssoc';
import {
  DOCUMENTS_CONTENT_EXTENSION as EXT,
  POST_SCHEMA_CONFIG,
  DOCUMENTS_COMPUTED_FIELDS as computedFields,
  DOCUMENTS_CONTENT_TYPE as contentType,
  DOCUMENTS_FIELDS as fields
} from '../../types/contentlayerConfigTweakers';
import type { AtomicContentLayerDocumentConfig, DocumentsTypesMetadatas } from '../../types/hell/contentlayerConfig';

const documentsTypesMetadatas: DocumentsTypesMetadatas = {
  PatchPost: {
    name: 'PatchPost',
    categoryFolder: 'patch-notes'
  },
  PatchPostBis: {
    name: 'PatchPostBis',
    categoryFolder: 'patch-notes-bis'
  }
} as const;

const defineDocumentType = (def: () => DocumentTypeDef<string>) =>
  ({
    type: 'document',
    def
  }) as const;

export const documentTypes: DocumentType[] = Object.values(documentsTypesMetadatas).reduce(
  (acc, documentTypeMetadatas) => {
    const { name, categoryFolder } = documentTypeMetadatas;
    const filePathPattern = categoryFolder + `/**/*.${EXT}`;
    acc.push(
      defineDocumentType(() => ({ name, filePathPattern, contentType, fields, computedFields }) as const satisfies AtomicContentLayerDocumentConfig)
    );
    return acc;
  },
  [defineDocumentType(() => POST_SCHEMA_CONFIG)]
);

export const categoriesBlogDataAssoc = blogDataAssocBuilder(documentsTypesMetadatas);
