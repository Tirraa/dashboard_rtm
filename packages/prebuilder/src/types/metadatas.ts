type Subcategory = string;
type Category = string;

type Subcategories = Subcategory[];
export type CategoriesMetadatas = Record<Category, Subcategories>;

type JSONKey = string;
type UnknownI18nJSONProp = string | UnknownI18nJSONObj;
export type UnknownI18nJSONObj = Record<JSONKey, unknown>;
export type I18nJSONPart = Record<JSONKey, UnknownI18nJSONProp>;

export type ErrorsDetectionFeedback = string;
export type MaybeEmptyErrorsDetectionFeedback = '' | ErrorsDetectionFeedback;

export type File = {
  fileDirectory: string;
  filename: string;
};

export type Path = string;
export type Filename = string;
