import { expectNotAssignable, expectAssignable, expectType } from 'jest-tsd';
import { describe, it } from 'vitest';

import type { MakeVocabTargetsScopes, MakeVocabTargets, MakeI18nsBase } from '../I18n';

const _ = {};

describe('MakeVocabTargets', () => {
  it('should pass, given a simple object notation', () => {
    const fake = _ as MakeVocabTargets<{
      foo: {
        bar: {
          '.bar': 'Hello!';
        };
      };
      hello: {
        world: 'hello world!';
      };
      root: 'root';
    }>;

    expectType<'foo.bar..bar' | 'hello.world' | 'root'>(fake);
  });

  it('should pass, given a simple dot notation', () => {
    const fake = _ as MakeVocabTargets<{
      'foo.bar..bar': 'Foo bar bar';
      'hello.world': 'Hello World';
      'foo.bar.bar': 'Foo bar bar';
      hello: 'Hello';
    }>;

    expectType<'foo.bar..bar' | 'hello.world' | 'foo.bar.bar' | 'hello'>(fake);
  });

  it('should pass, given an object notation with plural keys', () => {
    const fake = _ as MakeVocabTargets<{
      very: {
        magic: {
          'cows#other': '{count} magic cows';
          'cows#zero': 'No magic cow';
          'cows#one': 'A magic cow';
        };
      };
      magic: {
        'cows#other': '{count} magic cows';
        'cows#zero': 'No magic cow';
        'cows#one': 'A magic cow';
      };
      'cows#other': '{count} cows';
      'cows#zero': 'No cow';
      'cows#one': 'A cow';
    }>;

    expectType<'very.magic.cows' | 'magic.cows' | 'cows'>(fake);
  });

  it('should pass, given a dot notation with plural keys', () => {
    const fake = _ as MakeVocabTargets<{
      'very.magic.cows#other': '{count} magic cows';
      'magic.cows#other': '{count} magic cows';
      'very.magic.cows#zero': 'No magic cow';
      'very.magic.cows#one': 'A magic cow';
      'magic.cows#zero': 'No magic cow';
      'magic.cows#one': 'A magic cow';
      'cows#other': '{count} cows';
      'cows#zero': 'No cow';
      'cows#one': 'A cow';
    }>;

    expectType<'very.magic.cows' | 'magic.cows' | 'cows'>(fake);
  });
});

describe('MakeVocabTargetsScopes', () => {
  it('should pass, given a simple object notation', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        foo: {
          bar: {
            '.bar': 'Hello!';
          };
        };
        hello: {
          world: 'hello world!';
        };
        root: 'root';
      }>
    >;

    expectType<'foo.bar.' | 'foo.bar' | 'hello' | 'foo'>(fake);
  });

  it('should pass, given a simple dot notation', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        'foo.bar...foo.bar..foo.x.y': 'Same flaw than next-international';
        'foo.bar..bar': 'Foo bar bar';
        'hello.world': 'Hello World';
        'foo.bar.bar': 'Foo bar bar';
        hello: 'Hello';
      }>
    >;

    expectType<
      | 'foo.bar...foo.bar..foo.x'
      | 'foo.bar...foo.bar..foo'
      | 'foo.bar...foo.bar.'
      | 'foo.bar...foo.bar'
      | 'foo.bar...foo'
      | 'foo.bar..'
      | 'foo.bar.'
      | 'foo.bar'
      | 'hello'
      | 'foo'
    >(fake);
  });

  it('should pass, given an object notation with plural keys', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        very: {
          magic: {
            'cows#other': '{count} magic cows';
            'cows#zero': 'No magic cow';
            'cows#one': 'A magic cow';
          };
        };
        magic: {
          'cows#other': '{count} magic cows';
          'cows#zero': 'No magic cow';
          'cows#one': 'A magic cow';
        };
        'cows#other': '{count} cows';
        'cows#zero': 'No cow';
        'cows#one': 'A cow';
      }>
    >;

    expectType<'very.magic' | 'magic' | 'very'>(fake);
  });

  it('should pass, given a dot notation with plural keys', () => {
    const fake = _ as MakeVocabTargetsScopes<
      MakeVocabTargets<{
        'very.magic.cows#other': '{count} magic cows';
        'magic.cows#other': '{count} magic cows';
        'very.magic.cows#zero': 'No magic cow';
        'very.magic.cows#one': 'A magic cow';
        'magic.cows#zero': 'No magic cow';
        'magic.cows#one': 'A magic cow';
        'cows#other': '{count} cows';
        'cows#zero': 'No cow';
        'cows#one': 'A cow';
      }>
    >;

    expectType<'very.magic' | 'magic' | 'very'>(fake);
  });
});

describe('MakeI18nsBase', () => {
  type FakeVocabTypeObjNotation = {
    etc: {
      a: {
        b: {
          c: 'bar';
        };
      };
    };
    NOT_A_NAMESPACE: "I'm NOT a namespace!";
    foo: {
      bar: 'bar';
    };
  };

  type FakeVocabTypeDotNotation = {
    NOT_A_NAMESPACE: "I'm NOT a namespace!";
    'etc.a.b.c': 'bar';
    'foo.bar': 'bar';
  };

  it('should pass, given an exhaustive I18ns pattern, using object notation', () => {
    const fakeI18ns = {
      fooNamespace: 'foo',
      etcNamespace: 'etc'
    } as const;

    expectAssignable<MakeI18nsBase<typeof fakeI18ns, FakeVocabTypeObjNotation>>(fakeI18ns);
  });

  it('should pass, given an exhaustive I18ns pattern, using dot notation', () => {
    const fakeI18ns = {
      fooNamespace: 'foo',
      etcNamespace: 'etc'
    } as const;

    expectAssignable<MakeI18nsBase<typeof fakeI18ns, FakeVocabTypeDotNotation>>(fakeI18ns);
  });

  it('should pass, given an unexhaustive I18ns pattern, using object notation, and expecting the type system to disallow this unhappy path', () => {
    const fakeI18ns = {
      fooNamespace: 'foo'
    } as const;

    expectNotAssignable<MakeI18nsBase<typeof fakeI18ns, FakeVocabTypeObjNotation>>(fakeI18ns);
  });

  it('should pass, given an unexhaustive I18ns pattern, using dot notation, and expecting the type system to disallow this unhappy path', () => {
    const fakeI18ns = {
      fooNamespace: 'foo'
    } as const;

    expectNotAssignable<MakeI18nsBase<typeof fakeI18ns, FakeVocabTypeDotNotation>>(fakeI18ns);
  });
});
