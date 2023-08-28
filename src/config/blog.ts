import { AllPostsTypesAssoc, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

enum EBlogCategory {
  'patch-notes'
}
export type BlogCategory = keyof typeof EBlogCategory & string;

enum EPatchPostSubCategory {
  dashboard,
  'discord-bot'
}
export type PatchPostSubCategory = keyof typeof EPatchPostSubCategory & string;

export type BlogSubCategory = PatchPostSubCategory & string; // (A | B | C | D) & string

const allPatchPostsTypesAssoc: PostsCollectionAssoc<PatchPostSubCategory> = {
  dashboard: () => allPatchPosts,
  'discord-bot': () => allPatchPosts
};

export namespace BlogConfig {
  export const blogPostPeviewDescriptionCharactersLimit = 250;
  export const allPostsTypesAssoc: AllPostsTypesAssoc = {
    'patch-notes': { ...allPatchPostsTypesAssoc }
  };
  export const blogCategoriesAllPostsTypesAssoc: PostsCollectionAssoc<BlogCategory> = { 'patch-notes': () => allPatchPosts };
}

export default BlogConfig;
