import type { DocumentType } from 'contentlayer/source-files';
import ContentLayerDuplicateTypesError from './errors/ContentLayerDuplicateTypesError';

const getDocumentTypeName = (documentType: DocumentType<string>) => documentType.def().name;

/**
 * @throws {ContentLayerDuplicateTypesError}
 */
export function validateContentLayerConfig(documentTypes: DocumentType<string>[]) {
  const documentTypesMemory: unknown[] = [];
  const duplicatesSet = new Set<unknown>();

  for (const documentType of documentTypes) {
    const currentType = getDocumentTypeName(documentType);

    if (documentTypesMemory.includes(currentType)) {
      duplicatesSet.add(currentType);
      continue;
    }
    documentTypesMemory.push(currentType);
  }

  const duplicates = Array.from(duplicatesSet);
  if (duplicates.length > 0) throw new ContentLayerDuplicateTypesError(duplicates);
}
