import type { DocumentContentType } from 'contentlayer/source-files';
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
  MakeDocumentsBaseFieldsSumType,
  MakeDocumentsTypesSumType,
  MakeTypeField,
  OptionalField,
  PostToBuild,
  RequiredField
} from './magic/ContentlayerConfig';

export const POSTS_FOLDER = 'posts';
export const DOCUMENTS_CONTENT_TYPE: DocumentContentType = 'mdx';
export const DOCUMENTS_CONTENT_EXTENSION = 'mdx';

export type BaseFields = {
  title: MakeTypeField<'string'> & RequiredField;
  description: MakeTypeField<'string'> & OptionalField;
  metadescription: MakeTypeField<'string'> & RequiredField;
  date: MakeTypeField<'date'> & RequiredField;
  url: MakeTypeField<'string'> & RequiredField;
  category: MakeTypeField<'string'> & RequiredField;
  subcategory: MakeTypeField<'string'> & RequiredField;
  slug: MakeTypeField<'string'> & RequiredField;
  language: MakeTypeField<'string'> & RequiredField;
};

export const DOCUMENTS_FIELDS = {
  title: { type: 'string', required: true },
  metadescription: { type: 'string', required: true },
  description: { type: 'string', required: false },
  date: { type: 'date', required: true }
} as const satisfies DocumentsFields;

export const DOCUMENTS_COMPUTED_FIELDS = {
  url: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostUrl(post) },
  category: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostCategory(post) },
  subcategory: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostSubcategory(post) },
  slug: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostSlug(post) },
  language: { type: 'string', resolve: (post: PostToBuild) => buildBlogPostLanguageFlag(post) }
} as const satisfies DocumentsComputedFields;

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

export type DocumentsComputedFieldsKey = MakeDocumentsBaseFieldsSumType<'url' | 'category' | 'subcategory' | 'slug' | 'language'>;
export type DocumentsTypesKey = MakeDocumentsTypesSumType<'PatchPost' | 'PatchPostBis'>;
