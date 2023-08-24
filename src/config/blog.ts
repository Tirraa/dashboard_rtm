import { BlogCategory, BlogSubCategory, PatchPostSubCategory, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

const allPatchPostsTypesAssoc: PostsCollectionAssoc<PatchPostSubCategory> = {
  dashboard: () => allPatchPosts,
  'discord-bot': () => allPatchPosts
};

export namespace BlogConfig {
  export const blogPostPeviewDescriptionCharactersLimit = 250;
  export const allPostsTypesAssoc: Record<BlogCategory, PostsCollectionAssoc<BlogSubCategory>> = {
    'patch-notes': { ...allPatchPostsTypesAssoc }
  };
  export const blogCategoriesAllPostsTypesAssoc: PostsCollectionAssoc<BlogCategory> = { 'patch-notes': () => allPatchPosts };
}

export default BlogConfig;
