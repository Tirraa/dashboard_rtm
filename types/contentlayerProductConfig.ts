import { DocumentConfigType, DocumentsBaseFieldsKeysCollection } from './contentlayerConfig';

export type BaseFields = {
  title: { type: 'string'; required: true };
  metadescription: { type: 'string'; required: true };
  description: { type: 'string'; required: false };
  date: { type: 'date'; required: true };
  url: { type: 'string'; required: true };
};

export const PHANTOM_POST_CONFIG: DocumentConfigType = {
  name: 'PhantomPost',
  filePathPattern: '',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    metadescription: { type: 'string', required: true },
    date: { type: 'date', required: true },
    url: { type: 'string', required: true }
  }
} as const;

export type DocumentsComputedFieldsSumType = DocumentsBaseFieldsKeysCollection<'url'>;
