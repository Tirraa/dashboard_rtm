import type { DocumentContentType, FieldDefs } from 'contentlayer/source-files';
import type {
  BaseFields,
  DOCUMENTS_COMPUTED_FIELDS,
  DOCUMENTS_FIELDS,
  DocumentsComputedFieldsKey,
  DocumentsTypesKey
} from '../ContentlayerConfigTweakers';

type ContentLayerContentType = { contentType: DocumentContentType };

type ComputedFieldsKey = keyof typeof DOCUMENTS_COMPUTED_FIELDS;
export type ComputedFieldsAsFieldsRecord = {
  [Key in ComputedFieldsKey]: Key extends keyof BaseFields ? BaseFields[Key] : never;
};

type CategoryFolder = string;
type FilePathPattern = string;
type PostSchemaKey = 'PostSchema';
export type TypeName = DocumentsTypesKey | PostSchemaKey;

type DocumentsConfigTypeContentLayerMetadatas<T extends TypeName = TypeName> = {
  name: T;
  filePathPattern: FilePathPattern;
};

type DocumentsConfigTypeMetadatas<T extends TypeName = TypeName> = {
  name: T;
  categoryFolder: CategoryFolder;
};

export type DocumentsTypesMetadatas = Record<DocumentsTypesKey, DocumentsConfigTypeMetadatas<DocumentsTypesKey>>;

export type DocumentsConfigType = DocumentsConfigTypeContentLayerMetadatas & {
  fields: typeof DOCUMENTS_FIELDS;
  computedFields: typeof DOCUMENTS_COMPUTED_FIELDS;
};

export type MakeDocumentsBaseFieldsSumType<T extends keyof BaseFields> = T;
export type MakeDocumentsTypesSumType<T extends string> = T;

export type DocumentsFields = Omit<BaseFields, DocumentsComputedFieldsKey>;
export type AtomicDocumentConfig = DocumentsConfigType;
export type AtomicContentLayerDocumentConfig = AtomicDocumentConfig & ContentLayerContentType;
export type ContentLayerDocumentsConfigType = { fields: BaseFields } & ContentLayerContentType & DocumentsConfigTypeContentLayerMetadatas;

export type MakeBaseFields<__BaseFields extends FieldDefs> = __BaseFields;

export type PostToBuild = any;
