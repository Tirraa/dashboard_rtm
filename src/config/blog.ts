import { ForcedBlogSubCategoriesPaths, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

enum EBlogCategory {
  'patch-notes'
}
export type BlogCategory = keyof typeof EBlogCategory & string;

export namespace BlogConfig {
  export const displayedBlogPostsPerSubCategoryOnBlogCategoryPageLimit = 2;
  export const blogPostPeviewDescriptionCharactersLimit = 250;
  export const blogCategoriesAllPostsTypesAssoc: PostsCollectionAssoc<BlogCategory> = { 'patch-notes': () => allPatchPosts };
  export const forcedBlogSubCategoriesPaths: ForcedBlogSubCategoriesPaths = { 'patch-notes': ['dashboard', 'discord-bot'] };
}

export default BlogConfig;
