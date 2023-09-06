import { BlogCategory, ForcedBlogSubCategoriesPaths, PostsCollectionAssoc } from '@/types/Blog';
import { allPatchPosts } from 'contentlayer/generated';

type TBlogConfig = {
  DISPLAYED_BLOG_POST_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: number;
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: number;
  BLOG_CATEGORIES_ALL_POSTS_TYPES_ASSOC: PostsCollectionAssoc<BlogCategory>;
  FORCED_BLOG_SUBCATEGORIES_PATHS: ForcedBlogSubCategoriesPaths;
};

export type BlogArchitecture = {
  'patch-notes': 'dashboard' | 'discord-bot';
};

export const BlogConfig: TBlogConfig = {
  DISPLAYED_BLOG_POST_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: 2,
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: 250,

  BLOG_CATEGORIES_ALL_POSTS_TYPES_ASSOC: {
    'patch-notes': () => allPatchPosts
  },

  FORCED_BLOG_SUBCATEGORIES_PATHS: {
    'patch-notes': ['dashboard', 'discord-bot']
  }
};

export default BlogConfig;
