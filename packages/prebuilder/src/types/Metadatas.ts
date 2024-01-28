/* v8 ignore start */
// Stryker disable all
export type Page = {
  nestingLevelTwo: PathSegment | PageRoot | '';
  head: I18nLanguageFlag | PageRoot | '/';
  pathWithoutHead: Path;
  tail: PathSegment;
  path: Path;
  url: Path;
};
type PageRoot = string;
export type BlogSubcategory = string;
export type BlogCategory = string;
export type BlogSlug = string;
type LpCategory = string;
export type LpSlug = string;
type I18nLanguageFlag = string;

export type PagesMetadatas = Record<PageRoot, Page[]>;
export type CategoriesMetadatasEntity = Record<BlogSubcategory, Record<I18nLanguageFlag, BlogSlug[]>>;
export type CategoriesMetadatas = Record<BlogCategory, CategoriesMetadatasEntity>;
type LpMetadatasEntity = Record<I18nLanguageFlag, LpSlug[]>;
export type LpMetadatas = Record<LpCategory, LpMetadatasEntity>;

type JSONKey = string;
type UnknownI18nJSONProp = UnknownI18nJSONObj | string;
type UnknownI18nJSONObj = Record<JSONKey, unknown>;
export type I18nJSONPart = Record<JSONKey, UnknownI18nJSONProp>;

export type ErrorsDetectionFeedback = string;
export type MaybeEmptyErrorsDetectionFeedback = ErrorsDetectionFeedback | '';

export type File = {
  directory: string;
  name: string;
};
export type ProcessedFile = { directoriesChain: string[]; filename: string };
export type Arborescence = ProcessedFile[];

export type Path = string;
export type PathSegment = string;
export type Filename = string;
// Stryker restore all
/* v8 ignore stop */
