import type { FakeVocabType } from '../fakeVocabType';

export default {
  _infos: {
    lng: 'bar' // <== Invalid: should be 'invalid_bar'
  }
} as const satisfies FakeVocabType;
