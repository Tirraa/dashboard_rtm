import type { MakeHomogeneousValuesObjType } from '@rtm/shared-types/CustomUtilityTypes';

import type FAKE_VOCAB_SCHEMA from './fakeSchema';

type FakeVocabBase = typeof FAKE_VOCAB_SCHEMA;

export type FakeVocabType = MakeHomogeneousValuesObjType<FakeVocabBase, string>;
