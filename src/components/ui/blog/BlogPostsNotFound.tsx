import { getServerSideI18n } from '@/i18n/server';
import { i18ns } from 'interop/config/i18n';
import type { FunctionComponent } from 'react';

interface BlogPostsNotFoundProps {}

export const BlogPostsNotFound: FunctionComponent<BlogPostsNotFoundProps> = async () => {
  const globalT = await getServerSideI18n();
  const txt = globalT(`${i18ns.vocab}.no-blog-post`);
  return <p>{txt}</p>;
};

export default BlogPostsNotFound;
