'use client';

import type { AuthorTooltipLazyProps } from '@/components/ui/blog/AuthorTooltipLazy';
import type { AuthorName, Author } from '##/config/contentlayer/blog/authors';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { WithClassname, Href } from '@rtm/shared-types/Next';
import type { Index } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { authorsEntries } from '##/config/contentlayer/blog/authors';
import { AUTHOR_TOOLTIP_SIZE } from '@/config/Blog/etc';
import { getClientSideI18n } from '@/i18n/client';
import { useEffect, useState } from 'react';
import cn from '@/lib/portable/tailwind/cn';
import { i18ns } from '##/config/i18n';
import Image from 'next/image';

interface BlogPostAuthorsProps extends Partial<WithClassname> {
  authorsIndexes: Index[];
  title: string;
  href: Href;
}

interface BlogPostAuthorProps {
  hoveredElement?: {
    title: string;
    href: Href;
  };
  author: Author;
  bio: string;
  alt: string;
}

const BlogPostPreviewAuthor: FunctionComponent<BlogPostAuthorProps> = (props) => {
  const placeholder = (
    <Image
      src={props.author.profilePictureUrl}
      height={AUTHOR_TOOLTIP_SIZE}
      width={AUTHOR_TOOLTIP_SIZE}
      className="rounded-full"
      draggable={false}
      alt={props.alt}
    />
  );

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<AuthorTooltipLazyProps>>>(null);
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    import('@/components/ui/blog/AuthorTooltipLazy').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};

const BlogPostPreviewAuthors: FunctionComponent<BlogPostAuthorsProps> = ({ className: classNameValue, authorsIndexes, title, href }) => {
  const globalT = getClientSideI18n();

  return (
    <ul className={cn('my-2 flex flex-wrap gap-2', classNameValue)}>
      {authorsIndexes.map((authorIndex) => {
        // eslint-disable-next-line no-magic-numbers
        const authorName = authorsEntries[authorIndex][0] as AuthorName;
        // eslint-disable-next-line no-magic-numbers
        const author = authorsEntries[authorIndex][1];
        // {ToDo} Buggy atm - https://github.com/QuiiBz/next-international/issues/409
        const alt = globalT(`${i18ns.blogAuthors}.${authorName}.alt`) || authorName;
        const bio = globalT(`${i18ns.blogAuthors}.${authorName}.bio`);

        return (
          <li key={authorName}>
            <BlogPostPreviewAuthor hoveredElement={{ title, href }} author={author} bio={bio} alt={alt} />
          </li>
        );
      })}
    </ul>
  );
};

export default BlogPostPreviewAuthors;
