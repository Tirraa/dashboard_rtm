type ValueOfTFlagsAssoc = string;

export type TFlagsAssoc = {
  POSTS_FOLDER: ValueOfTFlagsAssoc;
  BLOG_CONFIG_FILEPATH: ValueOfTFlagsAssoc;
  I18N_LOCALES_SCHEMA_FILEPATH: ValueOfTFlagsAssoc;
  SKIP_LOCALES_INFOS: ValueOfTFlagsAssoc;
};

export type MaybeIncorrectTFlagsAssoc = Record<keyof TFlagsAssoc, ValueOfTFlagsAssoc | undefined>;

export default TFlagsAssoc;
