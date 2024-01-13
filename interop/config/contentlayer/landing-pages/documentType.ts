import type { DocumentType } from 'contentlayer/source-files';

import {
  LANDING_PAGES_DOCUMENTS_COMPUTED_FIELDS as computedFields,
  LANDING_PAGES_DOCUMENT_TYPE_NAME as name,
  LANDING_PAGES_DOCUMENTS_FIELDS as fields,
  DOCUMENTS_CONTENT_TYPE as contentType,
  DOCUMENTS_CONTENT_EXTENSION as EXT,
  LANDING_PAGES_FOLDER
} from '../contentlayerConfigTweakers';
import { defineDocumentType } from '../adapters';

const filePathPattern = LANDING_PAGES_FOLDER + `/**/*.${EXT}`;

const landingPagesDocumentType: DocumentType = defineDocumentType(() => ({ filePathPattern, computedFields, contentType, fields, name }) as const);

export default landingPagesDocumentType;
