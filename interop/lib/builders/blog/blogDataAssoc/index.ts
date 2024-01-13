import type { BlogDocumentsTypesMetadatas } from '##/config/contentlayer/contentlayerConfigTweakers';

import getBlogDataVariableName from './getBlogDataVariableName';

function blogDataAssocBuilder(documentsTypesMetadatas: BlogDocumentsTypesMetadatas) {
  const blogDataAssoc = {} as Record<PropertyKey, string>;

  for (const name of Object.keys(documentsTypesMetadatas)) {
    const currentMetadatas = documentsTypesMetadatas[name as keyof BlogDocumentsTypesMetadatas];
    blogDataAssoc[currentMetadatas.categoryFolder] = getBlogDataVariableName(name);
  }

  return blogDataAssoc;
}

export default blogDataAssocBuilder;
