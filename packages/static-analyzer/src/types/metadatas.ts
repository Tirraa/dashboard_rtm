export type UnknownI18nJSONObj = Record<string, unknown>;
export type SubCategory = string;
export type Category = string;

type SubCategories = SubCategory[];
export type CategoriesMetadatas = Record<Category, SubCategories>;
export type DeclaredCategoriesMetadatas = CategoriesMetadatas;

type UnknownI18nJSONProp = string | UnknownI18nJSONObj;
export type I18nJSONPart = Record<string, UnknownI18nJSONProp>;

export type ErrorsDetectionFeedback = string;
export type MaybeEmptyErrorsDetectionFeedback = '' | ErrorsDetectionFeedback;
