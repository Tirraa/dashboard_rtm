import { allPatchPosts } from 'contentlayer/generated';
import { BlogCategory, PatchPostCategory, PostsCollectionAssoc } from '../_types/Blog';

const allPatchPostsTypesAssoc: PostsCollectionAssoc<PatchPostCategory> = {
  dashboard: () => allPatchPosts,
  'discord-bot': () => allPatchPosts
};

export namespace BlogConfig {
  export const blogPostPeviewDescriptionCharactersLimit = 250;

  export const allPostsTypesAssoc: PostsCollectionAssoc<BlogCategory> = {
    ...allPatchPostsTypesAssoc
  };
}

export default BlogConfig;
