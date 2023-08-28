import { PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

enum EBlogCategory {
  'patch-notes'
}
export type BlogCategory = keyof typeof EBlogCategory & string;

export namespace BlogConfig {
  export const blogPostPeviewDescriptionCharactersLimit = 250;
  export const blogCategoriesAllPostsTypesAssoc: PostsCollectionAssoc<BlogCategory> = { 'patch-notes': () => allPatchPosts };
}

export default BlogConfig;
