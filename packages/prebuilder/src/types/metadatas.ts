export type BlogSubcategory = string;
export type BlogCategory = string;
export type BlogSlug = string;
type I18nLanguageFlag = string;
export type CategoriesMetadatasEntity = Record<BlogSubcategory, Record<I18nLanguageFlag, BlogSlug[]>>;
export type CategoriesMetadatas = Record<BlogCategory, CategoriesMetadatasEntity>;

type JSONKey = string;
type UnknownI18nJSONProp = UnknownI18nJSONObj | string;
export type UnknownI18nJSONObj = Record<JSONKey, unknown>;
export type I18nJSONPart = Record<JSONKey, UnknownI18nJSONProp>;

export type ErrorsDetectionFeedback = string;
export type MaybeEmptyErrorsDetectionFeedback = ErrorsDetectionFeedback | '';

export type File = {
  fileDirectory: string;
  filename: string;
};

export type Path = string;
export type Filename = string;
