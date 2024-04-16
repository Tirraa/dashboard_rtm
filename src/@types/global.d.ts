// {ToDo} Wait for the Pagefind release which will provide importable types

// https://github.com/CloudCannon/pagefind/blob/production-docs/pagefind_web_js/types/index.d.ts
type PagefindIndexOptions = {
  ranking?: PagefindRankingWeights;
  highlightParam?: string;
  excerptLength?: number;
  indexWeight?: number;
  mergeFilter?: object;
  basePath?: string;
  language?: string;
  primary?: boolean;
  baseUrl?: string;
};

type PagefindRankingWeights = {
  termSimilarity?: number;
  termSaturation?: number;
  termFrequency?: number;
  pageLength?: number;
};

type PagefindSearchOptions = {
  preload?: boolean;
  verbose?: boolean;
  filters?: object;
  sort?: object;
};

type PagefindFilterCounts = Record<string, Record<string, number>>;

type PagefindSearchResults = {
  timings: {
    preload: number;
    search: number;
    total: number;
  };
  totalFilters: PagefindFilterCounts;
  results: PagefindSearchResult[];
  unfilteredResultCount: number;
  filters: PagefindFilterCounts;
};

type PagefindSearchResult = {
  data: () => Promise<PagefindSearchFragment>;
  words: number[];
  score: number;
  id: string;
};

type PagefindSearchFragment = {
  weighted_locations: PagefindWordLocation[];
  filters: Record<string, string[]>;
  sub_results: PagefindSubResult[];
  anchors: PagefindSearchAnchor[];
  meta: Record<string, string>;
  raw_content?: string;
  locations: number[];
  word_count: number;
  raw_url?: string;
  content: string;
  excerpt: string;
  url: string;
};

type PagefindSubResult = {
  weighted_locations: PagefindWordLocation[];
  anchor?: PagefindSearchAnchor;
  locations: number[];
  excerpt: string;
  title: string;
  url: string;
};

type PagefindWordLocation = {
  balanced_score: number;
  location: number;
  weight: number;
};

type PagefindSearchAnchor = {
  location: number;
  element: string;
  text?: string;
  id: string;
};

interface Window {
  pagefind: {
    search: (req: string, opts?: PagefindSearchOptions) => Promise<PagefindSearchResults>;
    debouncedSearch: (req: string, opts?: object) => Promise<PagefindSearchResults>;
    preload: (req: string, opts?: object) => Promise<void>;
    destroy: () => Promise<void>;
    init: () => Promise<void>;
    isBroken?: boolean;
  };
}
