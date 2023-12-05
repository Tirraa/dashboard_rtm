import type { BlogDocumentsTypesMetadatas } from '##/types/magic/ContentlayerConfig';
import getBlogDataVariableName from './getBlogDataVariableName';

export function blogDataAssocBuilder(documentsTypesMetadatas: BlogDocumentsTypesMetadatas) {
  const blogDataAssoc = {} as Record<PropertyKey, string>;

  Object.keys(documentsTypesMetadatas).forEach((name) => {
    const currentMetadatas = documentsTypesMetadatas[name as keyof BlogDocumentsTypesMetadatas];
    blogDataAssoc[currentMetadatas.categoryFolder] = getBlogDataVariableName(name);
  });

  return blogDataAssoc;
}

export default blogDataAssocBuilder;
