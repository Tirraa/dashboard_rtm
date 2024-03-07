import type { BlogPostType } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import { getScopedI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

interface BlogPostTocProps {
  post: BlogPostType;
}

const BlogPostToc: FunctionComponent<BlogPostTocProps> = async ({ post }) => {
  const scopedT = await getScopedI18n(i18ns.vocab);
  const { headings } = post;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (headings.length === 0) return null;

  return (
    <nav className="flex items-center self-start" aria-label={scopedT('toc')}>
      <ol className="list-none space-y-3">
        {headings.map((heading) => (
          <li
            className={cn('list-none text-sm font-bold transition-colors duration-200 ease-in-out hover:text-accent-foreground', {
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-6 font-normal': heading.depth === 5,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-2 font-normal': heading.depth === 3,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-4 font-normal': heading.depth === 4
            })}
            key={heading.slug}
          >
            <Link href={`#${heading.slug}`}>{heading.content}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BlogPostToc;
