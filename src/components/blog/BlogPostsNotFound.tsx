import { LanguageFlag } from '@/config/i18n';
import { getServerSideTranslation } from '@/i18n';
import { FunctionComponent } from 'react';

interface BlogPostsNotFoundProps {
  lng: LanguageFlag;
}

export const BlogPostsNotFound: FunctionComponent<BlogPostsNotFoundProps> = async ({ lng }) => {
  const { t } = await getServerSideTranslation(lng);
  const txt = t('no-blog-post');
  return <p>{txt}</p>;
};

export default BlogPostsNotFound;
