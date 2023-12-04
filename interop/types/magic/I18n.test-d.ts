import { expectAssignable, expectNotAssignable, expectType } from 'jest-tsd';
import type { MakeI18ns, MakeVocabTargets, MakeVocabTargetsScopes } from './I18n';

const _ = {};

describe('MakeVocabTargets', () => {
  test('should pass, given a simple object notation', () => {
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

  test('should pass, given a simple dot notation', () => {
    const fake = _ as MakeVocabTargets<{
      hello: 'Hello';
      'hello.world': 'Hello World';
      'foo.bar.bar': 'Foo bar bar';
      'foo.bar..bar': 'Foo bar bar';
    }>;

    expectType<'hello' | 'hello.world' | 'foo.bar.bar' | 'foo.bar..bar'>(fake);
  });

  test('should pass, given an object notation with plural keys', () => {
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

  test('should pass, given a dot notation with plural keys', () => {
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
});

describe('MakeVocabTargetsScopes', () => {
  test('should pass, given a simple object notation', () => {
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

  test('should pass, given a simple dot notation', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        hello: 'Hello';
        'hello.world': 'Hello World';
        'foo.bar.bar': 'Foo bar bar';
        'foo.bar..bar': 'Foo bar bar';
        'foo.bar...foo.bar..foo.x.y': 'Same flaw than next-international';
      }>
    >;

    expectType<
      | 'hello'
      | 'foo'
      | 'foo.bar'
      | 'foo.bar.'
      | 'foo.bar..'
      | 'foo.bar...foo'
      | 'foo.bar...foo.bar'
      | 'foo.bar...foo.bar.'
      | 'foo.bar...foo.bar..foo'
      | 'foo.bar...foo.bar..foo.x'
    >(fake);
  });

  test('should pass, given an object notation with plural keys', () => {
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

  test('should pass, given a dot notation with plural keys', () => {
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
});

describe('MakeI18ns', () => {
  type FakeVocabTypeObjNotation = {
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

  type FakeVocabTypeDotNotation = {
    'foo.bar': 'bar';
    'etc.a.b.c': 'bar';
    NOT_A_NAMESPACE: "I'm NOT a namespace!";
  };

  test('should pass, given an exhaustive I18ns pattern, using object notation', () => {
    const fakeI18ns = {
      fooNamespace: 'foo',
      etcNamespace: 'etc'
    } as const;

    expectAssignable<MakeI18ns<typeof fakeI18ns, FakeVocabTypeObjNotation>>(fakeI18ns);
  });

  test('should pass, given an exhaustive I18ns pattern, using dot notation', () => {
    const fakeI18ns = {
      fooNamespace: 'foo',
      etcNamespace: 'etc'
    } as const;

    expectAssignable<MakeI18ns<typeof fakeI18ns, FakeVocabTypeDotNotation>>(fakeI18ns);
  });

  test('should pass, given an unexhaustive I18ns pattern, using object notation, and expecting the type system to disallow this unhappy path', () => {
    const fakeI18ns = {
      fooNamespace: 'foo'
    } as const;

    expectNotAssignable<MakeI18ns<typeof fakeI18ns, FakeVocabTypeObjNotation>>(fakeI18ns);
  });

  test('should pass, given an unexhaustive I18ns pattern, using dot notation, and expecting the type system to disallow this unhappy path', () => {
    const fakeI18ns = {
      fooNamespace: 'foo'
    } as const;

    expectNotAssignable<MakeI18ns<typeof fakeI18ns, FakeVocabTypeDotNotation>>(fakeI18ns);
  });
});
