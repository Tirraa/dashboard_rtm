import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { DefaultLanguage } from '##/config/i18n';

import { describe, it } from 'vitest';
import { expectType } from 'jest-tsd';

import type PageAdapter from './PageAdapter';

const _ = {};

const validAlternativeLanguage: Exclude<LanguageFlag, DefaultLanguage> = 'en';
type ValidAlternativeLanguage = typeof validAlternativeLanguage;

describe('PageAdapter (Default Language inference)', () => {
  it('should pass (default language narrowing)', () => {
    const fake = _ as PageAdapter<{
      path: 'testing-pages-root/fake-draft-00';
      url: '/testing-pages-root/fake-draft-00';
      pathWithoutHead: 'fake-draft-00';
      head: 'testing-pages-root';
      tail: 'fake-draft-00';
      nestingLevelTwo: '';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/testing-pages-root/fake-draft-00`;
      path: 'testing-pages-root/fake-draft-00';
      root: 'testing-pages-root';
      lang: DefaultLanguage;
    }>(fake);
  });

  it('should pass (default language narrowing, deep path)', () => {
    const fake = _ as PageAdapter<{
      pathWithoutHead: 'nesting-2/page-00';
      path: 'nesting-1/nesting-2/page-00';
      url: '/nesting-1/nesting-2/page-00';
      nestingLevelTwo: 'nesting-2';
      head: 'nesting-1';
      tail: 'page-00';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/nesting-1/nesting-2/page-00`;
      path: 'nesting-1/nesting-2/page-00';
      lang: DefaultLanguage;
      root: 'nesting-1';
    }>(fake);
  });

  it('should pass (default language narrowing, top root level path)', () => {
    const fake = _ as PageAdapter<{
      pathWithoutHead: 'page-00';
      nestingLevelTwo: '';
      path: 'page-00';
      url: '/page-00';
      tail: 'page-00';
      head: '/';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/page-00`;
      lang: DefaultLanguage;
      path: 'page-00';
      root: '/';
    }>(fake);
  });

  it('should pass (default language narrowing, index notation)', () => {
    const fake = _ as PageAdapter<{
      path: 'testing-pages-root/fake-nesting/index';
      url: '/testing-pages-root/fake-nesting/index';
      pathWithoutHead: 'fake-nesting/index';
      nestingLevelTwo: 'fake-nesting';
      head: 'testing-pages-root';
      tail: 'index';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/testing-pages-root/fake-nesting`;
      path: 'testing-pages-root/fake-nesting';
      root: 'testing-pages-root';
      lang: DefaultLanguage;
    }>(fake);
  });
});

