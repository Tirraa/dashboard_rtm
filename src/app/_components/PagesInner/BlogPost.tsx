import { Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { FunctionComponent } from 'react';

interface BlogPostInnerProps {
  post: Post;
}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ post }) => (
  <article className="mx-auto max-w-xl py-8">
    <div className="mb-8 text-center">
      <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h1 className="text-3xl font-bold">{post.title}</h1>
    </div>
    <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 word-break" dangerouslySetInnerHTML={{ __html: post.body.html }} />
  </article>
);

export default BlogPostInner;
