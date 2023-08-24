import { allPatchPosts } from 'contentlayer/generated';
import { BlogCategory, BlogSubCategory, PatchPostSubCategory, PostsCollectionAssoc } from '../_types/Blog';

const allPatchPostsTypesAssoc: PostsCollectionAssoc<PatchPostSubCategory> = {
  dashboard: () => allPatchPosts,
  'discord-bot': () => allPatchPosts
};

export namespace BlogConfig {
  export const blogPostPeviewDescriptionCharactersLimit = 250;
  export const allPostsTypesAssoc: PostsCollectionAssoc<BlogSubCategory> = { ...allPatchPostsTypesAssoc };
  export const blogCategoriesAllPostsTypesAssoc: PostsCollectionAssoc<BlogCategory> = { 'patch-notes': () => allPatchPosts };
}

export default BlogConfig;
