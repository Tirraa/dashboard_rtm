import { getPostFormattedDate, getPostUnstrict, isValidCategoryAndSubCategoryPair } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostPageProps } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { LanguageFlag } from '@/types/i18n';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

interface BlogPostInnerProps {
  post: PostBase;
  lng: LanguageFlag;
}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ post, lng }) => {
  const formattedDate = getPostFormattedDate(lng, post);

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600 dark:text-gray-300">
          {formattedDate}
        </time>
        <h1>{post.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 word-break" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
};

export const BlogPost: FunctionComponent<BlogPostPageProps> = ({ params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subCategory = params[BlogTaxonomy.SUBCATEGORY];

  if (!isValidCategoryAndSubCategoryPair(category, subCategory)) notFound();

  const slug = params[BlogTaxonomy.SLUG];
  const lng = params[i18nTaxonomy.LANG_FLAG];

  const post = getPostUnstrict({ category, subCategory }, slug, lng);
  if (!post) notFound();

  return <BlogPostInner {...{ post, lng }} />;
};

export default BlogPost;
