import { BlogCategory, ForcedBlogSubCategoriesPaths, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

export type BlogsArchitectures = {
  'patch-notes': 'dashboard' | 'discord-bot';
  'patch-notes-bis': 'dashboard-bis' | 'discord-bot-bis';
};

export namespace BlogConfig {
  export const displayedBlogPostsPerSubCategoryOnBlogCategoryPageLimit = 2;
  export const blogPostPeviewDescriptionCharactersLimit = 250;
  export const blogCategoriesAllPostsTypesAssoc: PostsCollectionAssoc<BlogCategory> = {
    'patch-notes': () => allPatchPosts,
    'patch-notes-bis': () => allPatchPosts
  };
  export const forcedBlogSubCategoriesPaths: ForcedBlogSubCategoriesPaths = {
    'patch-notes': ['dashboard', 'discord-bot'],
    'patch-notes-bis': ['dashboard-bis']
  };
}

export default BlogConfig;
