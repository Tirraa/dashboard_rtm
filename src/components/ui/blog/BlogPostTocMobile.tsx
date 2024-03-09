'use client';

import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent, ReactElement } from 'react';

import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import Link from 'next/link';

import type { BlogPostTocDesktopProps } from './BlogPostTocDesktopLazy';

import { AccordionContent, AccordionTrigger, AccordionItem, Accordion } from '../accordion';

interface BlogPostTocMobileProps extends BlogPostTocDesktopProps {}

const accordionContentGenerator = (headings: DocumentHeading[]): ReactElement[] =>
  headings.map((heading) => (
    <AccordionContent key={heading.slug}>
      <Link className="text-lg font-bold transition-colors duration-200 ease-in-out hover:text-primary" href={'#' + heading.slug} replace>
        {heading.content}
      </Link>
    </AccordionContent>
  ));

const BlogPostTocMobile: FunctionComponent<BlogPostTocMobileProps> = ({ headings }) => {
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

export default BlogPostTocMobile;
