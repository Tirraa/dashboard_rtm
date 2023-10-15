import { BaseFields, DocumentsComputedFieldsKey, DocumentsTypesKey } from './contentlayerConfigTweakers';

type ComputedField<K extends keyof BaseFields> = Omit<BaseFields[K], 'required'> & { resolve: (...args: any[]) => unknown };

type ComputedFieldsMappedToPartialBaseFieldsSumType<K extends keyof BaseFields> = {
  [_ in K]: ComputedField<K>;
};

type FilePathPattern = string;
type PostSchemaKey = 'PostSchema';
export type TypeName = DocumentsTypesKey | PostSchemaKey;

type DocumentsConfigTypeContentLayerMetadatas<T extends TypeName = TypeName> = {
  name: T;
  filePathPattern: FilePathPattern;
};

export type DocumentsTypesMetadatas = Record<DocumentsTypesKey, DocumentsConfigTypeContentLayerMetadatas<DocumentsTypesKey>>;

// * ... https://github.com/microsoft/TypeScript/issues/56080
export type DocumentsConfigType<ComputedFields extends keyof BaseFields = never> = {} & ComputedFields extends never
  ? DocumentsConfigTypeContentLayerMetadatas & { fields: BaseFields }
  : DocumentsConfigTypeContentLayerMetadatas & {
      fields: Omit<BaseFields, ComputedFields>;
      computedFields: ComputedFieldsMappedToPartialBaseFieldsSumType<ComputedFields>;
    };

export type ComputedFields = {
  [K in keyof BaseFields]: ComputedField<K>;
};

export type MakeDocumentsBaseFieldsSumType<T extends keyof BaseFields> = T;
export type MakeDocumentsTypesSumType<T extends string> = T;

export type DocumentsFields = Omit<BaseFields, DocumentsComputedFieldsKey>;
export type DocumentsComputedFields = Pick<ComputedFields, DocumentsComputedFieldsKey>;
export type AtomicDocumentConfig = DocumentsConfigType<DocumentsComputedFieldsKey>;
