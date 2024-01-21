import type { DocumentType } from 'contentlayer/source-files';

import {
  PAGES_DOCUMENTS_COMPUTED_FIELDS as computedFields,
  DOCUMENTS_CONTENT_TYPE as contentType,
  DOCUMENTS_CONTENT_EXTENSION as EXT,
  PAGES_DOCUMENTS_FIELDS as fields,
  PAGES_DOCUMENT_TYPE_NAME as name,
  PAGES_FOLDER
} from '../contentlayerConfigTweakers';
import { defineDocumentType } from '../adapters';

const filePathPattern = PAGES_FOLDER + `/**/*.${EXT}`;

const pagesDocumentType: DocumentType = defineDocumentType(() => ({ filePathPattern, computedFields, contentType, fields, name }) as const);

export default pagesDocumentType;
