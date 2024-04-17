// Error will not be thrown in test ctx
import type { DefaultLanguageToken } from '@rtm/generated';

// Error will not be thrown in test ctx
import { DEFAULT_LANGUAGE as DEFAULT_LANGUAGE_VALUE } from '##/config/i18n';
// Error will not be thrown in test ctx
import { INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { expectAssignable, expectType } from 'jest-tsd';
import { describe, it } from 'vitest';

import type LpLanguageAndSlugPair from './LpLanguageAndSlugPair';
import type { IndexToken } from '../Page';

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
          | `landing-pages-testing-category-${IndexToken}`
          | 'landing-pages-testing-category-fake-lp-00';
      } & {
        en:
          | 'landing-pages-testing-category-fake-draft-lp-00'
          | `landing-pages-testing-category-${IndexToken}`
          | 'landing-pages-testing-category-fake-lp-00';
      };
    }>;

    expectAssignable<typeof fake>({
      slug: 'landing-pages-testing-category-default-language-exclusivity',
      lang: DEFAULT_LANGUAGE_VALUE
    } as const);
    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00', lang: DEFAULT_LANGUAGE_VALUE } as const);
    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00', lang: DEFAULT_LANGUAGE_VALUE } as const);
    expectAssignable<typeof fake>({ slug: `landing-pages-testing-category-${INDEX_TOKEN}`, lang: DEFAULT_LANGUAGE_VALUE } as const);

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00', lang: 'en' } as const);
    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00', lang: 'en' } as const);
    expectAssignable<typeof fake>({ slug: `landing-pages-testing-category-${INDEX_TOKEN}`, lang: 'en' } as const);
  });

  it('should pass (mixed structure)', () => {
    const fake = _ as LpLanguageAndSlugPair<{
      'landing-pages-testing-category': {
        [_ in DefaultLanguageToken]:
          | 'landing-pages-testing-category-default-language-exclusivity'
          | 'landing-pages-testing-category-fake-draft-lp-00'
          | `landing-pages-testing-category-${IndexToken}`
          | 'landing-pages-testing-category-fake-lp-00';
      } & {
        en:
          | 'landing-pages-testing-category-fake-draft-lp-00'
          | `landing-pages-testing-category-${IndexToken}`
          | 'landing-pages-testing-category-fake-lp-00';
      };
      'dummy-category': {
        en: 'dummy-category-en-exclusivity' | 'dummy-category-lp-00';
      } & {
        [_ in DefaultLanguageToken]: 'dummy-category-lp-00';
      };
    }>;

    expectAssignable<typeof fake>({ slug: 'dummy-category-lp-00', lang: DEFAULT_LANGUAGE_VALUE } as const);

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-default-language-exclusivity', lang: DEFAULT_LANGUAGE_VALUE } as const);
    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00', lang: DEFAULT_LANGUAGE_VALUE } as const);
    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00', lang: DEFAULT_LANGUAGE_VALUE } as const);
    expectAssignable<typeof fake>({ slug: `landing-pages-testing-category-${INDEX_TOKEN}`, lang: DEFAULT_LANGUAGE_VALUE } as const);

    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-draft-lp-00', lang: 'en' } as const);
    expectAssignable<typeof fake>({ slug: 'landing-pages-testing-category-fake-lp-00', lang: 'en' } as const);
    expectAssignable<typeof fake>({ slug: `landing-pages-testing-category-${INDEX_TOKEN}`, lang: 'en' } as const);

    expectAssignable<typeof fake>({ slug: 'dummy-category-en-exclusivity', lang: 'en' } as const);
    expectAssignable<typeof fake>({ slug: 'dummy-category-lp-00', lang: 'en' } as const);
  });
});
