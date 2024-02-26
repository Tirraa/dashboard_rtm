// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_NESTINGS_NEEDLE, INVALID_NESTING_NEEDLE, INVALID_SLUGS_NEEDLE, INVALID_SLUG_NEEDLE } from '𝕍/needles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it, vi } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_PATH } from '𝕍/commons';
import path from 'path';

import type { VocabKey } from '../../config/translations';

import formatMessage from '../../config/formatMessage';
import sysPagesValidator from '../sysPages';

const VALID_PAGES_FOLDER = path.normalize('./packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder');

const VALID_PAGES_FOLDER_WITH_ONE_UGLY_INDEX_STRATEGY = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy'
);

const VALID_PAGES_FOLDER_WITH_ONE_UGLY_INDEX_STRATEGY_JUST_MOVE = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move'
);

const VALID_PAGES_FOLDER_WITH_ONE_UGLY_INDEX_STRATEGY_JUST_MOVE_AND_ONE_UGLY_INDEX_STRATEGY = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move_and_one_ugly_index_strategy'
);

const VALID_PAGES_FOLDER_WITH_SEVERAL_UGLY_INDEX_STRATEGIES = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies'
);

const INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_SLUG = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_invalid_slug'
);

const INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_SLUGS = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_several_invalid_slugs'
);

const INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_NESTING = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_invalid_nesting'
);

const INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_NESTINGS = path.normalize(
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_several_invalid_nestings'
);

const EMPTY_FEEDBACK = '';

describe('sysPagesValidator', () => {
  it('should throw ENOENT, given invalid path', async () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    try {
      await sysPagesValidator(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should produce an error feedback, given a path to a folder with an invalid page slug', async () => {
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_SLUG);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid page slugs', async () => {
    const LIMIT = 36;
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_SLUGS, LIMIT);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
    expect(feedback.toLowerCase().includes(INVALID_SLUGS_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with an invalid page nesting', async () => {
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_NESTING);
    expect(feedback.toLowerCase().includes(INVALID_NESTING_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid page nestings', async () => {
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_NESTINGS);
    expect(feedback.toLowerCase().includes(INVALID_NESTINGS_NEEDLE)).toBe(true);
  });

  it('should not produce any feedback, given a path to a valid lp posts folder', async () => {
    const { feedback } = await sysPagesValidator(VALID_PAGES_FOLDER);
    expect(feedback).toBe(EMPTY_FEEDBACK);
  });
});

describe('sysPagesValidator (ugly index strategy tests, top-level root)', () => {
  it('should not produce any feedback, but two calls to console.warn', async () => {
    const warnSpy = vi.spyOn(console, 'warn');
    warnSpy.mockImplementation(vi.fn(() => {}));

    const { feedback } = await sysPagesValidator(VALID_PAGES_FOLDER_WITH_ONE_UGLY_INDEX_STRATEGY);
    expect(feedback).toBe(EMPTY_FEEDBACK);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(warnSpy).toHaveBeenCalledTimes(2);

    expect(warnSpy).toHaveBeenCalledWith(formatMessage('uglyIndexStrategyWarning' satisfies VocabKey, { count: 1 }));

    expect(warnSpy).toHaveBeenCalledWith(
      formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, {
        file: path.normalize(
          'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy/hello.mdx'
        ),
        folder: path.normalize(
          'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy/hello'
        )
      }) + '\n'
    );

    warnSpy.mockRestore();
  });

  it('should not produce any feedback, but two calls to console.warn', async () => {
    const warnSpy = vi.spyOn(console, 'warn');
    warnSpy.mockImplementation(vi.fn(() => {}));

    const { feedback } = await sysPagesValidator(VALID_PAGES_FOLDER_WITH_ONE_UGLY_INDEX_STRATEGY_JUST_MOVE);
    expect(feedback).toBe(EMPTY_FEEDBACK);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(warnSpy).toHaveBeenCalledTimes(2);

    expect(warnSpy).toHaveBeenCalledWith(formatMessage('uglyIndexStrategyWarning' satisfies VocabKey, { count: 1 }));

    expect(warnSpy).toHaveBeenCalledWith(
      formatMessage('uglyIndexStrategyWarningJustMoveMsg' satisfies VocabKey, {
        file: path.normalize(
          'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move/index.mdx'
        ),
        folder: path.normalize(
          'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move/index'
        )
      }) + '\n'
    );

    warnSpy.mockRestore();
  });

  it('should not produce any feedback, but two calls to console.warn (merged warnings)', async () => {
    const warnings =
      [
        formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, {
          file: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move_and_one_ugly_index_strategy/hello.mdx'
          ),
          folder: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move_and_one_ugly_index_strategy/hello'
          )
        }),

        formatMessage('uglyIndexStrategyWarningJustMoveMsg' satisfies VocabKey, {
          file: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move_and_one_ugly_index_strategy/index.mdx'
          ),
          folder: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_one_ugly_index_strategy_just_move_and_one_ugly_index_strategy/index'
          )
        })
      ].join('\n') + '\n';

    const warnSpy = vi.spyOn(console, 'warn');
    warnSpy.mockImplementation(vi.fn(() => {}));

    const { feedback } = await sysPagesValidator(VALID_PAGES_FOLDER_WITH_ONE_UGLY_INDEX_STRATEGY_JUST_MOVE_AND_ONE_UGLY_INDEX_STRATEGY);
    expect(feedback).toBe(EMPTY_FEEDBACK);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(warnSpy).toHaveBeenCalledTimes(2);

    expect(warnSpy).toHaveBeenCalledWith(formatMessage('uglyIndexStrategyWarning' satisfies VocabKey, { count: 2 }));

    expect(warnSpy).toHaveBeenCalledWith(warnings);

    warnSpy.mockRestore();
  });
});

describe('sysPagesValidator (ugly index strategy tests, melting pot from hell)', () => {
  it('should not produce any feedback, but two calls to console.warn (merged warnings)', async () => {
    const warnings =
      [
        formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, {
          file: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/comment/ca/va/benoit.mdx'
          ),
          folder: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/comment/ca/va/benoit'
          )
        }),

        formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, {
          file: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/comment/ca.mdx'
          ),
          folder: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/comment/ca'
          )
        }),

        formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, {
          file: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/hello.mdx'
          ),
          folder: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/hello'
          )
        }),

        formatMessage('uglyIndexStrategyWarningJustMoveMsg' satisfies VocabKey, {
          file: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/index.mdx'
          ),
          folder: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/index'
          )
        }),

        formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, {
          file: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/non/je.mdx'
          ),
          folder: path.normalize(
            'packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder_with_several_ugly_index_strategies/non/je'
          )
        })
      ].join('\n') + '\n';

    const warnSpy = vi.spyOn(console, 'warn');
    warnSpy.mockImplementation(vi.fn(() => {}));

    const { feedback } = await sysPagesValidator(VALID_PAGES_FOLDER_WITH_SEVERAL_UGLY_INDEX_STRATEGIES);
    expect(feedback).toBe(EMPTY_FEEDBACK);

    expect(warnSpy).toHaveBeenCalledWith(formatMessage('uglyIndexStrategyWarning' satisfies VocabKey, { count: 5 }));

    expect(warnSpy).toHaveBeenCalledWith(warnings);

    warnSpy.mockRestore();
  });
});
