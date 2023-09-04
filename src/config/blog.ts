import { BlogCategory, ForcedBlogSubCategoriesPaths, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

export type BlogArchitecture = {
  'patch-notes': 'dashboard' | 'discord-bot';
};

export namespace BlogConfig {
  export const DISPLAYED_BLOG_POST_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT = 2;
  export const BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT = 250;

  export const BLOG_CATEGORIES_ALL_POSTS_TYPES_ASSOC: PostsCollectionAssoc<BlogCategory> = {
    'patch-notes': () => allPatchPosts
  };

  export const FORCED_BLOG_SUBCATEGORIES_PATHS: ForcedBlogSubCategoriesPaths = {
    'patch-notes': ['dashboard', 'discord-bot']
  };
}

export default BlogConfig;
