import BlogConfig from '@/config/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogCategory, BlogSlug, BlogSubCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { PathnameSegment } from '@/types/Next';
import getServerSidePathnameWorkaround from './misc/getServerSidePathname';
import { getLastPathStrPart } from './str';

const getFormattedBlogPostSubCategoryAndSlugStr = (sa: string, sb: string): string => `${sa}/${sb}`;
const getBlogPostSubCategoryAndSlugStr = (post: PostBase): string =>
  getFormattedBlogPostSubCategoryAndSlugStr(getBlogPostSubCategory(post), getBlogPostSlug(post));

export function getBlogCategoryFromPathname(pathname: string) {
  const firstIndex = pathname.indexOf('/');
  if (firstIndex !== -1) {
    const secondIndex = pathname.indexOf('/', firstIndex + 1);
    if (secondIndex !== -1) return pathname.substring(firstIndex + 1, secondIndex);
    return pathname.substring(firstIndex + 1);
  }
  return pathname;
}

export function getBlogPostSubCategoryBasedOnPostObj(post: PostBase): '' | BlogSubCategory {
  function subCategGetter(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): string {
    if (secondSlashIndex !== -1) return sourceFileDir.slice(firstSlashIndex + 1, secondSlashIndex);
    return sourceFileDir.slice(firstSlashIndex + 1);
  }

  const { sourceFileDir } = post._raw;
  const firstSlashIndex = sourceFileDir.indexOf('/');
  if (firstSlashIndex !== -1) {
    const secondSlashIndex = sourceFileDir.indexOf('/', firstSlashIndex + 1);
    const subCateg = subCategGetter(sourceFileDir, firstSlashIndex, secondSlashIndex);
    return subCateg as BlogSubCategory;
  }
  return '';
}

export const getBlogPostSubCategory = (post: PostBase): '' | BlogSubCategory => getBlogPostSubCategoryBasedOnPostObj(post);
export const getBlogPostSlug = (post: PostBase): PathnameSegment => getLastPathStrPart(post._raw.flattenedPath);
export const getAllPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.blogCategoriesAllPostsTypesAssoc[categ]();
export const getAllPostsByCategoryAndSubCategory = (categ: BlogCategory, subCateg: BlogSubCategory): PostBase[] =>
  BlogConfig.allPostsTypesAssoc[categ][subCateg]();

export function getPost(targettedCateg: BlogCategory, targettedSubCateg: BlogSubCategory, targettedSlug: BlogSlug): undefined | PostBase {
  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategory(targettedCateg, targettedSubCateg);
  return postsCollection.find(
    (post) => getBlogPostSubCategoryAndSlugStr(post) === getFormattedBlogPostSubCategoryAndSlugStr(targettedSubCateg, targettedSlug)
  );
}

export function adHocBlogPostsParamsRestBuilder() {
  const params2 = { [BlogTaxonomy.category]: getBlogCategoryFromPathname(getServerSidePathnameWorkaround()) as BlogCategory };
  return params2;
}
