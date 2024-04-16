/* v8 ignore start */
// Stryker disable all

import type { Quantity } from '@rtm/shared-types/Numbers';

const DOCUMENT_TYPES = {
  LandingPage: 'LandingPage',
  BlogPost: 'BlogPost',
  Page: 'Page'
} as const;

type PagefindConfigType = {
  DEFAULT_MIN_REQ_LENGTH_TO_TRIGGER_PRELOAD: Quantity;
  DOCUMENT_TYPES: typeof DOCUMENT_TYPES;
  DOCUMENT_TYPE_FILTER_KEY: string;
};

const PAGEFIND_CONFIG: PagefindConfigType = {
  DEFAULT_MIN_REQ_LENGTH_TO_TRIGGER_PRELOAD: 3,
  DOCUMENT_TYPE_FILTER_KEY: 'documentType',
  DOCUMENT_TYPES
} as const;

export default PAGEFIND_CONFIG;

export type PagefindFilterDocumentType = keyof typeof PAGEFIND_CONFIG.DOCUMENT_TYPES;

// Stryker restore all
/* v8 ignore stop */
