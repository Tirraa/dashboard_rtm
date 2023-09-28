import { BlogCategory, ForcedBlogSubCategoriesPaths, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPostBis, allPatchPosts } from 'contentlayer/generated';

type TBlogConfig = {
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: number;
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: number;
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: number;
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: PostsCollectionAssoc<BlogCategory>;
  FORCED_BLOG_SUBCATEGORIES_PATHS: ForcedBlogSubCategoriesPaths;
};

export type BlogArchitecture = {
  'patch-notes': 'dashboard' | 'discord-bot';
  'patch-notes-bis': 'dashboard-bis' | 'discord-bot-bis';
};

export const BlogConfig: TBlogConfig = {
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: 5,
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: 2,
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: 250,

  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: {
    'patch-notes': () => allPatchPosts,
    'patch-notes-bis': () => allPatchPostBis
  },

  FORCED_BLOG_SUBCATEGORIES_PATHS: {
    'patch-notes': ['dashboard', 'discord-bot']
  }
};

export default BlogConfig;