describe('PageAdapter (Valid alternative language)', () => {
  it('should pass (Valid alternative language narrowing)', () => {
    const fake = _ as PageAdapter<{
      path: `${ValidAlternativeLanguage}/testing-pages-root/fake-draft-00`;
      url: `/${ValidAlternativeLanguage}/testing-pages-root/fake-draft-00`;
      pathWithoutHead: 'testing-pages-root/fake-draft-00';
      nestingLevelTwo: 'testing-pages-root';
      head: ValidAlternativeLanguage;
      tail: 'fake-draft-00';
    }>;

    expectType<{
      url: `/${ValidAlternativeLanguage}/testing-pages-root/fake-draft-00`;
      path: 'testing-pages-root/fake-draft-00';
      lang: ValidAlternativeLanguage;
      root: 'testing-pages-root';
    }>(fake);
  });

  it('should pass (Valid alternative language narrowing, deep path)', () => {
    const fake = _ as PageAdapter<{
      path: `${ValidAlternativeLanguage}/nesting-1/nesting-2/page-00`;
      url: `/${ValidAlternativeLanguage}/nesting-1/nesting-2/page-00`;
      pathWithoutHead: 'nesting-1/nesting-2/page-00';
      head: ValidAlternativeLanguage;
      nestingLevelTwo: 'nesting-1';
      tail: 'page-00';
    }>;

    expectType<{
      url: `/${ValidAlternativeLanguage}/nesting-1/nesting-2/page-00`;
      path: 'nesting-1/nesting-2/page-00';
      lang: ValidAlternativeLanguage;
      root: 'nesting-1';
    }>(fake);
  });

  it('should pass (Valid alternative language narrowing, top root level path)', () => {
    const fake = _ as PageAdapter<{
      path: `${ValidAlternativeLanguage}/page-00`;
      url: `/${ValidAlternativeLanguage}/page-00`;
      head: ValidAlternativeLanguage;
      pathWithoutHead: 'page-00';
      nestingLevelTwo: '';
      tail: 'page-00';
    }>;

    expectType<{
      url: `/${ValidAlternativeLanguage}/page-00`;
      lang: ValidAlternativeLanguage;
      path: 'page-00';
      root: '/';
    }>(fake);
  });

  it('should pass (Valid alternative language narrowing, index notation)', () => {
    const fake = _ as PageAdapter<{
      path: `${ValidAlternativeLanguage}/testing-pages-root/fake-nesting/index`;
      url: `/${ValidAlternativeLanguage}/testing-pages-root/fake-nesting/index`;
      pathWithoutHead: 'testing-pages-root/fake-nesting/index';
      nestingLevelTwo: 'testing-pages-root';
      head: ValidAlternativeLanguage;
      tail: 'index';
    }>;

    expectType<{
      url: `/${ValidAlternativeLanguage}/testing-pages-root/fake-nesting`;
      path: 'testing-pages-root/fake-nesting';
      lang: ValidAlternativeLanguage;
      root: 'testing-pages-root';
    }>(fake);
  });
});

describe('PageAdapter (explicit Default Language)', () => {
  it('should pass (explicit default language narrowing)', () => {
    const fake = _ as PageAdapter<{
      path: `${DefaultLanguage}/testing-pages-root/fake-draft-00`;
      url: `/${DefaultLanguage}/testing-pages-root/fake-draft-00`;
      pathWithoutHead: 'testing-pages-root/fake-draft-00';
      nestingLevelTwo: 'testing-pages-root';
      head: DefaultLanguage;
      tail: 'fake-draft-00';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/testing-pages-root/fake-draft-00`;
      path: 'testing-pages-root/fake-draft-00';
      root: 'testing-pages-root';
      lang: DefaultLanguage;
    }>(fake);
  });

  it('should pass (explicit default language narrowing, deep path)', () => {
    const fake = _ as PageAdapter<{
      path: `${DefaultLanguage}/nesting-1/nesting-2/page-00`;
      url: `/${DefaultLanguage}/nesting-1/nesting-2/page-00`;
      pathWithoutHead: 'nesting-1/nesting-2/page-00';
      nestingLevelTwo: 'nesting-1';
      head: DefaultLanguage;
      tail: 'page-00';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/nesting-1/nesting-2/page-00`;
      path: 'nesting-1/nesting-2/page-00';
      lang: DefaultLanguage;
      root: 'nesting-1';
    }>(fake);
  });

  it('should pass (explicit default language narrowing, top root level path)', () => {
    const fake = _ as PageAdapter<{
      path: `${DefaultLanguage}/page-00`;
      url: `/${DefaultLanguage}/page-00`;
      pathWithoutHead: 'page-00';
      head: DefaultLanguage;
      nestingLevelTwo: '';
      tail: 'page-00';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/page-00`;
      lang: DefaultLanguage;
      path: 'page-00';
      root: '/';
    }>(fake);
  });

  it('should pass (explicit default language narrowing, index notation)', () => {
    const fake = _ as PageAdapter<{
      path: `${DefaultLanguage}/testing-pages-root/fake-nesting/index`;
      url: `/${DefaultLanguage}/testing-pages-root/fake-nesting/index`;
      pathWithoutHead: 'testing-pages-root/fake-nesting/index';
      nestingLevelTwo: 'testing-pages-root';
      head: DefaultLanguage;
      tail: 'index';
    }>;

    expectType<{
      url: `/${DefaultLanguage}/testing-pages-root/fake-nesting`;
      path: 'testing-pages-root/fake-nesting';
      root: 'testing-pages-root';
      lang: DefaultLanguage;
    }>(fake);
  });
});
