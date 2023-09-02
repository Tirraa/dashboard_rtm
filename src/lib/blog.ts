import BlogConfig, { BlogsArchitectures } from '@/config/blog';
import { fallbackLng as DEFAULT_LANGUAGE } from '@/config/i18n';
import { BlogCategory, BlogSlug, UnknownCategoryAndUnknownSubCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { LanguageFlag } from '@/types/i18n';
import { getBlogPostLanguageFlag } from './i18n';
import { buildPathFromParts, getLastPathStrPart, indexOfNthOccurrence } from './str';

const getBlogPostSubCategoryAndSlugStr = (post: PostBase): string => buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post));

const getBlogPostSubCategoryAndSlugStrAndLangFlag = (post: PostBase): string =>
  buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post), getBlogPostLanguageFlag(post));

export function getBlogCategoryFromPathname(pathname: string): string {
  const firstIndex = indexOfNthOccurrence(pathname, '/', 1);
  if (firstIndex !== -1) {
    const secondIndex = indexOfNthOccurrence(pathname, '/', 2);
    if (secondIndex !== -1) return pathname.substring(firstIndex + 1, secondIndex);
    return pathname.substring(firstIndex + 1);
  }
  return pathname;
}

function getBlogPostSubCategoryFromStr(sourceFileDir: string): '' | string {
  function subCategGetter(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): string {
    if (secondSlashIndex !== -1) return sourceFileDir.slice(firstSlashIndex + 1, secondSlashIndex);
    return sourceFileDir.slice(firstSlashIndex + 1);
  }

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex !== -1) {
    const secondSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
    const subCateg = subCategGetter(sourceFileDir, firstSlashIndex, secondSlashIndex);
    return subCateg;
  }
  return '';
}

function getBlogPostSubCategoryFromPostObj(post: PostBase): '' | string {
  const { sourceFileDir } = post._raw;
  return getBlogPostSubCategoryFromStr(sourceFileDir);
}

export const getBlogPostSubCategory = (post: PostBase): '' | string => getBlogPostSubCategoryFromPostObj(post);
export const getBlogPostSlug = (post: PostBase): BlogSlug => getLastPathStrPart(post._raw.flattenedPath);
export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.blogCategoriesAllPostsTypesAssoc[categ]();
export const getAllPostsByCategoryAndSubCategoryUnstrict = ({ category, subCategory }: UnknownCategoryAndUnknownSubCategory): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubCategory(post) === subCategory);

export function getPostUnstrict(
  { category, subCategory }: UnknownCategoryAndUnknownSubCategory,
  targettedSlug: BlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategoryUnstrict({ category, subCategory });

  if (langFlag === DEFAULT_LANGUAGE) {
    return postsCollection.find((post) => getBlogPostSubCategoryAndSlugStr(post) === buildPathFromParts(subCategory, targettedSlug));
  }
  return postsCollection.find(
    (post) => getBlogPostSubCategoryAndSlugStrAndLangFlag(post) === buildPathFromParts(subCategory, targettedSlug, langFlag)
  );
}

export const getAllPostsByCategoryAndSubCategoryStrict = <Category extends keyof BlogsArchitectures>(
  category: Category,
  subCategory: BlogsArchitectures[Category]
): PostBase[] => getAllPostsByCategoryAndSubCategoryUnstrict({ category, subCategory });

export function getPostStrict<Category extends keyof BlogsArchitectures>(
  category: Category,
  subCategory: BlogsArchitectures[Category],
  targettedSlug: BlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  return getPostUnstrict({ category, subCategory }, targettedSlug, langFlag);
}

export const getAllCategories = (): BlogCategory[] => Object.keys(BlogConfig.blogCategoriesAllPostsTypesAssoc) as BlogCategory[];
