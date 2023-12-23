import type { FakeVocabType } from '../fakeVocabType';

export default {
  _infos: {
    lng: 'baz' // <== Invalid: should be 'invalid_baz'
  }
} as const satisfies FakeVocabType;
