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
