import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { DocumentConfigType, DocumentsComputedFields, DocumentsFields, FilePathPattern } from 'types/contentlayerConfig';
import { DocumentsComputedFieldsSumType, PHANTOM_POST_CONFIG } from './types/contentlayerProductConfig';
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

const FILE_PATH_PATTERNS: Record<string, FilePathPattern> = {
  PatchPost: '**/patch-notes/**/*.md',
  PatchPostBis: '**/patch-notes-bis/**/*.md'
} as const;

const PhantomPost = defineDocumentType(() => PHANTOM_POST_CONFIG);

const PatchPost = defineDocumentType(
  () =>
    ({
      name: 'PatchPost',
      filePathPattern: FILE_PATH_PATTERNS.PatchPost,
      fields,
      computedFields
    }) satisfies DocumentConfigType<DocumentsComputedFieldsSumType>
);

const PatchPostBis = defineDocumentType(
  () =>
    ({
      name: 'PatchPostBis',
      filePathPattern: FILE_PATH_PATTERNS.PatchPostBis,
      fields,
      computedFields
    }) satisfies DocumentConfigType<DocumentsComputedFieldsSumType>
);

const documentTypes = [PhantomPost, PatchPost, PatchPostBis];

validateContentLayerConfig(documentTypes);
export default makeSource({ contentDirPath, documentTypes });
