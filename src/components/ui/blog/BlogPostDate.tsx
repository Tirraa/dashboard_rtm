/* v8 ignore start */
// Stryker disable all

import type { WithClassname, WithLanguage } from '@rtm/shared-types/Next';
import type { IsoDateTimeString } from 'contentlayer/core';
import type { FunctionComponent } from 'react';

import { getBlogPostFormattedDate } from '@/lib/blog/api';
import cn from '@/lib/portable/tailwind/cn';

interface BlogPostDateProps extends WithLanguage, Partial<WithClassname> {
  date: IsoDateTimeString;
  suffix?: string;
}

const BlogPostDate: FunctionComponent<BlogPostDateProps> = ({ className: classNameValue, language, suffix, date }) => (
  <time className={cn('text-xs', classNameValue)} data-pagefind-ignore="all" dateTime={date}>
    {getBlogPostFormattedDate(language, date) + (suffix ? suffix : '')}
  </time>
);

export default BlogPostDate;

// Stryker restore all
/* v8 ignore stop */
