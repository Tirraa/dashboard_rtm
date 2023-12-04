import { expectAssignable, expectNotAssignable, expectType } from 'jest-tsd';
import type { MakeI18ns, MakeVocabTargets, MakeVocabTargetsScopes } from './i18n';

const _ = {};

describe('MakeVocabTargets', () => {
  test('should pass the dot notation', () => {
    const fake = _ as MakeVocabTargets<{
      hello: 'Hello';
      'hello.world': 'Hello World';
      'foo.bar.bar': 'Foo bar bar';
      'foo.bar..bar': 'Foo bar bar';
    }>;

    expectType<'hello' | 'hello.world' | 'foo.bar.bar' | 'foo.bar..bar'>(fake);
  });

  test('should pass the object notation', () => {
    const fake = _ as MakeVocabTargets<{
      hello: {
        world: 'hello world!';
      };
      foo: {
        bar: {
          '.bar': 'Hello!';
        };
      };
      root: 'root';
    }>;

    expectType<'root' | 'hello.world' | 'foo.bar..bar'>(fake);
  });

  test('should pass the dot notation with plural keys and dot notation', () => {
    const fake = _ as MakeVocabTargets<{
      'cows#zero': 'No cow';
      'cows#one': 'A cow';
      'cows#other': '{count} cows';
      'magic.cows#zero': 'No magic cow';
      'magic.cows#one': 'A magic cow';
      'magic.cows#other': '{count} magic cows';
      'very.magic.cows#zero': 'No magic cow';
      'very.magic.cows#one': 'A magic cow';
      'very.magic.cows#other': '{count} magic cows';
    }>;

    expectType<'cows' | 'magic.cows' | 'very.magic.cows'>(fake);
  });

  test('should pass the dot notation with plural keys and object notation', () => {
    const fake = _ as MakeVocabTargets<{
      'cows#zero': 'No cow';
      'cows#one': 'A cow';
      'cows#other': '{count} cows';
      magic: {
        'cows#zero': 'No magic cow';
        'cows#one': 'A magic cow';
        'cows#other': '{count} magic cows';
      };
      very: {
        magic: {
          'cows#zero': 'No magic cow';
          'cows#one': 'A magic cow';
          'cows#other': '{count} magic cows';
        };
      };
    }>;

    expectType<'cows' | 'magic.cows' | 'very.magic.cows'>(fake);
  });
});

describe('MakeVocabTargetsScopes', () => {
  test('should pass the dot notation', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        hello: 'Hello';
        'hello.world': 'Hello World';
        'foo.bar.bar': 'Foo bar bar';
        'foo.bar..bar': 'Foo bar bar';
      }>
    >;

    expectType<'hello' | 'foo' | 'foo.bar' | 'foo.bar.'>(fake);
  });

  test('should pass the object notation', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        hello: {
          world: 'hello world!';
        };
        foo: {
          bar: {
            '.bar': 'Hello!';
          };
        };
        root: 'root';
      }>
    >;

    expectType<'hello' | 'foo' | 'foo.bar' | 'foo.bar.'>(fake);
  });

  test('should pass the dot notation with plural keys and dot notation', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        'cows#zero': 'No cow';
        'cows#one': 'A cow';
        'cows#other': '{count} cows';
        'magic.cows#zero': 'No magic cow';
        'magic.cows#one': 'A magic cow';
        'magic.cows#other': '{count} magic cows';
        'very.magic.cows#zero': 'No magic cow';
        'very.magic.cows#one': 'A magic cow';
        'very.magic.cows#other': '{count} magic cows';
      }>
    >;

    expectType<'magic' | 'very' | 'very.magic'>(fake);
  });

  test('should pass the dot notation with plural keys and object notation', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        'cows#zero': 'No cow';
        'cows#one': 'A cow';
        'cows#other': '{count} cows';
        magic: {
          'cows#zero': 'No magic cow';
          'cows#one': 'A magic cow';
          'cows#other': '{count} magic cows';
        };
        very: {
          magic: {
            'cows#zero': 'No magic cow';
            'cows#one': 'A magic cow';
            'cows#other': '{count} magic cows';
          };
        };
      }>
    >;

    expectType<'magic' | 'very' | 'very.magic'>(fake);
  });
});

describe('MakeI18ns', () => {
  type FakeVocabType = {
    foo: {
      bar: 'bar';
    };
    etc: {
      a: {
        b: {
          c: 'bar';
        };
      };
    };
    NOT_A_NAMESPACE: "I'm NOT a namespace!";
  };

  test('should pass an exhaustive I18ns pattern', () => {
    const fakeI18ns = {
      fooNamespace: 'foo',
      etcNamespace: 'etc'
    } as const;

    expectAssignable<MakeI18ns<typeof fakeI18ns, FakeVocabType>>(fakeI18ns);
  });

  test("shouldn't allow an unexhaustive I18ns pattern", () => {
    const fakeI18ns = {
      fooNamespace: 'foo'
    } as const;

    expectNotAssignable<MakeI18ns<typeof fakeI18ns, FakeVocabType>>(fakeI18ns);
  });
});
