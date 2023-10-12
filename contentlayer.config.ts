import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { DocumentConfigType, PHANTOM_POST_CONFIG } from './types/contentlayerConfig';

const contentDirPath = 'posts';

const PhantomPost = defineDocumentType(() => PHANTOM_POST_CONFIG);

const PatchPost = defineDocumentType(
  () =>
    ({
      name: 'PatchPost',
      filePathPattern: '**/patch-notes/**/*.md',
      fields: {
        title: { type: 'string', required: true },
        metadescription: { type: 'string', required: true },
        description: { type: 'string', required: false },
        date: { type: 'date', required: true }
      },
      computedFields: {
        url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` }
      }
    } satisfies DocumentConfigType<'url'>)
);

const PatchPostBis = defineDocumentType(
  () =>
    ({
      name: 'PatchPostBis',
      filePathPattern: '**/patch-notes-bis/**/*.md',
      fields: {
        title: { type: 'string', required: true },
        metadescription: { type: 'string', required: true },
        description: { type: 'string', required: false },
        date: { type: 'date', required: true }
      },
      computedFields: {
        url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` }
      }
    } satisfies DocumentConfigType<'url'>)
);

export default makeSource({ contentDirPath, documentTypes: [PhantomPost, PatchPost, PatchPostBis] });
