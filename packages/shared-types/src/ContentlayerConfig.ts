/* v8 ignore start */
// Stryker disable all
//!\ TESTED VIA JEST-TSD

import type {
  BlogDocumentsComputedFieldsKeys,
  BlogDocumentsTypesKeys,
  BlogComputedFields,
  AllBlogFields,
  BlogFields
} from '##/config/contentlayer/contentlayerConfigTweakers';
import type { DocumentContentType, ComputedFields, FieldDefs, FieldDef } from 'contentlayer/source-files';
import type { FieldDefType, Document } from 'contentlayer/core';

type ContentlayerContentType = { contentType: DocumentContentType };

type CategoryFolder = string;
type FilePathPattern = string;
export type TypeName = BlogDocumentsTypesKeys;

export type DocumentsConfigTypeContentlayerMetadatas<Name extends string> = {
  filePathPattern: FilePathPattern;
  name: Name;
};

export type DocumentsConfigType<
  __Fields extends DocumentsFields = BlogFields,
  __ComputedFields extends ComputedFields = BlogComputedFields,
  __TypeName extends string = TypeName
> = DocumentsConfigTypeContentlayerMetadatas<__TypeName> & {
  computedFields: __ComputedFields;
  fields: __Fields;
};

export type DocumentsFields<
  __AllFields extends Record<string, unknown> & FieldDefs = AllBlogFields,
  __DocumentsComputedFieldsKeys extends keyof __AllFields = BlogDocumentsComputedFieldsKeys
> = Omit<__AllFields, __DocumentsComputedFieldsKeys>;

type AtomicBlogDocumentConfig = DocumentsConfigType;
export type AtomicContentlayerDocumentConfig = AtomicBlogDocumentConfig & ContentlayerContentType;
export type ContentlayerDocumentsConfigType<__TypeName extends string = TypeName, __AllBlogFields extends FieldDefs = AllBlogFields> = {
  fields: __AllBlogFields;
} & ContentlayerContentType &
  DocumentsConfigTypeContentlayerMetadatas<__TypeName>;

export type MakeDocumentsAllFieldsSumType<T extends keyof __AllFields, __AllFields extends FieldDefs = AllBlogFields> = T;

export type MakeFields<
  T extends DocumentsFields<__AllFields, __DocumentsComputedFieldsKeys>,
  __AllFields extends Record<string, unknown> & FieldDefs = AllBlogFields,
  __DocumentsComputedFieldsKeys extends keyof __AllFields = BlogDocumentsComputedFieldsKeys
> = T;

export type DocumentToCompute = Document;

// * ... Adapter (narrowing)
type ComputedField<T extends FieldDefType = FieldDefType> = {
  resolve: (post: DocumentToCompute) => unknown;
  type: T;
};
type NarrowedFieldDefs = Record<string, FieldDef>;

export type ComputedFieldsArtifact<T extends NarrowedFieldDefs> = Partial<{ [K in keyof T]: ComputedField<T[K]['type']> }>;

export type BlogDocumentsConfigTypeMetadatas = {
  categoryFolder: CategoryFolder;
};

// Stryker restore all
/* v8 ignore stop */
