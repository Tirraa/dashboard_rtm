import type { AtomicContentlayerDocumentConfig } from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentType } from 'contentlayer/source-files';

import {
  BLOG_DOCUMENTS_COMPUTED_FIELDS as computedFields,
  DOCUMENTS_CONTENT_TYPE as contentType,
  DOCUMENTS_CONTENT_EXTENSION as EXT,
  BLOG_DOCUMENTS_FIELDS as fields,
  BLOG_POST_SCHEMA_CONFIG,
  BLOG_POSTS_FOLDER
} from '../contentlayerConfigTweakers';
import blogDataAssocBuilder from '../../../lib/builders/blog/blogDataAssoc';
import { blogDocumentsTypes } from '../../../../.rtm-generated/index';
import { defineDocumentType } from '../adapters';

const blogDocumentTypes: DocumentType[] = Object.entries(blogDocumentsTypes).reduce(
  (acc, [name, blogDocumentsType]) => {
    const { categoryFolder } = blogDocumentsType;
    const filePathPattern = BLOG_POSTS_FOLDER + '/' + categoryFolder + `/**/*.${EXT}`;
    acc.push(
      defineDocumentType(
        () =>
          /* v8 ignore start */
          ({
            name: name as keyof typeof blogDocumentsTypes,
            filePathPattern,
            computedFields,
            contentType,
            fields
          }) as const satisfies AtomicContentlayerDocumentConfig
        /* v8 ignore stop */
      )
    );

    return acc;
  },
  [defineDocumentType(() => BLOG_POST_SCHEMA_CONFIG)]
);

export const categoriesBlogDataAssoc = blogDataAssocBuilder(blogDocumentsTypes);

export default blogDocumentTypes;
