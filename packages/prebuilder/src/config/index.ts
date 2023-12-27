/* ⚙️ Tweakers - SAFE */
export const MAX_TAXONOMY_LEN: number = 34;

/* ⚠️ Tweakers - UNSAFE (type checked: will break the build if invalid) */
export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = ['title', 'meta-description'];
export const I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = ['title', 'meta-description'];

/* ⛔ Do NOT edit the code BELOW this line unless you (really) know what you are doing */
export const FLAGS = {
  I18N_LOCALES_SCHEMA_FILEPATH: '--i18n-locales-schema',
  SKIP_LOCALES_INFOS: '--skip-locales-infos',
  BLOG_POSTS_FOLDER: '--blog-posts-folder',
  NO_BLOG: '--no-blog',
  NO_I18N: '--no-i18n'
} as const;
export const LIST_ELEMENT_PREFIX: string = '\n - ';
export const TS_MORPH_FORMATTER_SETTINGS = { ensureNewLineAtEndOfFile: true, indentSize: 2 };

export const BLOG_POST_FILE_EXT: string = '.mdx';
export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_PREFIX: string = '_';
export const BLOG_TYPE_STR: string = 'Blog';
export const BLOG_ARCHITECTURE_TYPE_STR: string = 'BlogArchitecture';
export const BLOG_CATEGORIES_CONST_STR: string = 'blogCategories';
export const GENERATIONS_TARGET_FOLDER = '.rtm-generated';

export const LOCALES_INFOS_ROOT_KEY: string = '_infos';
export const LOCALES_LNG_INFOS_KEY: string = 'lng';
export const LOCALES_INFOS_OBJ_NEEDLE: string = `${LOCALES_INFOS_ROOT_KEY}:`;
export const ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX: string = '../../../';
export const BLOG_ARCHITECTURE_METADATAS_DEFAULT_LANGUAGE_KEY: string = 'DEFAULT_LANGUAGE';
export const AUTOGENERATED_CODE_COMMENT_STR = "// AUTOGENERATED: Don't edit this file!\n";
