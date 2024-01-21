import type { DocumentTypeDef } from 'contentlayer/source-files';

// * ... Adapter (narrowing)
// * ... Also made because importing `defineDocumentType` from `contentlayer/source-files` is not possible (loaders hell)
export const defineDocumentType = (def: () => DocumentTypeDef<string>) =>
  ({
    type: 'document',
    def
  }) as const;
