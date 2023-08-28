import { fallbackLng as DEFAULT_LANGUAGE } from '@/app/i18n/settings';
import BlogConfig, { BlogCategory, BlogSubCategory } from '@/config/blog';
import { LanguageFlag } from '@/config/i18n';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogSlug } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { PathnameSegment } from '@/types/Next';
import { getBlogPostLanguageFlag } from './i18n';
import getServerSidePathnameWorkaround from './misc/getServerSidePathname';
import { buildPathFromParts, getLastPathStrPart, indexOfNthOccurrence } from './str';

const getBlogPostSubCategoryAndSlugStr = (post: PostBase): string => buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post));

const getBlogPostSubCategoryAndSlugStrAndLangFlag = (post: PostBase): string =>
  buildPathFromParts(getBlogPostSubCategory(post), getBlogPostSlug(post), getBlogPostLanguageFlag(post));

export function getBlogCategoryFromPathname(pathname: string) {
  const firstIndex = indexOfNthOccurrence(pathname, '/', 1);
  if (firstIndex !== -1) {
    const secondIndex = indexOfNthOccurrence(pathname, '/', 2);
    if (secondIndex !== -1) return pathname.substring(firstIndex + 1, secondIndex);
    return pathname.substring(firstIndex + 1);
  }
  return pathname;
}

function getBlogPostSubCategoryFromStr(sourceFileDir: string) {
  function subCategGetter(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): string {
    if (secondSlashIndex !== -1) return sourceFileDir.slice(firstSlashIndex + 1, secondSlashIndex);
    return sourceFileDir.slice(firstSlashIndex + 1);
  }

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex !== -1) {
    const secondSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
    const subCateg = subCategGetter(sourceFileDir, firstSlashIndex, secondSlashIndex);
    return subCateg as BlogSubCategory;
  }
  return '';
}

function getBlogPostSubCategoryFromPostObj(post: PostBase): '' | BlogSubCategory {
  const { sourceFileDir } = post._raw;
  return getBlogPostSubCategoryFromStr(sourceFileDir);
}

export const getBlogPostSubCategory = (post: PostBase): '' | BlogSubCategory => getBlogPostSubCategoryFromPostObj(post);
export const getBlogPostSlug = (post: PostBase): PathnameSegment => getLastPathStrPart(post._raw.flattenedPath);
export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.blogCategoriesAllPostsTypesAssoc[categ]();
export const getAllPostsByCategoryAndSubCategory = (categ: BlogCategory, subCateg: BlogSubCategory): PostBase[] =>
  BlogConfig.allPostsTypesAssoc[categ][subCateg]();

export function getPost(
  targettedCateg: BlogCategory,
  targettedSubCateg: BlogSubCategory,
  targettedSlug: BlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategory(targettedCateg, targettedSubCateg);

  if (langFlag === DEFAULT_LANGUAGE) {
    return postsCollection.find((post) => getBlogPostSubCategoryAndSlugStr(post) === buildPathFromParts(targettedSubCateg, targettedSlug));
  }
  return postsCollection.find(
    (post) => getBlogPostSubCategoryAndSlugStrAndLangFlag(post) === buildPathFromParts(targettedSubCateg, targettedSlug, langFlag)
  );
}

export function adHocBlogPostsParamsRestBuilder() {
  const params2 = { [BlogTaxonomy.category]: getBlogCategoryFromPathname(getServerSidePathnameWorkaround()) as BlogCategory };
  return params2;
}
