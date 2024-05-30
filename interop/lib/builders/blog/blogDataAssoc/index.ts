import type { blogDocumentsTypes } from '@rtm/generated';

import getBlogDataVariableName from './getBlogDataVariableName';

function blogDataAssocBuilder(documentsTypesMetadatas: typeof blogDocumentsTypes) {
  const blogDataAssoc = {} as Record<PropertyKey, string>;

  for (const name of Object.keys(documentsTypesMetadatas)) {
    const currentMetadatas = documentsTypesMetadatas[name as keyof typeof blogDocumentsTypes];
    blogDataAssoc[currentMetadatas.categoryFolder] = getBlogDataVariableName(name);
  }

  return blogDataAssoc;
}

export default blogDataAssocBuilder;
