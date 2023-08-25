import BlogConfig from '@/config/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogCategory, BlogSlug, BlogSubCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import getServerSidePathnameWorkaround from './misc/getServerSidePathname';
import { getLastPathStrPart } from './str';

export function getBlogCategoryFromPathname(pathname: string) {
  const firstIndex = pathname.indexOf('/');
  if (firstIndex !== -1) {
    const secondIndex = pathname.indexOf('/', firstIndex + 1);
    if (secondIndex !== -1) return pathname.substring(firstIndex + 1, secondIndex);
    return pathname.substring(firstIndex + 1);
  }
  return pathname;
}

export function getBlogPostSubCategoryBasedOnPostObj(post: PostBase) {
  const { sourceFileDir } = post._raw;
  return getLastPathStrPart(sourceFileDir);
}

export function getBlogPostSubCategory(post: PostBase) {
  return getBlogPostSubCategoryBasedOnPostObj(post);
}

export function getBlogPostSlug(post: PostBase) {
  return getLastPathStrPart(post._raw.flattenedPath);
}

export function getBlogPostSubCategoryAndSlugStr(post: PostBase) {
  return `${getBlogPostSubCategory(post)}/${getBlogPostSlug(post)}`;
}

export const getAllPostsByCategoryAndSubCategory = (categ: BlogCategory, subCateg: BlogSubCategory): PostBase[] =>
  BlogConfig.allPostsTypesAssoc[categ][subCateg]();

export function getPost(targettedCateg: BlogCategory, targettedSubCateg: BlogSubCategory, targettedSlug: BlogSlug): undefined | PostBase {
  const postsCollection: PostBase[] = getAllPostsByCategoryAndSubCategory(targettedCateg, targettedSubCateg);
  return postsCollection.find((post) => getBlogPostSubCategoryAndSlugStr(post) === `${targettedSubCateg}/${targettedSlug}`);
}

export function adHocBlogPostsParamsRestBuilder() {
  const params2 = { [BlogTaxonomy.category]: getBlogCategoryFromPathname(getServerSidePathnameWorkaround()) as BlogCategory };
  return params2;
}
