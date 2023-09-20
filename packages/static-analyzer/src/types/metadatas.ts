type UnknownI18nJSONProp = string | object;
type SubCategories = string[];
export type Category = string;
export type CategoriesMetadatas = Record<Category, SubCategories>;
export type DeclaredCategoriesMetadatas = CategoriesMetadatas;
export type I18nJSONPart = Record<string, UnknownI18nJSONProp>;
export type ErrorsDetectionFeedback = string;
