import type {
  BlogDocumentsConfigTypeMetadatas,
  ContentlayerDocumentsConfigType,
  MakeDocumentsAllFieldsSumType,
  ComputedFieldsArtifact,
  DocumentsFields
} from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentContentType, ComputedFields, FieldDefs } from 'contentlayer/source-files';

import {
  buildLandingPageLanguageFlag,
  buildBlogPostLanguageFlag,
  buildBlogPostSubcategory,
  buildLandingPageCategory,
  buildBlogPostHeadings,
  buildBlogPostCategory,
  buildPageLanguageFlag,
  buildLandingPageSlug,
  buildBlogTagsIndexes,
  buildLandingPageUrl,
  buildBlogPostSlug,
  buildBlogPostUrl,
  buildPageRoot,
  buildPagePath,
  buildPageUrl
} from '../../lib/builders';
import { indexedBlogTagOptions } from './blog/blogTagsMetadatas';
import { blogTagOptions } from './blog/blogTags';
import { authorNames } from './blog/authors';
import SEO from './nested-types/SEO';

export const PAGES_FOLDER = 'pages';
export const BLOG_POSTS_FOLDER = 'blog';
export const LANDING_PAGES_FOLDER = 'landing-pages';
export const PAGES_DOCUMENT_TYPE_NAME = 'Page';
export const LANDING_PAGES_DOCUMENT_TYPE_NAME = 'LandingPage';
export const DOCUMENTS_CONTENT_TYPE: DocumentContentType = 'mdx';
export const DOCUMENTS_CONTENT_EXTENSION = 'mdx';

const _ALL_BLOG_FIELDS = {
  tags: {
    of: {
      options: blogTagOptions,
      type: 'enum'
    },
    required: false,
    type: 'list',
    default: []
  },

  authors: {
    of: {
      options: authorNames,
      type: 'enum'
    },
    required: false,
    type: 'list'
  },

  tagsIndexes: {
    of: {
      type: 'number'
    },
    required: true,
    type: 'list'
  },

  headings: {
    of: {
      type: 'json'
    },
    type: 'list',
    default: []
  },

  draft: {
    type: 'boolean',
    required: false,
    default: false
  },

  featuredPictureUrl: {
    required: false,
    type: 'string'
  },

  metadescription: {
    type: 'string',
    required: true
  },

  description: {
    required: false,
    type: 'string'
  },

  subcategory: {
    type: 'string',
    required: true
  },

  category: {
    type: 'string',
    required: true
  },

  language: {
    type: 'string',
    required: true
  },

  title: {
    type: 'string',
    required: true
  },

  slug: {
    type: 'string',
    required: true
  },

  url: {
    type: 'string',
    required: true
  },

  seo: { required: false, type: 'nested', of: SEO },

  date: {
    required: true,
    type: 'date'
  }
} as const satisfies FieldDefs;

const _ALL_LANDING_PAGES_FIELDS = {
  doNotExcludeFromLocalSearch: {
    type: 'boolean',
    required: false,
    default: false
  },

  draft: {
    type: 'boolean',
    required: false,
    default: false
  },

  metadescription: {
    type: 'string',
    required: true
  },

  language: {
    type: 'string',
    required: true
  },

  category: {
    type: 'string',
    required: true
  },

  title: {
    type: 'string',
    required: true
  },

  slug: {
    type: 'string',
    required: true
  },

  seo: { required: false, type: 'nested', of: SEO },

  url: {
    type: 'string',
    required: true
  }
} as const satisfies FieldDefs;

const _ALL_PAGES_FIELDS = {
  draft: {
    type: 'boolean',
    required: false,
    default: false
  },

  metadescription: {
    type: 'string',
    required: true
  },

  language: {
    type: 'string',
    required: true
  },

  title: {
    type: 'string',
    required: true
  },

  path: {
    type: 'string',
    required: true
  },

  root: {
    type: 'string',
    required: true
  },

  seo: { required: false, type: 'nested', of: SEO },

  url: {
    type: 'string',
    required: true
  }
} as const satisfies FieldDefs;

/* v8 ignore start */
// Stryker disable all

export const BLOG_DOCUMENTS_COMPUTED_FIELDS = {
  tagsIndexes: { resolve: (post) => buildBlogTagsIndexes(post, indexedBlogTagOptions, blogTagOptions), type: _ALL_BLOG_FIELDS.tagsIndexes.type },
  subcategory: { resolve: (post) => buildBlogPostSubcategory(post), type: _ALL_BLOG_FIELDS.subcategory.type },
  language: { resolve: (post) => buildBlogPostLanguageFlag(post), type: _ALL_BLOG_FIELDS.language.type },
  category: { resolve: (post) => buildBlogPostCategory(post), type: _ALL_BLOG_FIELDS.category.type },
  headings: { resolve: (post) => buildBlogPostHeadings(post), type: _ALL_BLOG_FIELDS.headings.type },
  slug: { resolve: (post) => buildBlogPostSlug(post), type: _ALL_BLOG_FIELDS.slug.type },
  url: { resolve: (post) => buildBlogPostUrl(post), type: _ALL_BLOG_FIELDS.url.type }
} as const satisfies ComputedFieldsArtifact<_AllBlogFields> satisfies ComputedFields;

