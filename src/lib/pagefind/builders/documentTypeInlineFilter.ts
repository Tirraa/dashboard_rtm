/* v8 ignore start */
// Stryker disable all

import type { PagefindFilterDocumentType } from '@/config/pagefind';

import PAGEFIND_CONFIG from '@/config/pagefind';

const documentTypeInlineFilter = (documentType: PagefindFilterDocumentType) => PAGEFIND_CONFIG.DOCUMENT_TYPE_FILTER_KEY + ':' + documentType;

export default documentTypeInlineFilter;

// Stryker restore all
/* v8 ignore stop */
