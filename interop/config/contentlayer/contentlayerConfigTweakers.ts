import type {
  ContentLayerDocumentsConfigType,
  MakeDocumentsAllFieldsSumType,
  MakeDocumentsTypesSumType,
  MakeComputedFields,
  DocumentsFields,
  ComputedField,
  MakeAllFields,
  MakeFields,
  TypeName
} from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentContentType, ComputedFields, FieldDefs } from 'contentlayer/source-files';

import {
  buildLandingPageLanguageFlag,
  buildBlogPostLanguageFlag,
  buildLandingPageCategory,
  buildBlogPostSubcategory,
  buildBlogPostCategory,
  buildLandingPageSlug,
  buildLandingPageUrl,
  buildBlogPostSlug,
  buildBlogPostUrl
} from '../../lib/builders';

export const BLOG_POSTS_FOLDER = 'blog';
export const LANDING_PAGES_FOLDER = 'landing-pages';
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

/* v8 ignore start */
// Stryker disable all
export const BLOG_DOCUMENTS_COMPUTED_FIELDS = {
  subcategory: { resolve: (post) => buildBlogPostSubcategory(post), type: 'string' },
  language: { resolve: (post) => buildBlogPostLanguageFlag(post), type: 'string' },
  category: { resolve: (post) => buildBlogPostCategory(post), type: 'string' },
  slug: { resolve: (post) => buildBlogPostSlug(post), type: 'string' },
  url: { resolve: (post) => buildBlogPostUrl(post), type: 'string' }
} as const satisfies Partial<Record<keyof _AllBlogFields, ComputedField>> satisfies ComputedFields;
// Stryker restore all
/* v8 ignore stop */

export const BLOG_DOCUMENTS_FIELDS = {
  draft: { type: 'boolean', required: false, default: false },
  metadescription: { type: 'string', required: true },
  description: { required: false, type: 'string' },
  title: { type: 'string', required: true },
  date: { required: true, type: 'date' }
} as const satisfies DocumentsFields;

export const BLOG_POST_SCHEMA_CONFIG: ContentLayerDocumentsConfigType<PostSchemaKey> = {
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
} as const satisfies ComputedFields;
// Stryker restore all
/* v8 ignore stop */

export const LANDING_PAGES_DOCUMENTS_FIELDS = {
  draft: { type: 'boolean', required: false, default: false },
  metadescription: { type: 'string', required: true },
  title: { type: 'string', required: true }
} as const;

type _AllBlogFields = typeof _ALL_BLOG_FIELDS;
type _BlogComputedFields = typeof BLOG_DOCUMENTS_COMPUTED_FIELDS;
type _BlogFields = typeof BLOG_DOCUMENTS_FIELDS;

export type BlogDocumentsTypesKeys = MakeDocumentsTypesSumType<'PatchPostBis' | 'TestingPost' | 'PatchPost'>;
export type AllBlogFields = MakeAllFields<_AllBlogFields>;
export type BlogFields = MakeFields<_BlogFields>;
export type BlogComputedFields = MakeComputedFields<_BlogComputedFields>;
export type BlogDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _BlogComputedFields>;

type PostSchemaKey = 'PostSchema';

export type BlogDocumentsTypesMetadatas = Record<BlogDocumentsTypesKeys, BlogDocumentsConfigTypeMetadatas<BlogDocumentsTypesKeys>>;

type BlogDocumentsConfigTypeMetadatas<TYPENAME extends TypeName = TypeName> = {
  categoryFolder: CategoryFolder;
  name: TYPENAME;
};
type CategoryFolder = string;
