import { isNotFoundError } from 'next/dist/client/components/not-found';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';
import BlogConfig from '@/config/blog';

import blogCategoryGuard from '../blogCategoryGuard';

describe('blogCategoryGuard', () => {
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
    } catch (interceptedError) {
      expect(isNotFoundError(interceptedError)).toBe(true);
    }
  });
});
