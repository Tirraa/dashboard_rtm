import { getPostFormattedDate } from '@/lib/blog';
import { getBlogPostPathWithoutI18nPart } from '@/lib/i18n';
import { getSlicedBlogPostDescription } from '@/lib/str';
import PostBase from '@/types/BlogPostAbstractions';
import { LanguageFlag } from '@/types/i18n';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface BlogPostPeviewProps {
  post: PostBase;
  lng: LanguageFlag;
}

export const BlogPostPeview: FunctionComponent<BlogPostPeviewProps> = ({ post, lng }) => {
  const descriptionSnippet = post.description ? getSlicedBlogPostDescription(post.description) : getSlicedBlogPostDescription(post.metadescription);

  const formattedDate = getPostFormattedDate(lng, post);
  return (
    <div className="mb-8">
      <h2 className="mb-1">
        <Link href={getBlogPostPathWithoutI18nPart(post)} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600 dark:text-gray-300">
        {formattedDate}
      </time>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0 break-words" dangerouslySetInnerHTML={{ __html: descriptionSnippet }} />
    </div>
  );
};

export default BlogPostPeview;
