import { LanguageFlag } from '@/config/i18n';
import { getFormattedDate } from '@/lib/str';
import PostBase from '@/types/BlogPostAbstractions';
import { FunctionComponent } from 'react';

interface BlogPostInnerProps {
  post: PostBase;
  lng: LanguageFlag;
}

export const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ post, lng }) => {
  const formattedDate = getFormattedDate(lng, new Date(post.date));

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {formattedDate}
        </time>
        <h1>{post.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 word-break" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
};

export default BlogPostInner;