// Stryker restore all
/* v8 ignore stop */

export const BLOG_DOCUMENTS_FIELDS = {
  featuredPictureUrl: _ALL_BLOG_FIELDS.featuredPictureUrl,
  metadescription: _ALL_BLOG_FIELDS.metadescription,
  description: _ALL_BLOG_FIELDS.description,
  authors: _ALL_BLOG_FIELDS.authors,
  draft: _ALL_BLOG_FIELDS.draft,
  title: _ALL_BLOG_FIELDS.title,
  tags: _ALL_BLOG_FIELDS.tags,
  date: _ALL_BLOG_FIELDS.date,
  seo: _ALL_BLOG_FIELDS.seo
} as const satisfies DocumentsFields<_AllBlogFields, _BlogDocumentsComputedFieldsKeys>;

export const BLOG_POST_SCHEMA_CONFIG: ContentlayerDocumentsConfigType<BlogPostSchemaKey> = {
  contentType: DOCUMENTS_CONTENT_EXTENSION,
  fields: _ALL_BLOG_FIELDS,
  name: 'BlogPostSchema',
  filePathPattern: ''
} as const;

/* v8 ignore start */
// Stryker disable all

export const LANDING_PAGES_DOCUMENTS_COMPUTED_FIELDS = {
  language: { resolve: (lp) => buildLandingPageLanguageFlag(lp), type: _ALL_LANDING_PAGES_FIELDS.language.type },
  category: { resolve: (lp) => buildLandingPageCategory(lp), type: _ALL_LANDING_PAGES_FIELDS.category.type },
  slug: { resolve: (lp) => buildLandingPageSlug(lp), type: _ALL_LANDING_PAGES_FIELDS.slug.type },
  url: { resolve: (lp) => buildLandingPageUrl(lp), type: _ALL_LANDING_PAGES_FIELDS.url.type }
} as const satisfies ComputedFieldsArtifact<_AllLandingPagesFields> satisfies ComputedFields;

// Stryker restore all
/* v8 ignore stop */

export const LANDING_PAGES_DOCUMENTS_FIELDS = {
  doNotExcludeFromLocalSearch: _ALL_LANDING_PAGES_FIELDS.doNotExcludeFromLocalSearch,
  metadescription: _ALL_LANDING_PAGES_FIELDS.metadescription,
  draft: _ALL_LANDING_PAGES_FIELDS.draft,
  title: _ALL_LANDING_PAGES_FIELDS.title,
  seo: _ALL_LANDING_PAGES_FIELDS.seo
} as const satisfies DocumentsFields<_AllLandingPagesFields, _LandingPagesDocumentsComputedFieldsKeys>;

/* v8 ignore start */
// Stryker disable all

export const PAGES_DOCUMENTS_COMPUTED_FIELDS = {
  language: { resolve: (page) => buildPageLanguageFlag(page), type: _ALL_PAGES_FIELDS.language.type },
  path: { resolve: (page) => buildPagePath(page), type: _ALL_PAGES_FIELDS.path.type },
  root: { resolve: (page) => buildPageRoot(page), type: _ALL_PAGES_FIELDS.root.type },
  url: { resolve: (page) => buildPageUrl(page), type: _ALL_PAGES_FIELDS.url.type }
} as const satisfies ComputedFieldsArtifact<_AllPagesFields> satisfies ComputedFields;

// Stryker restore all
/* v8 ignore stop */

export const PAGES_DOCUMENTS_FIELDS = {
  metadescription: _ALL_PAGES_FIELDS.metadescription,
  draft: _ALL_PAGES_FIELDS.draft,
  title: _ALL_PAGES_FIELDS.title,
  seo: _ALL_PAGES_FIELDS.seo
} as const satisfies DocumentsFields<_AllPagesFields, _PagesDocumentsComputedFieldsKeys>;

type BlogPostSchemaKey = 'BlogPostSchema';

export type BlogDocumentsTypesKeys = 'PatchPostBis' | 'TestingPost' | 'PatchPost';
export type BlogDocumentsTypesMetadatas = Record<BlogDocumentsTypesKeys, BlogDocumentsConfigTypeMetadatas>;

type _AllBlogFields = typeof _ALL_BLOG_FIELDS;
type _AllPagesFields = typeof _ALL_PAGES_FIELDS;
type _AllLandingPagesFields = typeof _ALL_LANDING_PAGES_FIELDS;
type _BlogComputedFields = typeof BLOG_DOCUMENTS_COMPUTED_FIELDS;
type _PagesComputedFields = typeof PAGES_DOCUMENTS_COMPUTED_FIELDS;
type _LandingPagesComputedFields = typeof LANDING_PAGES_DOCUMENTS_COMPUTED_FIELDS;
type _BlogDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _BlogComputedFields, _AllBlogFields>;
type _PagesDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _PagesComputedFields, _AllPagesFields>;
type _LandingPagesDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _LandingPagesComputedFields, _AllLandingPagesFields>;

export const badlyTypedBlogHeadings = 'headings' as const satisfies keyof typeof _ALL_BLOG_FIELDS;
