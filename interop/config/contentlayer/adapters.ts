import type { NestedUnnamedTypeDef, DocumentTypeDef, NestedTypeDef, NestedType } from 'contentlayer/source-files';

// * ... Adapter (narrowing)
// * ... Also made because importing `defineDocumentType` from `contentlayer/source-files` is not possible (loaders hell)
export const defineDocumentType = (def: () => DocumentTypeDef<string>) =>
  ({
    type: 'document',
    def
  }) as const;

// * ... Adapter (narrowing)
// * ... Also made because importing `defineNestedType` from `contentlayer/source-files` is not possible (loaders hell)
export const defineNestedType = (def: () => NestedTypeDef<string> | NestedUnnamedTypeDef): NestedType => ({
  type: 'nested',
  def
});
