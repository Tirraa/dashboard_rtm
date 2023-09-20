type ValueOfTFlagsAssoc = string;

export type TFlagsAssoc = {
  POSTS_FOLDER: ValueOfTFlagsAssoc;
  BLOG_CONFIG_FILE: ValueOfTFlagsAssoc;
  I18N_DEFAULT_LOCALE_FILE: ValueOfTFlagsAssoc;
};

export type MaybeIncorrectTFlagsAssoc = Record<keyof TFlagsAssoc, ValueOfTFlagsAssoc | undefined>;

export default TFlagsAssoc;
