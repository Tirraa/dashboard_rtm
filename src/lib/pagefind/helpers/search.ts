/* v8 ignore start */
// Stryker disable all

import type { PagefindFilterDocumentType } from '@/config/pagefind';

import PAGEFIND_CONFIG from '@/config/pagefind';

export async function searchDocument(req: string, documentType: SearchDocumentFlag = 'All') {
  const handlers: Record<SearchDocumentFlag, (req: string) => Promise<PagefindSearchResults>> = {
    Page: async (req) =>
      await window.pagefind.search(req, {
        filters: {
          not: [
            {
              [PAGEFIND_CONFIG.DOCUMENT_TYPE_FILTER_KEY]: PAGEFIND_CONFIG.DOCUMENT_TYPES.BlogPost
            },
            {
              [PAGEFIND_CONFIG.DOCUMENT_TYPE_FILTER_KEY]: PAGEFIND_CONFIG.DOCUMENT_TYPES.LandingPage
            }
          ]
        }
      }),
    LandingPage: async (req) =>
      await window.pagefind.search(req, {
        filters: { [PAGEFIND_CONFIG.DOCUMENT_TYPE_FILTER_KEY]: PAGEFIND_CONFIG.DOCUMENT_TYPES.LandingPage }
      }),
    BlogPost: async (req) =>
      await window.pagefind.search(req, {
        filters: { [PAGEFIND_CONFIG.DOCUMENT_TYPE_FILTER_KEY]: PAGEFIND_CONFIG.DOCUMENT_TYPES.BlogPost }
      }),
    All: async (req) => await window.pagefind.search(req)
  };

  const results = await handlers[documentType](req);
  return results;
}

export type SearchDocumentFlag = PagefindFilterDocumentType | 'All';

// Stryker restore all
/* v8 ignore stop */
