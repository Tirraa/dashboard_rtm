// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect, it, vi } from 'vitest';

import ArgumentsValidatorError from '../../errors/ArgumentsValidatorError';
import parseArguments from '../arguments';
import { FLAGS } from '../../config';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';
const NOT_A_DIRECTORY_NEEDLE = 'NOT a directory'.toLowerCase();
const NOT_A_FILE_NEEDLE = 'NOT a file'.toLowerCase();
const CANT_OPEN_NEEDLE = "Can't open".toLowerCase();
const CANT_USE_NEEDLE = "can't use".toLocaleLowerCase();
const CANT_OMIT_NEEDLE = "can't omit".toLocaleLowerCase();
const FEATURE_RELIES_ON_ANOTHER_FEATURE_NEEDLE = 'feature relies on'.toLocaleLowerCase();

const VALID_BLOG_POSTS_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_posts_folders/valid_fake_posts_folder';

const INVALID_BLOG_POSTS_FOLDER_NOT_A_DIR = './packages/prebuilder/src/validators/__tests__/fake_posts_folders/invalid_fake_posts_folder.FAKE_EXT';

const VALID_I18N_LOCALES_SCHEMA_FILEPATH = './packages/prebuilder/src/validators/__tests__/fake_locales/valid_fake_locales/schema.ts';

const INVALID_I18N_LOCALES_SCHEMA_FILEPATH_NOT_A_FILE =
  './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_schema_dir/schema.ts';

describe('parseArguments unhappy paths (sys)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw, given unknown args', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    argvSpy.mockReturnValue(['_', '_', '--__unknown_arg1', 'foo', '--_unknown_arg2', 'bar']);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);
  });

  it('should throw, given valid args schema, but invalid posts folder path (not a directory)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.BLOG_POSTS_FOLDER, INVALID_BLOG_POSTS_FOLDER_NOT_A_DIR,
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(NOT_A_DIRECTORY_NEEDLE)).toBe(true);
    }
  });

  it('should throw, given valid args schema, but invalid schema path (not a file)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.BLOG_POSTS_FOLDER, VALID_BLOG_POSTS_FOLDER,
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, INVALID_I18N_LOCALES_SCHEMA_FILEPATH_NOT_A_FILE
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(NOT_A_FILE_NEEDLE)).toBe(true);
    }
  });

  it('should throw, given valid args schema, but both invalid posts folder path & invalid schema path (not a directory, not a file)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.BLOG_POSTS_FOLDER, INVALID_BLOG_POSTS_FOLDER_NOT_A_DIR,
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, INVALID_I18N_LOCALES_SCHEMA_FILEPATH_NOT_A_FILE
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);
  });

  it("should throw, given valid args schema, but invalid posts folder path (can't open)", () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.BLOG_POSTS_FOLDER, INVALID_PATH,
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(CANT_OPEN_NEEDLE)).toBe(true);
    }
  });

  it("should throw, given valid args schema, but invalid schema path (can't open)", () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.BLOG_POSTS_FOLDER, VALID_BLOG_POSTS_FOLDER,
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, INVALID_PATH
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(CANT_OPEN_NEEDLE)).toBe(true);
    }
  });

  it("should throw, given valid args schema, but both invalid posts folder path & invalid schema path (can't open)", () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    argvSpy.mockReturnValue(['_', '_', FLAGS.BLOG_POSTS_FOLDER, INVALID_PATH, FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, INVALID_PATH]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);
  });
});

describe('parseArguments unhappy paths (invalid args combinators: both disabling and calling a tool)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw, given conflicting args (both any blog option & no blog option)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH,
      FLAGS.BLOG_POSTS_FOLDER, VALID_BLOG_POSTS_FOLDER,
      FLAGS.NO_BLOG
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(CANT_USE_NEEDLE)).toBe(true);
    }
  });

  it('should throw, given conflicting args (both any i18n option & no i18n option)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH,
      FLAGS.BLOG_POSTS_FOLDER, VALID_BLOG_POSTS_FOLDER,
      FLAGS.NO_I18N
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(CANT_USE_NEEDLE)).toBe(true);
    }
  });

  it('should throw, given conflicting args (omitting i18n locales schema filepath option without no i18n option)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
       VALID_I18N_LOCALES_SCHEMA_FILEPATH,
       FLAGS.NO_BLOG
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(CANT_OMIT_NEEDLE)).toBe(true);
    }
  });

  it('should throw, given conflicting args (both any blog option & no blog option)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH,
      FLAGS.BLOG_POSTS_FOLDER, VALID_BLOG_POSTS_FOLDER,
      FLAGS.NO_BLOG
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(CANT_USE_NEEDLE)).toBe(true);
    }
  });
});

describe('parseArguments unhappy paths (invalid args combinators: breaking dependencies)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw, given conflicting args (both any blog option & no i18n option)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.I18N_LOCALES_SCHEMA_FILEPATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH,
      FLAGS.BLOG_POSTS_FOLDER, VALID_BLOG_POSTS_FOLDER,
      FLAGS.NO_BLOG
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(CANT_USE_NEEDLE)).toBe(true);
    }
  });

  it('should throw, given conflicting args (both any i18n option & no i18n option)', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.BLOG_POSTS_FOLDER, VALID_BLOG_POSTS_FOLDER,
      FLAGS.NO_I18N
    ]);

    expect(() => parseArguments()).toThrow(ArgumentsValidatorError);

    try {
      parseArguments();
    } catch (e) {
      const interceptedError = e as Error;
      expect(interceptedError.message.toLowerCase().includes(FEATURE_RELIES_ON_ANOTHER_FEATURE_NEEDLE)).toBe(true);
    }
  });
});

describe('parseArguments vacuous path (disabling all tools)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should pass, disabling all tools', () => {
    const argvSpy = vi.spyOn(process, 'argv', 'get');
    // prettier-ignore
    argvSpy.mockReturnValue([
      '_', '_',
      FLAGS.NO_BLOG, FLAGS.NO_I18N
    ]);

    expect(() => parseArguments()).not.toThrow(ArgumentsValidatorError);
  });
});
