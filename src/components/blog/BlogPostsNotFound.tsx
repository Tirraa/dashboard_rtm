import { getServerSideI18n } from '@/i18n/server';
import { FunctionComponent } from 'react';

interface BlogPostsNotFoundProps {}

export const BlogPostsNotFound: FunctionComponent<BlogPostsNotFoundProps> = async () => {
  const globalT = await getServerSideI18n();
  const txt = globalT('vocab.no-blog-post');
  return <p>{txt}</p>;
};

export default BlogPostsNotFound;
