'use client';

import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import { computeHTMLElementHeight } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useEffect, useState, useRef } from 'react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

interface BlogPostTocDesktopProps {
  headings: DocumentHeading[];
}

const BlogPostTocDesktop: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const [activeSlug, setActiveSlug] = useState<string>('');
  const wasCollapsed = useRef<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(wasCollapsed.current);
  const tocRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLOListElement>(null);

  const scopedT = useScopedI18n(i18ns.vocab);

  useEffect(() => {
    const tocInstance = getRefCurrentPtr(tocRef);
    const headingsInstance = getRefCurrentPtr(headingsRef);

    if (!tocInstance || !headingsInstance) return;

    const EFFECT_CLASSES = ['transition-all', 'duration-300'];

    function applyUncollapsedStyles() {
      tocInstance.style.marginTop = '0';
      headingsInstance.style.opacity = '';
      wasCollapsed.current = false;
    }

    function applyCollapsedStyles() {
      tocInstance.style.marginTop = '-' + (computeHTMLElementHeight(tocInstance) + COLLAPSE_BUTTON_HEIGTH_IN_PX) + 'px';
      headingsInstance.style.opacity = '0';
      wasCollapsed.current = true;
    }

    if (!isCollapsed) {
      if (!wasCollapsed.current) {
        tocInstance.classList.remove(...EFFECT_CLASSES);
        headingsInstance.classList.remove(...EFFECT_CLASSES);
      } else {
        tocInstance.classList.add(...EFFECT_CLASSES);
        headingsInstance.classList.add(...EFFECT_CLASSES);
      }

      applyUncollapsedStyles();
      return;
    }
    if (wasCollapsed.current) tocInstance.classList.remove(...EFFECT_CLASSES);
    else tocInstance.classList.add(...EFFECT_CLASSES);
    applyCollapsedStyles();
  }, [isCollapsed, tocRef, headingsRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry?.isIntersecting) setActiveSlug(entry.target.id);
        }
      },
      {
        rootMargin: '-30% 0px'
      }
    );

    if (!isCollapsed) {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (element) observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, [headings, isCollapsed]);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col items-center self-start" aria-label={scopedT('toc')} ref={tocRef}>
      <ol className="list-none space-y-3" ref={headingsRef}>
        {headings.map((heading) => (
          <li
            className={cn('list-none text-sm font-bold transition-colors duration-200 ease-in-out hover:text-primary', {
              'text-primary': activeSlug === heading.slug,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-6 font-normal': heading.depth === 5,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-2 font-normal': heading.depth === 3,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-4 font-normal': heading.depth === 4
            })}
            key={heading.slug}
          >
            {(!isCollapsed && <Link href={`#${heading.slug}`}>{heading.content}</Link>) || (
              <p className="cursor-default select-none" aria-hidden="true">
                {heading.content}
              </p>
            )}
          </li>
        ))}
      </ol>
      <BlogPostTocCollapseButton setIsCollapsed={setIsCollapsed} className="relative top-5" isCollapsed={isCollapsed} />
    </nav>
  );
};

export default BlogPostTocDesktop;
