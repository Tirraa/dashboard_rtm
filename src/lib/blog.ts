import BlogConfig from '@/config/blog';
import { fallbackLng as DEFAULT_LANGUAGE } from '@/i18n/settings';
import { BlogCategory, BlogSlug, CategoryAndSubcategory } from '@/types/Blog';
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
//export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.blogCategoriesAllPostsTypesAssoc[categ]();
export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.blogCategoriesAllPostsTypesAssoc['patch-notes']();

export const getAllPostsByCategoryAndSubCategory = <C extends BlogCategory>({ category, subCategory }: CategoryAndSubcategory<C>): PostBase[] =>
  getAllPostsByCategory(category).filter((post) => getBlogPostSubCategory(post) === subCategory);

export function getPost<C extends BlogCategory>(
  { category, subCategory }: CategoryAndSubcategory<C>,
  targettedSlug: BlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategory({ category, subCategory });

  if (langFlag === DEFAULT_LANGUAGE) {
    return postsCollection.find((post) => getBlogPostSubCategoryAndSlugStr(post) === buildPathFromParts(subCategory, targettedSlug));
  }
  return postsCollection.find(
    (post) => getBlogPostSubCategoryAndSlugStrAndLangFlag(post) === buildPathFromParts(subCategory, targettedSlug, langFlag)
  );
}

export const getAllCategories = (): BlogCategory[] => Object.keys(BlogConfig.blogCategoriesAllPostsTypesAssoc) as BlogCategory[];
