import type { DocumentType } from 'contentlayer/source-files';

import ContentlayerDuplicateTypesError from './errors/ContentlayerDuplicateTypesError';

const getDocumentTypeName = (documentType: DocumentType<string>) => documentType.def().name;

/**
 * @throws {ContentlayerDuplicateTypesError}
 */
function validateContentlayerConfig(documentTypes: DocumentType<string>[]) {
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
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (duplicates.length > 0) throw new ContentlayerDuplicateTypesError(duplicates);
}

export default validateContentlayerConfig;
