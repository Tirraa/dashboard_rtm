/* v8 ignore start */
// Stryker disable all

import { defineNestedType } from '../adapters';

// * ... Inspired from https://github.com/contentlayerdev/contentlayer/blob/main/examples/archive/playground-azimuth/src/contentlayer/nested/SEO.ts

const Robots = defineNestedType(() => ({
  fields: {
    nositelinkssearchbox: { required: false, type: 'boolean', default: false },
    indexifembedded: { required: false, type: 'boolean', default: true },
    noimageindex: { required: false, type: 'boolean', default: false },
    notranslate: { required: false, type: 'boolean', default: false },
    noarchive: { required: false, type: 'boolean', default: false },
    nosnippet: { required: false, type: 'boolean', default: false },
    nocache: { required: false, type: 'boolean', default: false },
    follow: { required: false, type: 'boolean', default: true },
    index: { required: false, type: 'boolean', default: true }
  }
}));

const AlternateLinkDescriptor = defineNestedType(() => ({
  fields: {
    title: { required: false, type: 'string' },
    url: { required: true, type: 'string' }
  }
}));

const Alternates = defineNestedType(() => ({
  fields: {
    canonical: { of: AlternateLinkDescriptor, required: false, type: 'nested' }
  }
}));

const OGImageDescriptor = defineNestedType(() => ({
  fields: {
    secureUrl: { required: false, type: 'string' },
    height: { required: false, type: 'number' },
    width: { required: false, type: 'number' },
    type: { required: false, type: 'string' },
    alt: { required: false, type: 'string' },
    url: { required: true, type: 'string' }
  }
}));

const OGAudioDescriptor = defineNestedType(() => ({
  fields: {
    secureUrl: { required: false, type: 'string' },
    type: { required: false, type: 'string' },
    url: { required: true, type: 'string' }
  }
}));

const OGVideoDescriptor = defineNestedType(() => ({
  fields: {
    secureUrl: { required: false, type: 'string' },
    height: { required: false, type: 'number' },
    width: { required: false, type: 'number' },
    type: { required: false, type: 'string' },
    url: { required: true, type: 'string' }
  }
}));

const OpenGraph = defineNestedType(() => ({
  fields: {
    images: { of: OGImageDescriptor, required: false, type: 'list' },
    videos: { of: OGVideoDescriptor, required: false, type: 'list' },
    audio: { of: OGAudioDescriptor, required: false, type: 'list' },
    description: { required: false, type: 'string' },
    title: { required: false, type: 'string' }
  }
}));

const SEO = defineNestedType(() => ({
  fields: {
    alternates: {
      description: 'The canonical and alternate URLs for the document',
      required: false,
      type: 'nested',
      of: Alternates
    },

    robots: {
      description: 'The items that go into the <meta name="robots"> tag',
      required: false,
      type: 'nested',
      of: Robots
    },

    openGraph: {
      description: 'The Open Graph data',
      required: false,
      type: 'nested',
      of: OpenGraph
    }
  },

  name: 'SEO'
}));

export default SEO;

// Stryker restore all
/* v8 ignore stop */
