export type UnknownI18nJSONObj = Record<string, unknown>;
export type Subcategory = string;
export type Category = string;

type Subcategories = Subcategory[];
export type CategoriesMetadatas = Record<Category, Subcategories>;
export type DeclaredCategoriesMetadatas = CategoriesMetadatas;

type UnknownI18nJSONProp = string | UnknownI18nJSONObj;
export type I18nJSONPart = Record<string, UnknownI18nJSONProp>;

export type ErrorsDetectionFeedback = string;
export type MaybeEmptyErrorsDetectionFeedback = '' | ErrorsDetectionFeedback;

export type File = {
  fileDirectory: string;
  filename: string;
};

export type Path = string;
export type Filename = string;
export type i18nField = string;
