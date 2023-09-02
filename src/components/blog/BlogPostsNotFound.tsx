import { getServerSideI18n } from '@/i18n/server';
import { LanguageFlag } from '@/types/i18n';
import { FunctionComponent } from 'react';

interface BlogPostsNotFoundProps {
  lng: LanguageFlag;
}

export const BlogPostsNotFound: FunctionComponent<BlogPostsNotFoundProps> = async ({ lng }) => {
  const globalT = await getServerSideI18n();
  const txt = globalT(`vocab.no-blog-post`);
  return <p>{txt}</p>;
};

export default BlogPostsNotFound;
