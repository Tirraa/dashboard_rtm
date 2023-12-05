import type { ComputedFields, DocumentContentType, FieldDefs } from 'contentlayer/source-files';
import {
  buildBlogPostCategory,
  buildBlogPostLanguageFlag,
  buildBlogPostSlug,
  buildBlogPostSubcategory,
  buildBlogPostUrl
} from '../../lib/blog/builders/computedFields';
import type {
  ContentLayerDocumentsConfigType,
  DocumentsFields,
  MakeAllFields,
  MakeComputedFields,
  MakeDocumentsAllFieldsSumType,
  MakeDocumentsTypesSumType,
  MakeFields,
  PostSchemaKey,
  PostToBuild
} from '../../types/magic/ContentlayerConfig';

export const BLOG_POSTS_FOLDER = 'posts';
export const BLOG_DOCUMENTS_CONTENT_TYPE: DocumentContentType = 'mdx';
export const BLOG_DOCUMENTS_CONTENT_EXTENSION = 'mdx';

const _ALL_BLOG_FIELDS = {
  title: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: false
  },
  metadescription: {
    type: 'string',
    required: true
  },
  date: {
    type: 'date',
    required: true
  },
  url: {
    type: 'string',
    required: true
  },
  category: {
    type: 'string',
    required: true
  },
  subcategory: {
    type: 'string',
    required: true
  },
  slug: {
    type: 'string',
    required: true
  },
  language: {
    type: 'string',
    required: true
  }
} as const satisfies FieldDefs;

export const BLOG_DOCUMENTS_COMPUTED_FIELDS = {
  url: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostUrl(post) },
  language: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostLanguageFlag(post) },
  category: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostCategory(post) },
  subcategory: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostSubcategory(post) },
  slug: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostSlug(post) }
} as const satisfies Partial<Record<keyof _AllBlogFields, unknown>> satisfies ComputedFields;

export const BLOG_DOCUMENTS_FIELDS = {
  title: { type: 'string', required: true },
  metadescription: { type: 'string', required: true },
  description: { type: 'string', required: false },
  date: { type: 'date', required: true }
} as const satisfies DocumentsFields;

export const BLOG_POST_SCHEMA_CONFIG: ContentLayerDocumentsConfigType<PostSchemaKey> = {
  name: 'PostSchema',
  filePathPattern: '',
  contentType: BLOG_DOCUMENTS_CONTENT_EXTENSION,
  fields: _ALL_BLOG_FIELDS
} as const;

type _AllBlogFields = typeof _ALL_BLOG_FIELDS;
type _BlogComputedFields = typeof BLOG_DOCUMENTS_COMPUTED_FIELDS;
type _BlogFields = typeof BLOG_DOCUMENTS_FIELDS;

export type BlogDocumentsTypesKeys = MakeDocumentsTypesSumType<'PatchPost' | 'PatchPostBis'>;
export type AllBlogFields = MakeAllFields<_AllBlogFields>;
export type BlogFields = MakeFields<_BlogFields>;
export type BlogComputedFields = MakeComputedFields<_BlogComputedFields>;
export type BlogDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _BlogComputedFields>;