import BlogPostsNotFound from '@/components/blog/BlogPostsNotFound';
import { LanguageFlag } from '@/config/i18n';
import { ReactNode } from 'react';

export const BlogPostsBasedOnReactNodeCollection = (generatedPosts: ReactNode[], lng: LanguageFlag) =>
  generatedPosts.some((item) => item !== null) ? generatedPosts : <BlogPostsNotFound {...{ lng }} />;

export default BlogPostsBasedOnReactNodeCollection;
