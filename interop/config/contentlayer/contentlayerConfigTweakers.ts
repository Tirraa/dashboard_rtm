import type {
  BlogDocumentsConfigTypeMetadatas,
  ContentLayerDocumentsConfigType,
  MakeDocumentsAllFieldsSumType,
  ComputedFieldsArtifact,
  DocumentsFields,
  MakeFields
} from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentContentType, ComputedFields, FieldDefs } from 'contentlayer/source-files';

import {
  buildLandingPageLanguageFlag,
  buildBlogPostLanguageFlag,
  buildBlogPostSubcategory,
  buildLandingPageCategory,
  buildBlogPostCategory,
  buildPageLanguageFlag,
  buildLandingPageSlug,
  buildLandingPageUrl,
  buildBlogPostSlug,
  buildBlogPostUrl,
  buildPageRoot,
  buildPagePath,
  buildPageUrl
} from '../../lib/builders';

export const PAGES_FOLDER = 'pages';
export const BLOG_POSTS_FOLDER = 'blog';
export const LANDING_PAGES_FOLDER = 'landing-pages';
export const PAGES_DOCUMENT_TYPE_NAME = 'Page';
export const LANDING_PAGES_DOCUMENT_TYPE_NAME = 'LandingPage';
export const DOCUMENTS_CONTENT_TYPE: DocumentContentType = 'mdx';
export const DOCUMENTS_CONTENT_EXTENSION = 'mdx';

const _ALL_BLOG_FIELDS = {
  draft: {
    type: 'boolean',
    required: false,
    default: false
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
  date: {
    required: true,
    type: 'date'
  }
} as const satisfies FieldDefs;

const _ALL_LANDING_PAGES_FIELDS = {
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
  url: {
    type: 'string',
    required: true
  }
} as const satisfies FieldDefs;

/* v8 ignore start */
// Stryker disable all
export const BLOG_DOCUMENTS_COMPUTED_FIELDS = {
  subcategory: { resolve: (post) => buildBlogPostSubcategory(post), type: 'string' },
  language: { resolve: (post) => buildBlogPostLanguageFlag(post), type: 'string' },
  category: { resolve: (post) => buildBlogPostCategory(post), type: 'string' },
  slug: { resolve: (post) => buildBlogPostSlug(post), type: 'string' },
  url: { resolve: (post) => buildBlogPostUrl(post), type: 'string' }
} as const satisfies ComputedFieldsArtifact<AllBlogFields> satisfies ComputedFields;
// Stryker restore all
/* v8 ignore stop */

export const BLOG_DOCUMENTS_FIELDS = {
  draft: { type: 'boolean', required: false, default: false },
  metadescription: { type: 'string', required: true },
  description: { required: false, type: 'string' },
  title: { type: 'string', required: true },
  date: { required: true, type: 'date' }
} as const satisfies DocumentsFields;

export const BLOG_POST_SCHEMA_CONFIG: ContentLayerDocumentsConfigType<BlogPostSchemaKey> = {
  contentType: DOCUMENTS_CONTENT_EXTENSION,
  fields: _ALL_BLOG_FIELDS,
  filePathPattern: '',
  name: 'PostSchema'
} as const;

/* v8 ignore start */
// Stryker disable all
export const LANDING_PAGES_DOCUMENTS_COMPUTED_FIELDS = {
  language: { resolve: (lp) => buildLandingPageLanguageFlag(lp), type: 'string' },
  category: { resolve: (lp) => buildLandingPageCategory(lp), type: 'string' },
  slug: { resolve: (lp) => buildLandingPageSlug(lp), type: 'string' },
  url: { resolve: (lp) => buildLandingPageUrl(lp), type: 'string' }
} as const satisfies ComputedFieldsArtifact<_AllLandingPagesFields> satisfies ComputedFields;
// Stryker restore all
/* v8 ignore stop */

export const LANDING_PAGES_DOCUMENTS_FIELDS = {
  draft: { type: 'boolean', required: false, default: false },
  metadescription: { type: 'string', required: true },
  title: { type: 'string', required: true }
} as const satisfies DocumentsFields<_AllLandingPagesFields, _LandingPagesDocumentsComputedFieldsKeys>;

/* v8 ignore start */
// Stryker disable all
export const PAGES_DOCUMENTS_COMPUTED_FIELDS = {
  language: { resolve: (page) => buildPageLanguageFlag(page), type: 'string' },
  path: { resolve: (page) => buildPagePath(page), type: 'string' },
  root: { resolve: (page) => buildPageRoot(page), type: 'string' },
  url: { resolve: (page) => buildPageUrl(page), type: 'string' }
} as const satisfies ComputedFieldsArtifact<_AllPagesFields> satisfies ComputedFields;
// Stryker restore all
/* v8 ignore stop */

export const PAGES_DOCUMENTS_FIELDS = {
  draft: { type: 'boolean', required: false, default: false },
  metadescription: { type: 'string', required: true },
  title: { type: 'string', required: true }
} as const satisfies DocumentsFields<_AllPagesFields, _PagesDocumentsComputedFieldsKeys>;

export type BlogDocumentsTypesKeys = 'PatchPostBis' | 'TestingPost' | 'PatchPost';
type BlogPostSchemaKey = 'PostSchema';

type _BlogFields = typeof BLOG_DOCUMENTS_FIELDS;
type _AllPagesFields = typeof _ALL_PAGES_FIELDS;
type _AllLandingPagesFields = typeof _ALL_LANDING_PAGES_FIELDS;
type _PagesComputedFields = typeof PAGES_DOCUMENTS_COMPUTED_FIELDS;
type _LandingPagesComputedFields = typeof LANDING_PAGES_DOCUMENTS_COMPUTED_FIELDS;
type _PagesDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _PagesComputedFields, _AllPagesFields>;
type _LandingPagesDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _LandingPagesComputedFields, _AllLandingPagesFields>;
export type AllBlogFields = typeof _ALL_BLOG_FIELDS;
export type BlogFields = MakeFields<_BlogFields>;
export type BlogComputedFields = typeof BLOG_DOCUMENTS_COMPUTED_FIELDS;
export type BlogDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof BlogComputedFields>;
export type BlogDocumentsTypesMetadatas = Record<BlogDocumentsTypesKeys, BlogDocumentsConfigTypeMetadatas<BlogDocumentsTypesKeys>>;
