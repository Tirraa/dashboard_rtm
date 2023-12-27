import { isNotFoundError } from 'next/dist/client/components/not-found';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import BlogConfig from '@/config/blog';

import blogCategoryGuard from '../blogCategoryGuard';

describe('blogCategoryGuard', () => {
  it('should throw not found error, given invalid category', async () => {
    expect.assertions(1);

    try {
      await blogCategoryGuard({
        params: {
          // @ts-expect-error
          [BlogTaxonomy.CATEGORY]: '__INVALID_CATEGORY__',
          [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE
        }
      });
    } catch (e) {
      expect(isNotFoundError(e)).toBe(true);
    }
  });

  it('should not throw not found error, given valid category', () => {
    expect(
      async () =>
        await blogCategoryGuard({
          params: {
            [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
            [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE
          }
        })
    ).not.toThrow();
  });
});

vi.doUnmock('next/navigation');
