import type { FieldDefs } from 'contentlayer/source-files';

import { expectNotAssignable, expectAssignable } from 'jest-tsd';
import { describe, it } from 'vitest';

import type {
  DocumentsConfigTypeContentLayerMetadatas,
  ContentLayerDocumentsConfigType,
  MakeDocumentsAllFieldsSumType,
  MakeDocumentsTypesSumType,
  MakeComputedFields,
  DocumentsFields,
  MakeAllFields,
  MakeFields
} from '../ContentlayerConfig';

describe('ContentLayerConfig walkthrough', () => {
  const EXT = 'mdx';
  const FAKE_SCHEMA_KEY = 'FakeSchema';

  const _FAKE_ALL_FIELDS = {
    bar: {
      required: false,
      type: 'string'
    },
    foo: {
      type: 'string',
      required: true
    }
  } as const satisfies FieldDefs;

  const FAKE_COMPUTED_FIELDS = { foo: { resolve: () => 'FAKE', type: 'string' } } as const;
  const FAKE_FIELDS = { bar: { required: false, type: 'string' } } as const;

  it('should pass, given the correct FAKE_FIELDS pattern', () =>
    expectAssignable<DocumentsFields<_AllFakeFields, keyof _FakeComputedFields>>(FAKE_FIELDS));

  it('should pass, given an invalid FAKE_FIELDS pattern, and expecting the type system to disallow this unhappy path', () => {
    expectNotAssignable<DocumentsFields<_AllFakeFields, keyof _FakeComputedFields>>({
      bar: { required: false, type: 'string' },
      foo: { type: 'string', required: true } // <== Invalid: foo is a computed field
    } as const);
  });

  const FAKE_SCHEMA = {
    fields: _FAKE_ALL_FIELDS,
    filePathPattern: '',
    name: 'FakeSchema',
    contentType: EXT
  } as const;

  it('should pass, given the correct FAKE_SCHEMA pattern', () =>
    expectAssignable<ContentLayerDocumentsConfigType<'FakeSchema', _AllFakeFields>>(FAKE_SCHEMA));

  it('should pass, given two invalid FAKE_SCHEMA patterns, and expecting the type system to disallow this unhappy path', () => {
    const INVALID_FAKE_SCHEMA_1 = {
      fields: { foo: { type: 'string', required: true } }, // <== Invalid: fields is not exhaustive
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

    expectNotAssignable<ContentLayerDocumentsConfigType<FakeSchemaKey, _AllFakeFields>>(INVALID_FAKE_SCHEMA_1);
    expectNotAssignable<ContentLayerDocumentsConfigType<FakeSchemaKey, _AllFakeFields>>(INVALID_FAKE_SCHEMA_2);
  });

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

  it('should pass, given the correct FAKE_DOCUMENTS_TYPES_METADATAS pattern', () =>
    expectAssignable<FakeDocumentsTypesMetadatas>(FAKE_DOCUMENTS_TYPES_METADATAS));

  it('should pass, given two invalid FAKE_SCHEMA patterns, and expecting the type system to disallow this unhappy path', () => {
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

    expectNotAssignable<FakeDocumentsTypesMetadatas>(INVALID_FAKE_DOCUMENTS_TYPES_METADATAS);
  });

  type _AllFakeFields = typeof _FAKE_ALL_FIELDS;
  type _FakeComputedFields = typeof FAKE_COMPUTED_FIELDS;
  type _FakeFields = typeof FAKE_FIELDS;
  type FakeDocumentsTypesKeys = MakeDocumentsTypesSumType<'FakePost1' | 'FakePost2'>;
  type FakeSchemaKey = typeof FAKE_SCHEMA_KEY;
  type FakeDocumentsTypesMetadatas = Record<FakeDocumentsTypesKeys, DocumentsConfigTypeContentLayerMetadatas<FakeDocumentsTypesKeys>>;

  type AllFakeFields = MakeAllFields<_AllFakeFields>;
  type FakeComputedFields = MakeComputedFields<_FakeComputedFields>;
  type FakeDocumentsComputedFieldsKeys = MakeDocumentsAllFieldsSumType<keyof _FakeComputedFields, _AllFakeFields>;
  type FakeFields = MakeFields<_FakeFields, _AllFakeFields, keyof _FakeComputedFields>;

  it('should pass, otherwise it means that the type constructors are broken', () => {
    expectAssignable<AllFakeFields>(_FAKE_ALL_FIELDS);
    expectAssignable<FakeComputedFields>(FAKE_COMPUTED_FIELDS);
    expectAssignable<FakeDocumentsComputedFieldsKeys>('foo' as keyof typeof FAKE_COMPUTED_FIELDS);
    expectAssignable<FakeFields>(FAKE_FIELDS);
  });
});
