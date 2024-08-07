import type { ComputedFields, FieldDefs } from 'contentlayer/source-files';

import { expectNotAssignable, expectAssignable } from 'jest-tsd';
import { describe, it } from 'vitest';

import type {
  DocumentsConfigTypeContentlayerMetadatas,
  ContentlayerDocumentsConfigType,
  MakeDocumentsAllFieldsSumType,
  ComputedFieldsArtifact,
  DocumentsFields
} from '../ContentlayerConfig';

const EXT = 'mdx';
const FAKE_SCHEMA_KEY = 'FakeSchema';

const _ALL_FAKE_FIELDS = {
  bar: {
    required: false,
    type: 'string'
  },

  foo: {
    type: 'string',
    required: true
  }
} as const satisfies FieldDefs;

const FAKE_COMPUTED_FIELDS = {
  foo: { type: _ALL_FAKE_FIELDS.foo.type, resolve: () => 'FAKE' }
} as const satisfies ComputedFieldsArtifact<_AllFakeFields> satisfies ComputedFields;

const FAKE_FIELDS = { bar: _ALL_FAKE_FIELDS.bar } as const satisfies DocumentsFields<_AllFakeFields, FakeDocumentsComputedFieldsKeys>;

const FAKE_SCHEMA = {
  fields: _ALL_FAKE_FIELDS,
  filePathPattern: '',
  name: 'FakeSchema',
  contentType: EXT
} as const;

const FAKE_DOCUMENTS_TYPES_METADATAS = {
  FakePost1: {
    filePathPattern: '',
    name: 'FakePost1'
  },

  FakePost2: {
    filePathPattern: '',
    name: 'FakePost2'
  }
} as const;

const INVALID_FAKE_SCHEMA_1 = {
  fields: { foo: _ALL_FAKE_FIELDS.foo }, // <== Invalid: fields is not exhaustive
  name: FAKE_SCHEMA_KEY,
  filePathPattern: '',
  contentType: EXT
} as const;

const INVALID_FAKE_SCHEMA_2 = {
  fields: FAKE_SCHEMA.fields,
  filePathPattern: '',
  contentType: EXT,
  name: '$' // <== Invalid: only the FakeSchemaKey literal is allowed here
} as const;

const INVALID_FAKE_DOCUMENTS_TYPES_METADATAS = {
  FakePost2: {
    filePathPattern: '',
    name: '$' // <== Invalid: only the FakeDocumentsTypesKeys literals are allowed here
  },

  // Invalid: not allowed index. Only the FakeDocumentsTypesKeys literals are allowed here
  $: {
    filePathPattern: '',
    name: 'FakePost1'
  }
} as const;

describe('ContentlayerConfig walkthrough', () => {
  it('should pass, given the correct FAKE_FIELDS pattern', () =>
    expectAssignable<DocumentsFields<_AllFakeFields, keyof _FakeComputedFields>>(FAKE_FIELDS));

  it('should pass, given an invalid FAKE_FIELDS pattern, and expecting the type system to disallow this unhappy path', () => {
    expectNotAssignable<DocumentsFields<_AllFakeFields, keyof _FakeComputedFields>>({
      foo: _ALL_FAKE_FIELDS.foo, // <== Invalid: foo is a computed field
      bar: _ALL_FAKE_FIELDS.bar
    } as const);
  });

  it('should pass, given the correct FAKE_SCHEMA pattern', () =>
    expectAssignable<ContentlayerDocumentsConfigType<'FakeSchema', _AllFakeFields>>(FAKE_SCHEMA));

  it('should pass, given two invalid FAKE_SCHEMA patterns, and expecting the type system to disallow this unhappy path', () => {
    expectNotAssignable<ContentlayerDocumentsConfigType<FakeSchemaKey, _AllFakeFields>>(INVALID_FAKE_SCHEMA_1);
    expectNotAssignable<ContentlayerDocumentsConfigType<FakeSchemaKey, _AllFakeFields>>(INVALID_FAKE_SCHEMA_2);
  });

  it('should pass, given the correct FAKE_DOCUMENTS_TYPES_METADATAS pattern', () =>
    expectAssignable<FakeDocumentsTypesMetadatas>(FAKE_DOCUMENTS_TYPES_METADATAS));

  it('should pass, given two invalid FAKE_SCHEMA patterns, and expecting the type system to disallow this unhappy path', () => {
    expectNotAssignable<FakeDocumentsTypesMetadatas>(INVALID_FAKE_DOCUMENTS_TYPES_METADATAS);
  });

  it('should pass, otherwise it means that the type constructors are broken', () => {
    expectAssignable<FakeDocumentsComputedFieldsKeys>('foo' as keyof typeof FAKE_COMPUTED_FIELDS);
  });
});

type _AllFakeFields = typeof _ALL_FAKE_FIELDS;
type _FakeComputedFields = typeof FAKE_COMPUTED_FIELDS;
type FakeDocumentsTypesKeys = 'FakePost1' | 'FakePost2';
type FakeSchemaKey = typeof FAKE_SCHEMA_KEY;
type FakeDocumentsTypesMetadatas = Record<FakeDocumentsTypesKeys, DocumentsConfigTypeContentlayerMetadatas<FakeDocumentsTypesKeys>>;

type FakeDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _FakeComputedFields, _AllFakeFields>;
