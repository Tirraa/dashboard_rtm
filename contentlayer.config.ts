import { DocumentType, defineDocumentType, makeSource } from 'contentlayer/source-files';
import { AtomicDocumentConfig, DocumentsComputedFields, DocumentsFields, DocumentsTypesMetadatas } from 'types/contentlayerConfig';
import { POST_SCHEMA_CONFIG } from './types/contentlayerConfigTweakers';
import { validateContentLayerConfig } from './validators/contentLayer';

const contentDirPath = 'posts';

const fields = {
  title: { type: 'string', required: true },
  metadescription: { type: 'string', required: true },
  description: { type: 'string', required: false },
  date: { type: 'date', required: true }
} as const satisfies DocumentsFields;

const computedFields = {
  url: { type: 'string', resolve: (post: any) => `/${post._raw.flattenedPath}` }
} as const satisfies DocumentsComputedFields;

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
