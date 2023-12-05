import type { Document, FieldDefType } from 'contentlayer/core';
import type { ComputedFields, DocumentContentType, FieldDefs } from 'contentlayer/source-files';
import type {
  AllBlogFields,
  BlogComputedFields,
  BlogDocumentsComputedFieldsKeys,
  BlogDocumentsTypesKeys,
  BlogFields
} from '../../config/blog/contentlayerConfigTweakers';

type ContentLayerContentType = { contentType: DocumentContentType };

type FilePathPattern = string;
export type TypeName = BlogDocumentsTypesKeys;

export type DocumentsConfigTypeContentLayerMetadatas<TYPENAME extends string> = {
  name: TYPENAME;
  filePathPattern: FilePathPattern;
};

export type DocumentsConfigType<
  __Fields extends DocumentsFields = BlogFields,
  __ComputedFields extends ComputedFields = BlogComputedFields,
  __TypeName extends string = TypeName
> = DocumentsConfigTypeContentLayerMetadatas<__TypeName> & {
  fields: __Fields;
  computedFields: __ComputedFields;
};

export type DocumentsFields<
  __AllFields extends Record<string, unknown> & FieldDefs = AllBlogFields,
  __DocumentsComputedFieldsKeys extends keyof __AllFields = BlogDocumentsComputedFieldsKeys
> = Omit<__AllFields, __DocumentsComputedFieldsKeys>;

export type AtomicDocumentConfig = DocumentsConfigType;
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
  type: FieldDefType;
  resolve: (post: PostToBuild) => unknown;
};
