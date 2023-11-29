import type { DocumentsTypesMetadatas } from '##/types/magic/ContentlayerConfig';
import getBlogDataVariableName from './getBlogDataVariableName';

export function blogDataAssocBuilder(documentsTypesMetadatas: DocumentsTypesMetadatas) {
  const blogDataAssoc = {} as Record<string, string>;

  Object.keys(documentsTypesMetadatas).forEach((name) => {
    const currentMetadatas = documentsTypesMetadatas[name as keyof DocumentsTypesMetadatas];
    blogDataAssoc[currentMetadatas.categoryFolder] = getBlogDataVariableName(name);
  });

  return blogDataAssoc;
}

export default blogDataAssocBuilder;
