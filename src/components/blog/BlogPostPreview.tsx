import { LanguageFlag } from '@/config/i18n';
import { getBlogPostPathWithoutI18nPart } from '@/lib/i18n';
import { capitalize, getSlicedBlogPostDescription } from '@/lib/str';
import PostBase from '@/types/BlogPostAbstractions';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface BlogPostPeviewProps {
  post: PostBase;
  lng: LanguageFlag;
}

export const BlogPostPeview: FunctionComponent<BlogPostPeviewProps> = ({ post, lng }) => {
  const descriptionSnippet = post.description ? getSlicedBlogPostDescription(post.description) : getSlicedBlogPostDescription(post.metadescription);

  const formattedDate = capitalize(new Intl.DateTimeFormat(lng, { dateStyle: 'full', timeStyle: 'short' }).format(new Date(post.date)).toString());
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link href={getBlogPostPathWithoutI18nPart(post)} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {formattedDate}
      </time>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0 break-words" dangerouslySetInnerHTML={{ __html: descriptionSnippet }} />
    </div>
  );
};

export default BlogPostPeview;
