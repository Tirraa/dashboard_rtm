'use client';

import type { AuthorHoverCardProps } from '@/components/ui/blog/AuthorHoverCard';
import type { AuthorName, Author } from '##/config/contentlayer/blog/authors';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { Index } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { authorsEntries } from '##/config/contentlayer/blog/authors';
import { getClientSideI18n } from '@/i18n/client';
import { useEffect, useState } from 'react';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Image from 'next/image';

interface BlogPostAuthorsProps extends Partial<WithClassname> {
  authorsIndexes: Index[];
}

interface BlogPostAuthorProps {
  author: Author;
  bio: string;
  alt: string;
}

const BlogPostPreviewAuthor: FunctionComponent<BlogPostAuthorProps> = (props) => {
  const placeholder = (
    <Image className="h-[40px] w-[40px] rounded-full" src={props.author.profilePictureUrl} alt={props.alt} height={40} width={40} />
  );

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<AuthorHoverCardProps>>>(null);
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    import('@/components/ui/blog/AuthorHoverCard').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};

const BlogPostPreviewAuthors: FunctionComponent<BlogPostAuthorsProps> = ({ className: classNameValue, authorsIndexes }) => {
  const globalT = getClientSideI18n();

  return (
    <ul className={cn('my-2 flex flex-wrap gap-2', classNameValue)}>
      {authorsIndexes.map((authorIndex) => {
        // eslint-disable-next-line no-magic-numbers
        const authorName = authorsEntries[authorIndex][0] as AuthorName;
        // eslint-disable-next-line no-magic-numbers
        const author = authorsEntries[authorIndex][1];
        // https://github.com/QuiiBz/next-international/issues/409
        const alt = globalT(`${i18ns.blogAuthors}.${authorName}.alt`) || authorName;
        const bio = globalT(`${i18ns.blogAuthors}.${authorName}.bio`);

        return (
          <li key={authorName}>
            <BlogPostPreviewAuthor author={author} bio={bio} alt={alt} />
          </li>
        );
      })}
    </ul>
  );
};

export default BlogPostPreviewAuthors;
