import { BaseFields, DocumentsComputedFieldsSumType } from './contentlayerProductConfig';

type TypeName = string;
export type FilePathPattern = string;

type DocumentConfigTypeContentLayerMetadatas = {
  name: TypeName;
  filePathPattern: FilePathPattern;
};

type ComputedField<K extends keyof BaseFields> = Omit<BaseFields[K], 'required'> & { resolve: (...args: any[]) => unknown };

type ComputedFieldsMappedToPartialBaseFieldsSumType<K extends keyof BaseFields> = {
  [_ in K]: ComputedField<K>;
};

// * ... https://github.com/microsoft/TypeScript/issues/56080
export type DocumentConfigType<ComputedFields extends keyof BaseFields = never> = {} & ComputedFields extends never
  ? DocumentConfigTypeContentLayerMetadatas & { fields: BaseFields }
  : DocumentConfigTypeContentLayerMetadatas & {
      fields: Omit<BaseFields, ComputedFields>;
      computedFields: ComputedFieldsMappedToPartialBaseFieldsSumType<ComputedFields>;
    };

export type ComputedFields = {
  [K in keyof BaseFields]: ComputedField<K>;
};

export type DocumentsBaseFieldsKeysCollection<T extends keyof BaseFields> = T;

export type DocumentsFields = Omit<BaseFields, DocumentsComputedFieldsSumType>;
export type DocumentsComputedFields = Pick<ComputedFields, DocumentsComputedFieldsSumType>;
