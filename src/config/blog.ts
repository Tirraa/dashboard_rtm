import { AllPostsTypesAssoc, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

export type BlogCategory = 'patch-notes'; // 'categ1' | 'categ2' | 'categ3'
export type PatchPostSubCategory = 'dashboard' | 'discord-bot';
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
