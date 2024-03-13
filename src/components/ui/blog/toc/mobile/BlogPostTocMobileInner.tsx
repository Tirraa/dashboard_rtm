import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent, ReactElement } from 'react';

import { AccordionContent, AccordionTrigger, AccordionItem, Accordion } from '@/components/ui/Accordion';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import Link from 'next/link';

import type { BlogPostTocMobileInnerProps } from '../types';

const accordionContentGenerator = (headings: DocumentHeading[]): ReactElement[] =>
  headings.map((heading) => (
    <AccordionContent key={heading.slug}>
      <Link className="text-lg font-bold transition-colors duration-200 ease-in-out hover:text-primary" href={'#' + heading.slug} replace>
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
