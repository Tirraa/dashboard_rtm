import type { DocumentTypeDef } from 'contentlayer/source-files';

export const defineDocumentType = (def: () => DocumentTypeDef<string>) =>
  ({
    type: 'document',
    def
  }) as const;
