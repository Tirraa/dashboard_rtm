import type { DocumentsTypesMetadatas } from '##/types/hell/contentlayerConfig';
import { DOCUMENTS_CONTENT_EXTENSION as EXT } from '../../types/contentlayerConfigTweakers';

export const documentsTypesMetadatas: DocumentsTypesMetadatas = {
  PatchPost: {
    name: 'PatchPost',
    filePathPattern: `patch-notes/**/*.${EXT}`
  },
  PatchPostBis: {
    name: 'PatchPostBis',
    filePathPattern: `patch-notes-bis/**/*.${EXT}`
  }
} as const;

export default documentsTypesMetadatas;
