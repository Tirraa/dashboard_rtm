import type { ComputedFields, DocumentContentType, FieldDefs } from 'contentlayer/source-files';
import {
  buildBlogPostCategory,
  buildBlogPostLanguageFlag,
  buildBlogPostSlug,
  buildBlogPostSubcategory,
  buildBlogPostUrl
} from '../lib/blog/builders/computedFields';
import type {
  ComputedFieldsAsFieldsRecord,
  ContentLayerDocumentsConfigType,
  DocumentsComputedFields,
  DocumentsFields,
  MakeBaseFields,
  MakeDocumentsBaseFieldsSumType,
  MakeDocumentsTypesSumType,
  PostToBuild
} from './magic/ContentlayerConfig';

export const POSTS_FOLDER = 'posts';
export const DOCUMENTS_CONTENT_TYPE: DocumentContentType = 'mdx';
export const DOCUMENTS_CONTENT_EXTENSION = 'mdx';

const _BASE_FIELDS = {
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

const _DOCUMENTS_COMPUTED_FIELDS = {
  url: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostUrl(post) },
  category: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostCategory(post) },
  subcategory: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostSubcategory(post) },
  slug: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostSlug(post) },
  language: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostLanguageFlag(post) }
} as const satisfies Partial<Record<keyof typeof _BASE_FIELDS, unknown>> satisfies ComputedFields;

export const DOCUMENTS_COMPUTED_FIELDS = _DOCUMENTS_COMPUTED_FIELDS satisfies DocumentsComputedFields;

export const DOCUMENTS_FIELDS = {
  title: { type: 'string', required: true },
  metadescription: { type: 'string', required: true },
  description: { type: 'string', required: false },
  date: { type: 'date', required: true }
} as const satisfies DocumentsFields;

const DOCUMENTS_COMPUTED_FIELDS_AS_FIELDS = {
  url: { type: 'string', required: true },
  category: { type: 'string', required: true },
  subcategory: { type: 'string', required: true },
  slug: { type: 'string', required: true },
  language: { type: 'string', required: true }
} as const satisfies ComputedFieldsAsFieldsRecord;

// * ... VSCode may raise an error on "POST_SCHEMA_CONFIG". It's a false positive.
export const POST_SCHEMA_CONFIG: ContentLayerDocumentsConfigType = {
  name: 'PostSchema',
  filePathPattern: '',
  contentType: DOCUMENTS_CONTENT_EXTENSION,
  fields: {
    ...DOCUMENTS_FIELDS,
    ...DOCUMENTS_COMPUTED_FIELDS_AS_FIELDS
  }
} as const;

export type DocumentsTypesKey = MakeDocumentsTypesSumType<'PatchPost' | 'PatchPostBis'>;

export type BaseFields = MakeBaseFields<typeof _BASE_FIELDS>;

export type DocumentsComputedFieldsKey = MakeDocumentsBaseFieldsSumType<keyof typeof _DOCUMENTS_COMPUTED_FIELDS>;
