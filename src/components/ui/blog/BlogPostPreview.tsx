/* v8 ignore start */
// Stryker disable all

import type { WithLanguage } from '@rtm/shared-types/Next';
import type { BlogPostType } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import { getBlogPostPathWithoutI18nPart, getSlicedBlogPostDescription } from '@/lib/blog/api';
import { getScopedI18n } from '@/i18n/server';
import BlogConfig from '@/config/blog';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import { CardDescription, CardContent, CardHeader, CardFooter, CardTitle, Card } from '../Card';
import tagsGenerator from './tagsGenerator';
import BlogPostDate from './BlogPostDate';
import DraftBadge from './DraftBadge';

interface BlogPostPreviewProps extends WithLanguage {
  post: Pick<BlogPostType, 'metadescription' | 'description' | 'draft' | 'title' | 'tags' | 'date' | 'url'>;
  isNotOnBlogSubcategoryPage?: boolean;
}

const BlogPostPreview: FunctionComponent<BlogPostPreviewProps> = async ({ isNotOnBlogSubcategoryPage, language, post }) => {
  const scopedT = await getScopedI18n(i18ns.blogTags);
  const { metadescription, description, draft, title, date, tags, url } = post;

  const descriptionSnippet = description ? getSlicedBlogPostDescription(description) : getSlicedBlogPostDescription(metadescription);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const hasTags = tags.length > 0;
  const showDraftSuffix = BlogConfig.SHOW_DRAFTS_BADGE && draft;

  return (
    <article>
      <Link
        className="flex h-full w-full flex-col transition-transform duration-300 hover:delay-0 hover:duration-100 focus:delay-0 focus:duration-100 dark:hover:brightness-125 dark:focus:brightness-125 lg:hover:scale-105 lg:focus:scale-105"
        href={getBlogPostPathWithoutI18nPart(language, url)}
      >
        <Card className="overflow-hidden rounded shadow-lg transition-[box-shadow] duration-300 hover:shadow-xl focus:shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle titleType={isNotOnBlogSubcategoryPage ? 'h3' : 'h2'} className="is-h3 flex justify-between">
              {title}
              {showDraftSuffix && <DraftBadge className="relative bottom-1 left-2 rtl:-left-2" />}
            </CardTitle>
            <CardDescription>
              <BlogPostDate className="bg-secondary p-1 text-black dark:text-white" language={language} date={date} />
            </CardDescription>
          </CardHeader>
          <CardContent
            className={cn('p-6 pt-0', {
              'pb-3': hasTags
            })}
          >
            <div className="break-word text-sm [&>*:last-child]:mb-0 [&>*]:mb-3">{descriptionSnippet}</div>
          </CardContent>
          {hasTags && <CardFooter className="flex flex-wrap gap-2">{tagsGenerator({ language, scopedT, tags })}</CardFooter>}
        </Card>
      </Link>
    </article>
  );
};

export default BlogPostPreview;

// Stryker restore all
/* v8 ignore stop */
