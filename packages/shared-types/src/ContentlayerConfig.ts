/* v8 ignore start */
// Stryker disable all
//!\ TESTED VIA JEST-TSD
import type {
  BlogDocumentsComputedFieldsKeys,
  BlogDocumentsTypesKeys,
  BlogComputedFields,
  AllBlogFields,
  BlogFields
} from '##/config/blog/contentlayerConfigTweakers';
import type { DocumentContentType, ComputedFields, FieldDefs } from 'contentlayer/source-files';
import type { FieldDefType, Document } from 'contentlayer/core';

type ContentLayerContentType = { contentType: DocumentContentType };

type FilePathPattern = string;
export type TypeName = BlogDocumentsTypesKeys;

export type DocumentsConfigTypeContentLayerMetadatas<TYPENAME extends string> = {
  filePathPattern: FilePathPattern;
  name: TYPENAME;
};

export type DocumentsConfigType<
  __Fields extends DocumentsFields = BlogFields,
  __ComputedFields extends ComputedFields = BlogComputedFields,
  __TypeName extends string = TypeName
> = DocumentsConfigTypeContentLayerMetadatas<__TypeName> & {
  computedFields: __ComputedFields;
  fields: __Fields;
};

export type DocumentsFields<
  __AllFields extends Record<string, unknown> & FieldDefs = AllBlogFields,
  __DocumentsComputedFieldsKeys extends keyof __AllFields = BlogDocumentsComputedFieldsKeys
> = Omit<__AllFields, __DocumentsComputedFieldsKeys>;

type AtomicDocumentConfig = DocumentsConfigType;
export type AtomicContentLayerDocumentConfig = AtomicDocumentConfig & ContentLayerContentType;
export type ContentLayerDocumentsConfigType<__TypeName extends string = TypeName, __AllBlogFields extends FieldDefs = AllBlogFields> = {
  fields: __AllBlogFields;
} & ContentLayerContentType &
  DocumentsConfigTypeContentLayerMetadatas<__TypeName>;

export type MakeDocumentsTypesSumType<T extends string> = T;
export type MakeComputedFields<T extends ComputedFields> = T;
export type MakeAllFields<T extends FieldDefs> = T;

export type MakeDocumentsAllFieldsSumType<T extends keyof __AllFields, __AllFields extends FieldDefs = AllBlogFields> = T;

export type MakeFields<
  T extends DocumentsFields<__AllFields, __DocumentsComputedFieldsKeys>,
  __AllFields extends Record<string, unknown> & FieldDefs = AllBlogFields,
  __DocumentsComputedFieldsKeys extends keyof __AllFields = BlogDocumentsComputedFieldsKeys
> = T;

export type PostToBuild = Document;

// * ... Adapter
export type ComputedField = {
  resolve: (post: PostToBuild) => unknown;
  type: FieldDefType;
};
// Stryker restore all
/* v8 ignore stop */
