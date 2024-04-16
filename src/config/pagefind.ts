/* v8 ignore start */
// Stryker disable all

import type { Quantity } from '@rtm/shared-types/Numbers';

import { FAKE_RESULTS } from './Workarounds/pagefind';

const DOCUMENT_TYPES = {
  LandingPage: 'LandingPage',
  BlogPost: 'BlogPost',
  Page: 'Page'
} as const;

type PagefindConfigType = {
  DEFAULT_MIN_REQ_LENGTH_TO_TRIGGER_PRELOAD: Quantity;
  DOCUMENT_TYPES: typeof DOCUMENT_TYPES;
  DOCUMENT_TYPE_FILTER_KEY: string;
  URL_UNWANTED_PREFIX: string;
  URL_UNWANTED_SUFFIX: string;
};

const PAGEFIND_CONFIG: PagefindConfigType = {
  DEFAULT_MIN_REQ_LENGTH_TO_TRIGGER_PRELOAD: 3,
  DOCUMENT_TYPE_FILTER_KEY: 'documentType',
  URL_UNWANTED_PREFIX: '/server/app',
  URL_UNWANTED_SUFFIX: '.html',
  DOCUMENT_TYPES
} as const;

const FAKE_EMPTY_PAGEFIND_RESULTS: PagefindSearchResults = {
  timings: {
    preload: -1,
    search: -1,
    total: -1
  },
  unfilteredResultCount: -1,
  totalFilters: {},
  results: [],
  filters: {}
};

const FAKE_PAGEFIND_RESULTS: PagefindSearchResults = {
  timings: {
    preload: -1,
    search: -1,
    total: -1
  },
  unfilteredResultCount: -1,
  results: FAKE_RESULTS,
  totalFilters: {},
  filters: {}
};

export const BROKEN_PAGEFIND_STUB: typeof window.pagefind = {
  // eslint-disable-next-line require-await
  debouncedSearch: async () => FAKE_EMPTY_PAGEFIND_RESULTS,
  // eslint-disable-next-line require-await
  search: async () => FAKE_EMPTY_PAGEFIND_RESULTS,
  // eslint-disable-next-line require-await
  destroy: async () => {},
  // eslint-disable-next-line require-await
  preload: async () => {},
  init: async () => {},
  isBroken: true
};

export const DEV_PAGEFIND_STUB: typeof window.pagefind = {
  // eslint-disable-next-line require-await
  debouncedSearch: async () => FAKE_PAGEFIND_RESULTS,
  // eslint-disable-next-line require-await
  search: async () => FAKE_PAGEFIND_RESULTS,
  destroy: async () => {},
  preload: async () => {},
  init: async () => {}
};

export default PAGEFIND_CONFIG;

export type PagefindFilterDocumentType = keyof typeof PAGEFIND_CONFIG.DOCUMENT_TYPES;

// Stryker restore all
/* v8 ignore stop */
