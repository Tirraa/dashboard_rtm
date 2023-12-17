import type { TypedLeafsJSONData } from '@rtm/shared-types/JSON';
import type { VocabObjValue } from '@rtm/shared-types/I18n';

const _: EmptyString = '';
export const SHARED_TESTING_BLOG_CATEGORY_METADATAS = {
  'fake-subcategory': {
    'meta-description': _,
    title: _
  },
  '_meta-description': _,
  _title: _
} as const satisfies TypedLeafsJSONData<VocabObjValue>;

type EmptyString = '';
