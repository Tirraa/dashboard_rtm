import TFlagsAssoc from '../types/flags';

export const FLAGS: TFlagsAssoc = {
  POSTS_FOLDER: '--posts-folder',
  BLOG_CONFIG_FILE: '--blog-config-file',
  I18N_DEFAULT_LOCALE_FILE: '--default-i18n-locale'
};

export const BLOG_CATEGORIES_I18N_ROOT_KEY: string = 'blog-categories';
export const BLOG_ARCHITECTURE_TYPE_STR: string = 'BlogArchitecture';

export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = ['_title'];
export const LIST_ELEMENT_PREFIX: string = '\n - ';

export const BLOG_ARCHITECTURE_TYPE_NEEDLE: string = `type ${BLOG_ARCHITECTURE_TYPE_STR} =`;
export const I18N_BLOG_CATEGORIES_OBJ_NEEDLE: string = `'${BLOG_CATEGORIES_I18N_ROOT_KEY}':`;

export const ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX: string = '../../../';
