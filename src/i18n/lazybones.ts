import type { VocabObjValue } from '@rtm/shared-types/I18n';
import type { TypedLeafsJSONData } from '@rtm/shared-types/JSON';

const _: EmptyString = '';
export const SHARED_TESTING_BLOG_CATEGORY_METADATAS = {
  _title: _,
  '_meta-description': _,
  'fake-subcategory': {
    title: _,
    'meta-description': _
  }
} as const satisfies TypedLeafsJSONData<VocabObjValue>;

type EmptyString = '';
