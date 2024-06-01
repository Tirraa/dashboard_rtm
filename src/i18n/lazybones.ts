import type { TypedLeafsVocabData, VocabObjValue } from '@rtm/shared-types/I18n';
import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';

const _: EmptyString = '';

export const SHARED_TESTING_BLOG_CATEGORY_METADATAS = {
  'fake-subcategory': {
    'meta-description': _,
    title: _
  },
  '_meta-description': _,
  _title: _
} as const satisfies TypedLeafsVocabData<VocabObjValue>;

export const SHARED_TESTING_BLOG_SUBCATEGORIES_PAGES_TITLES = {
  'blog-testing-category': _,
  'fake-subcategory': _
} as const satisfies TypedLeafsVocabData<VocabObjValue>;
