import type { FieldDefs } from 'contentlayer/source-files';
import { expectAssignable, expectNotAssignable } from 'jest-tsd';
import type {
  ContentLayerDocumentsConfigType,
  DocumentsConfigTypeContentLayerMetadatas,
  DocumentsFields,
  MakeAllFields,
  MakeComputedFields,
  MakeDocumentsAllFieldsSumType,
  MakeDocumentsTypesSumType,
  MakeFields
} from '../../types/magic/ContentlayerConfig';

describe('ContentLayerConfig walkthrough', () => {
  const EXT = 'mdx';
  const FAKE_SCHEMA_KEY = 'FakeSchema';

  const _FAKE_ALL_FIELDS = {
    foo: {
      type: 'string',
      required: true
    },
    bar: {
      type: 'string',
      required: false
    }
  } as const satisfies FieldDefs;

  const FAKE_COMPUTED_FIELDS = { foo: { type: 'string', resolve: () => 'FAKE' } } as const;
  const FAKE_FIELDS = { bar: { type: 'string', required: false } } as const;

  test('should pass, given the correct FAKE_FIELDS pattern', () => {
    expectAssignable<DocumentsFields<_AllFakeFields, keyof _FakeComputedFields>>(FAKE_FIELDS);
  });

  test('should pass, given an invalid FAKE_FIELDS pattern, and expecting the type system to disallow this unhappy path', () => {
    expectNotAssignable<DocumentsFields<_AllFakeFields, keyof _FakeComputedFields>>({
      foo: { type: 'string', required: true }, // <== Invalid: foo is a computed field
      bar: { type: 'string', required: false }
    } as const);
  });

  const FAKE_SCHEMA = {
    name: 'FakeSchema',
    filePathPattern: '',
    contentType: EXT,
    fields: _FAKE_ALL_FIELDS
  } as const;

  test('should pass, given the correct FAKE_SCHEMA pattern', () => {
    expectAssignable<ContentLayerDocumentsConfigType<'FakeSchema', _AllFakeFields>>(FAKE_SCHEMA);
  });

  test('should pass, given two invalid FAKE_SCHEMA patterns, and expecting the type system to disallow this unhappy path', () => {
    const INVALID_FAKE_SCHEMA_1 = {
      name: FAKE_SCHEMA_KEY,
      filePathPattern: '',
      contentType: EXT,
      fields: { foo: { type: 'string', required: true } } // <== Invalid: fields is not exhaustive
    } as const;

    const INVALID_FAKE_SCHEMA_2 = {
      name: '$', // <== Invalid: only the FakeSchemaKey literal is allowed here
      filePathPattern: '',
      contentType: EXT,
      fields: FAKE_SCHEMA.fields
    } as const;

    expectNotAssignable<ContentLayerDocumentsConfigType<FakeSchemaKey, _AllFakeFields>>(INVALID_FAKE_SCHEMA_1);

    expectNotAssignable<ContentLayerDocumentsConfigType<FakeSchemaKey, _AllFakeFields>>(INVALID_FAKE_SCHEMA_2);
  });

  const FAKE_DOCUMENTS_TYPES_METADATAS = {
    FakePost1: {
      name: 'FakePost1',
      filePathPattern: ''
    },
    FakePost2: {
      name: 'FakePost2',
      filePathPattern: ''
    }
  } as const;

  test('should pass, given the correct FAKE_DOCUMENTS_TYPES_METADATAS pattern', () => {
    expectAssignable<FakeDocumentsTypesMetadatas>(FAKE_DOCUMENTS_TYPES_METADATAS);
  });

  test('should pass, given two invalid FAKE_SCHEMA patterns, and expecting the type system to disallow this unhappy path', () => {
    const INVALID_FAKE_DOCUMENTS_TYPES_METADATAS = {
      // Invalid: not allowed index. Only the FakeDocumentsTypesKeys literals are allowed here
      $: {
        name: 'FakePost1',
        filePathPattern: ''
      },
      FakePost2: {
        name: '$', // <== Invalid: only the FakeDocumentsTypesKeys literals are allowed here
        filePathPattern: ''
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

  test('should pass, otherwise it means that the type constructors are corrupted', () => {
    expectAssignable<AllFakeFields>(_FAKE_ALL_FIELDS);
    expectAssignable<FakeComputedFields>(FAKE_COMPUTED_FIELDS);
    expectAssignable<FakeDocumentsComputedFieldsKeys>('foo' as keyof typeof FAKE_COMPUTED_FIELDS);
    expectAssignable<FakeFields>(FAKE_FIELDS);
  });
});
