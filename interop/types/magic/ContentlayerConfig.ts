import type { Document } from 'contentlayer/core';
import type { ComputedFields, DocumentContentType, FieldDefs } from 'contentlayer/source-files';
import type {
  AllBlogFields,
  BlogComputedFields,
  BlogDocumentsComputedFieldsKeys,
  BlogDocumentsTypesKeys,
  BlogFields
} from '../../config/blog/contentlayerConfigTweakers';

type ContentLayerContentType = { contentType: DocumentContentType };

type CategoryFolder = string;
type FilePathPattern = string;
export type PostSchemaKey = 'PostSchema';
export type TypeName = BlogDocumentsTypesKeys;

type DocumentsConfigTypeContentLayerMetadatas<TYPENAME extends string> = {
  name: TYPENAME;
  filePathPattern: FilePathPattern;
};

type DocumentsConfigTypeMetadatas<TYPENAME extends TypeName = TypeName> = {
  name: TYPENAME;
  categoryFolder: CategoryFolder;
};

export type BlogDocumentsTypesMetadatas = Record<BlogDocumentsTypesKeys, DocumentsConfigTypeMetadatas<BlogDocumentsTypesKeys>>;

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
export type ContentLayerDocumentsConfigType<__TypeName extends string = TypeName> = { fields: AllBlogFields } & ContentLayerContentType &
  DocumentsConfigTypeContentLayerMetadatas<__TypeName>;

export type MakeDocumentsAllFieldsSumType<T extends keyof __AllFields, __AllFields extends FieldDefs = AllBlogFields> = T;
export type MakeDocumentsTypesSumType<T extends string> = T;
export type MakeAllFields<T extends FieldDefs> = T;
export type MakeFields<T extends DocumentsFields> = T;
export type MakeComputedFields<T extends ComputedFields> = T;

export type PostToBuild = Document;
