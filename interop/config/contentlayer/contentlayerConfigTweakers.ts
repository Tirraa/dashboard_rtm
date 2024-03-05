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
import { blogTagOptions } from './blog/blogTags';

export const PAGES_FOLDER = 'pages';
export const BLOG_POSTS_FOLDER = 'blog';
export const LANDING_PAGES_FOLDER = 'landing-pages';
export const PAGES_DOCUMENT_TYPE_NAME = 'Page';
export const LANDING_PAGES_DOCUMENT_TYPE_NAME = 'LandingPage';
export const DOCUMENTS_CONTENT_TYPE: DocumentContentType = 'mdx';
export const DOCUMENTS_CONTENT_EXTENSION = 'mdx';

const _ALL_BLOG_FIELDS = {
  sortedTags: {
    of: {
      options: blogTagOptions,
      type: 'enum'
    },
    required: false,
    type: 'list',
    default: []
  },
  tags: {
    of: {
      options: blogTagOptions,
      type: 'enum'
    },
    required: false,
    type: 'list',
    default: []
  },
  tagsIndexes: {
    of: {
      type: 'number'
    },
    required: true,
    type: 'list'
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
  subcategory: { resolve: (post) => buildBlogPostSubcategory(post), type: _ALL_BLOG_FIELDS.subcategory.type },
  sortedTags: { resolve: (post) => [...post.tags._array].sort(), type: _ALL_BLOG_FIELDS.sortedTags.type },
  tagsIndexes: { resolve: (post) => buildBlogTagsIndexes(post), type: _ALL_BLOG_FIELDS.tagsIndexes.type },
  language: { resolve: (post) => buildBlogPostLanguageFlag(post), type: _ALL_BLOG_FIELDS.language.type },
  category: { resolve: (post) => buildBlogPostCategory(post), type: _ALL_BLOG_FIELDS.category.type },
  slug: { resolve: (post) => buildBlogPostSlug(post), type: _ALL_BLOG_FIELDS.slug.type },
  url: { resolve: (post) => buildBlogPostUrl(post), type: _ALL_BLOG_FIELDS.url.type }
} as const satisfies ComputedFieldsArtifact<_AllBlogFields> satisfies ComputedFields;

// Stryker restore all
/* v8 ignore stop */

export const BLOG_DOCUMENTS_FIELDS = {
  metadescription: _ALL_BLOG_FIELDS.metadescription,
  description: _ALL_BLOG_FIELDS.description,
  draft: _ALL_BLOG_FIELDS.draft,
  title: _ALL_BLOG_FIELDS.title,
  tags: _ALL_BLOG_FIELDS.tags,
  date: _ALL_BLOG_FIELDS.date
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
  metadescription: _ALL_LANDING_PAGES_FIELDS.metadescription,
  draft: _ALL_LANDING_PAGES_FIELDS.draft,
  title: _ALL_LANDING_PAGES_FIELDS.title
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
  title: _ALL_PAGES_FIELDS.title
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
