/* v8 ignore start */
// Stryker disable all

import { defineNestedType } from '../adapters';

const DocumentHeading = defineNestedType(() => ({
  fields: {
    content: {
      required: true,
      type: 'string'
    },

    depth: {
      required: true,
      type: 'number'
    },

    slug: {
      required: true,
      type: 'string'
    }
  },

  name: 'DocumentHeading'
}));

export default DocumentHeading;

// Stryker restore all
/* v8 ignore stop */
