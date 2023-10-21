import { DocumentType, defineDocumentType, makeSource } from 'contentlayer/source-files';
import { AtomicDocumentConfig, DocumentsTypesMetadatas } from 'types/contentlayerConfig';
import { POST_SCHEMA_CONFIG, DOCUMENTS_COMPUTED_FIELDS as computedFields, DOCUMENTS_FIELDS as fields } from './types/contentlayerConfigTweakers';
import { validateContentLayerConfig } from './validators/contentLayer';

const contentDirPath = 'posts';

const documentsTypesMetadatas: DocumentsTypesMetadatas = {
  PatchPost: {
    name: 'PatchPost',
    filePathPattern: '**/patch-notes/**/*.md'
  },
  PatchPostBis: {
    name: 'PatchPostBis',
    filePathPattern: '**/patch-notes-bis/**/*.md'
  }
} as const;

const documentTypes: DocumentType<string>[] = Object.values(documentsTypesMetadatas).reduce(
  (acc, documentTypeMetadatas) => {
    const { name, filePathPattern } = documentTypeMetadatas;
    acc.push(defineDocumentType(() => ({ name, filePathPattern, fields, computedFields } as const satisfies AtomicDocumentConfig)));
    return acc;
  },
  [defineDocumentType(() => POST_SCHEMA_CONFIG)]
);

validateContentLayerConfig(documentTypes);
export default makeSource({ contentDirPath, documentTypes });
