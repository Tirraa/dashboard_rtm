import type { DocumentContentType } from 'contentlayer/source-files';
import type {
  ComputedFieldsAsFieldsRecord,
  ContentLayerDocumentsConfigType,
  DocumentsComputedFields,
  DocumentsFields,
  MakeDocumentsBaseFieldsSumType,
  MakeDocumentsTypesSumType,
  MakeTypeField,
  OptionalField,
  RequiredField
} from './contentlayerConfig';

export type BaseFields = {
  title: MakeTypeField<'string'> & RequiredField;
  description: MakeTypeField<'string'> & OptionalField;
  metadescription: MakeTypeField<'string'> & RequiredField;
  date: MakeTypeField<'date'> & RequiredField;
  url: MakeTypeField<'string'> & RequiredField;
};

export const DOCUMENTS_CONTENT_TYPE: DocumentContentType = 'mdx';
export const DOCUMENTS_CONTENT_EXTENSION = 'mdx';

export const DOCUMENTS_FIELDS = {
  title: { type: 'string', required: true },
  metadescription: { type: 'string', required: true },
  description: { type: 'string', required: false },
  date: { type: 'date', required: true }
} as const satisfies DocumentsFields;

export const DOCUMENTS_COMPUTED_FIELDS = {
  url: { type: 'string', resolve: (post: any) => `/${post._raw.flattenedPath}` }
} as const satisfies DocumentsComputedFields;

const DOCUMENTS_COMPUTED_FIELDS_AS_FIELDS = {
  url: { type: 'string', required: true }
} as const satisfies ComputedFieldsAsFieldsRecord;

export const POST_SCHEMA_CONFIG: ContentLayerDocumentsConfigType = {
  name: 'PostSchema',
  filePathPattern: '',
  contentType: DOCUMENTS_CONTENT_EXTENSION,
  fields: {
    ...DOCUMENTS_FIELDS,
    ...DOCUMENTS_COMPUTED_FIELDS_AS_FIELDS
  }
} as const;

export type DocumentsComputedFieldsKey = MakeDocumentsBaseFieldsSumType<'url'>;
export type DocumentsTypesKey = MakeDocumentsTypesSumType<'PatchPost' | 'PatchPostBis'>;
