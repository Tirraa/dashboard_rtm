export const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

export const FAKE_BLOG_METADATAS_A = {
  'fake-category-one': {
    'fake-subcategory-one': {
      DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'],
      en: ['fake-post-01', 'fake-post-03'],
      it: ['fake-post-01', 'fake-post-02'],
      fr: ['fake-post-01']
    },
    'fake-subcategory-three': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], es: ['fake-post-01'], zh: ['fake-post-02'] },
    'fake-subcategory-two': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], fr: ['fake-post-02'] }
  },
  'fake-category-three': {
    'fake-subcategory-five': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], en: ['fake-post-03'], it: ['fake-post-03'] },
    'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], es: ['fake-post-04'] }
  },
  'fake-category-two': { 'fake-subcategory-six': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], zh: ['fake-post-10'] } }
};

export const FAKE_BLOG_METADATAS_B = {
  'fake-category-one': {
    'fake-subcategory-one': {
      DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'],
      en: ['fake-post-01', 'fake-post-03'],
      it: ['fake-post-01', 'fake-post-02'],
      fr: ['fake-post-01']
    },
    'fake-subcategory-three': {
      DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'],
      es: ['fake-post-01'],
      zh: ['fake-post-02']
    },
    'fake-subcategory-two': { fr: ['fake-post-02'] }
  },
  'fake-category-three': {
    'fake-subcategory-five': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], en: ['fake-post-03'], it: ['fake-post-03'] },
    'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], es: ['fake-post-04'] }
  },
  'fake-empty-subcategories-nested-in-category': {
    'fake-subcategory-seven': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], zh: ['fake-post-10'] },
    'fake-empty-subcategory': {}
  },
  'fake-category-two': { 'fake-subcategory-six': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], zh: ['fake-post-10'] } },
  'fake-empty-category': {}
};

export const INVALID_ENCODED_STRING_GLITCHED_BITSTREAM = '//////8=';

export const INVALID_ENCODED_STRING_GLITCHED_BASE64 =
  '0BiZ0Bip0Bi50BjJ0BjZ0Bjp0Bj50BkJ0BkZ0Bkp0Bk50BlJ0BlZ0Blp0Bl50BmJ0BmZ0Bmp0Bm50BnJ0BnZ0Bnp0Bn50BoJ0BoZ0Bop0Bo50BpJ0BpZ0Bpp0Bp50BqJ0BqZ0Bqp0Bq50BrJ0BrZ0Brp0Br50BsJ0BsZ0Bsp0Bs50BtJ0BtZ0Btp0Bt50BuJ0BuZ0Bup0Bu50BvJ0BvZ0Bvp0Bv50BwJ0BwZ0Bwp0Bw50BxJ0BxZ0Bxp0Bx50ByJ0ByZ0Byp0By50BzJ0BzZ0Bzp0Bz50B0J0B0Z0B0p0B050B1J0B1Z0B1p0B150B2J0B2Z0B2p0B250B3J0B3Z0B3p0B350B4J0B4Z0B4p0B450B5J0B5Z0B5p0B550B6J0B6Z0B6p0B650B7J0B7Z0B7p0B750B8J0B8Z0B8p0B850B9J0B9Z0B9p0B950B-J0B-Z0B-p0B-50B_J0B_Z0B_p0B_50BgJ4BgZ4Bgp4Bg54BhJ4BhZ4Bhp4Bh54BiJ4BiZ4Bip4Bi54BjJ4';

export const FAKE_LOCALES = ['en', 'it', 'fr', 'es', 'zh', 'ja', 'ko', 'de', 'pt', 'ru'] as const;
