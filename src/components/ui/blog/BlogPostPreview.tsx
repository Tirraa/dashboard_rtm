/* v8 ignore start */
// Stryker disable all

import type { BlogPostProps, BlogPostType } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import { getBlogPostPathWithoutI18nPart, getSlicedBlogPostDescription } from '@/lib/blog/api';
import { getCurrentLocale, getScopedI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';
import Link from 'next/link';

import { CardDescription, CardContent, CardHeader, CardFooter, CardTitle, Card } from '../Card';
import BlogPostDate from './BlogPostDate';
import { Badge } from '../badge';

interface BlogPostPreviewProps extends BlogPostProps {
  isNotOnBlogSubcategoryPage?: boolean;
}

async function tagsGenerator({ tags }: BlogPostType) {
  const scopedT = await getScopedI18n(i18ns.blogTags);
  const currentLocale = getCurrentLocale();

  const sortedTagsByCurrentLocale = tags.sort((a, b) => a.localeCompare(b, currentLocale));
  return sortedTagsByCurrentLocale.map((tag) => <Badge key={tag}>{scopedT(tag)}</Badge>);
}

const BlogPostPreview: FunctionComponent<BlogPostPreviewProps> = async ({ isNotOnBlogSubcategoryPage, language, post }) => {
  const descriptionSnippet = post.description ? getSlicedBlogPostDescription(post.description) : getSlicedBlogPostDescription(post.metadescription);

  return (
    <article>
      <Link
        className="flex h-full w-full flex-col transition-transform duration-300 hover:delay-0 hover:duration-100 focus:delay-0 focus:duration-100 dark:hover:brightness-125 dark:focus:brightness-125 lg:hover:scale-105 lg:focus:scale-105"
        href={getBlogPostPathWithoutI18nPart(post)}
      >
        <Card className="overflow-hidden rounded shadow-lg transition-[box-shadow] duration-300 hover:shadow-xl focus:shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle titleType={isNotOnBlogSubcategoryPage ? 'h3' : 'h2'} className="is-h3">
              {post.title}
            </CardTitle>
            <CardDescription>
              <BlogPostDate className="bg-secondary p-1 text-black dark:text-white" language={language} post={post} />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pb-3 pt-0">
            <div className="break-word text-sm [&>*:last-child]:mb-0 [&>*]:mb-3">{descriptionSnippet}</div>
          </CardContent>
          {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
          {post.tags.length > 0 && <CardFooter className="flex gap-2">{await tagsGenerator(post)}</CardFooter>}
        </Card>
      </Link>
    </article>
  );
};

export default BlogPostPreview;

// Stryker restore all
/* v8 ignore stop */
