import type DefaultLanguageToken from '@rtm/generated/DefaultLanguageToken';

import { DEFAULT_LANGUAGE as DEFAULT_LANGUAGE_VALUE } from '##/config/i18n';
import { expectAssignable, expectType } from 'jest-tsd';
import { describe, it } from 'vitest';

import type LpLanguageAndSlugPair from './LpLanguageAndSlugPair';

const _ = {};

describe('LpLanguageAndSlugPair (Valid structure)', () => {
  it('should pass (empty structure)', () => {
    const fake = _ as LpLanguageAndSlugPair<{}>;

    expectType<never>(fake);
  });

  it('should pass (mono-empty-category structure)', () => {
    const fake = _ as LpLanguageAndSlugPair<{ 'dummy-category': {} }>;

    expectType<never>(fake);
  });

  it('should pass (mono-category structure)', () => {
    const fake = _ as LpLanguageAndSlugPair<{
      'landing-pages-testing-category': {
        [_ in DefaultLanguageToken]:
          | 'landing-pages-testing-category-default-language-exclusivity'
          | 'landing-pages-testing-category-fake-draft-lp-00'
          | 'landing-pages-testing-category-fake-lp-00'
          | 'landing-pages-testing-category-index';
      } & {
        en: 'landing-pages-testing-category-fake-draft-lp-00' | 'landing-pages-testing-category-fake-lp-00' | 'landing-pages-testing-category-index';
      };
    }>;

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-default-language-exclusivity' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-index' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00' as const, lang: 'en' as const });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00' as const, lang: 'en' as const });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-index' as const, lang: 'en' as const });
  });

  it('should pass (mixed structure)', () => {
    const fake = _ as LpLanguageAndSlugPair<{
      'landing-pages-testing-category': {
        [_ in DefaultLanguageToken]:
          | 'landing-pages-testing-category-default-language-exclusivity'
          | 'landing-pages-testing-category-fake-draft-lp-00'
          | 'landing-pages-testing-category-fake-lp-00'
          | 'landing-pages-testing-category-index';
      } & {
        en: 'landing-pages-testing-category-fake-draft-lp-00' | 'landing-pages-testing-category-fake-lp-00' | 'landing-pages-testing-category-index';
      };
      'dummy-category': {
        [_ in DefaultLanguageToken]: 'dummy-category-lp-00';
      } & {
        en: 'dummy-category-en-exclusivity' | 'dummy-category-lp-00';
      };
    }>;

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-default-language-exclusivity' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-index' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'dummy-category-lp-00' as const, lang: DEFAULT_LANGUAGE_VALUE });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00' as const, lang: 'en' as const });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00' as const, lang: 'en' as const });

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-index' as const, lang: 'en' as const });

    expectAssignable<typeof fake>({ slug: 'dummy-category-en-exclusivity' as const, lang: 'en' as const });

    expectAssignable<typeof fake>({ slug: 'dummy-category-lp-00' as const, lang: 'en' as const });
  });
});
