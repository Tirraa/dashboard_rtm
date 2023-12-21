import type { FakeVocabType } from '../fakeVocabType';

export default {
  _infos: {
    lng: 'fr' // <== Invalid: should be 'invalid_fr'
  }
} as const satisfies FakeVocabType;
