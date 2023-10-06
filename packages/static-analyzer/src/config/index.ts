import TFlagsAssoc from '../types/flags';

export const FLAGS: TFlagsAssoc = {
  POSTS_FOLDER: '--posts-folder',
  BLOG_CONFIG_FILE: '--blog-config-file',
  I18N_DEFAULT_LOCALE_FILE: '--default-i18n-locale',
  SKIP_LOCALES_INFOS: '--skip-locales-infos'
};

export const LOCALES_INFOS_ROOT_KEY: string = '_infos';
export const BLOG_CATEGORIES_I18N_ROOT_KEY: string = 'blog-categories';
export const BLOG_ARCHITECTURE_TYPE_STR: string = 'BlogArchitecture';

export const LOCALES_LNG_INFOS_KEY: string = 'lng';
export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = ['_title', '_meta-description'];
export const I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = ['title', 'meta-description'];
export const LIST_ELEMENT_PREFIX: string = '\n - ';

export const BLOG_ARCHITECTURE_TYPE_NEEDLE: string = `type ${BLOG_ARCHITECTURE_TYPE_STR} =`;
export const I18N_BLOG_CATEGORIES_OBJ_NEEDLE: string = `'${BLOG_CATEGORIES_I18N_ROOT_KEY}':`;

export const ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX: string = '../../../';
