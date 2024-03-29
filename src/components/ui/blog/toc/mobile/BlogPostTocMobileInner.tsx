import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent, ReactElement } from 'react';

import { AccordionContent, AccordionTrigger, AccordionItem, Accordion } from '@/components/ui/Accordion';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { BlogPostTocMobileInnerProps } from '../types';

const accordionContentGenerator = (headings: DocumentHeading[]): ReactElement[] =>
  headings.map((heading) => (
    <AccordionContent key={heading.slug}>
      <Link
        className={cn('text-lg font-bold transition-colors duration-200 ease-in-out hover:text-primary', {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          'font-medium': 3 <= heading.depth && heading.depth <= 6,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          'ml-6': heading.depth === 5 || heading.depth === 6,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          'ml-4': heading.depth === 4,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          'ml-2': heading.depth === 3
        })}
        href={'#' + heading.slug}
        replace
      >
        {heading.content}
      </Link>
    </AccordionContent>
  ));

const BlogPostTocMobileInner: FunctionComponent<BlogPostTocMobileInnerProps> = ({ headings }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const title = capitalize(scopedT('toc'));

  return (
    <Accordion className="lg:hidden" type="single" collapsible>
      <AccordionItem value="toc">
        <AccordionTrigger>{title}</AccordionTrigger>
        {accordionContentGenerator(headings)}
      </AccordionItem>
    </Accordion>
  );
};

export default BlogPostTocMobileInner;
