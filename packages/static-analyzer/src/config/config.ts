import TFlagsAssoc from '../types/flags';

export const ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX = '../../../';

export const FLAGS: TFlagsAssoc = {
  POSTS_FOLDER: '--posts-folder',
  BLOG_CONFIG_FILE: '--blog-config-file',
  I18N_DEFAULT_LOCALE_FILE: '--default-i18n-locale'
};

export const BLOG_ARCHITECTURE_TYPE_NEEDLE: string = 'type BlogArchitecture =';
export const I18N_BLOG_CATEGORIES_OBJ_NEEDLE: string = "'blog-categories':";
export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS = ['_title'];

export const LIST_ELEMENT_PREFIX = '\n - ';
