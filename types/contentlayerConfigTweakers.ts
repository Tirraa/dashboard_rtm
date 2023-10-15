import { DocumentsConfigType, MakeDocumentsBaseFieldsSumType, MakeDocumentsTypesSumType } from './contentlayerConfig';

export type BaseFields = {
  title: { type: 'string'; required: true };
  description: { type: 'string'; required: false };
  metadescription: { type: 'string'; required: true };
  date: { type: 'date'; required: true };
  url: { type: 'string'; required: true };
};

export const POST_SCHEMA_CONFIG: DocumentsConfigType = {
  name: 'PostSchema',
  filePathPattern: '',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    metadescription: { type: 'string', required: true },
    date: { type: 'date', required: true },
    url: { type: 'string', required: true }
  }
} as const;

export type DocumentsComputedFieldsKey = MakeDocumentsBaseFieldsSumType<'url'>;
export type DocumentsTypesKey = MakeDocumentsTypesSumType<'PatchPost' | 'PatchPostBis'>;
