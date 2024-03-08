'use client';

import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import { useScrollDirection } from '@/components/hooks/useScrollDirection';
import { computeHTMLElementHeight } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useEffect, useState, useRef } from 'react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

type ActiveSlugMetas = { slug: string; idx: number };

interface BlogPostTocDesktopProps {
  headings: DocumentHeading[];
}

const NIL_IDX = -1;

const HIGHLIGHT_INITIAL_STATE: ActiveSlugMetas = { idx: NIL_IDX, slug: '' } as const;

type HeadingSlug = string;
type HeadingSlugIdx = number;

const visibleElements = {} as Record<HeadingSlug, HeadingSlugIdx>;

const BlogPostTocDesktop: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const scrollDirection = useScrollDirection();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [state, setState] = useState<{ highlight: ActiveSlugMetas; isCollapsed: boolean }>({
    highlight: HIGHLIGHT_INITIAL_STATE,
    isCollapsed: false
  });
  const forcedActiveSlug = useRef<ActiveSlugMetas>(HIGHLIGHT_INITIAL_STATE);
  const preparedForcedActiveSlug = useRef<ActiveSlugMetas>(HIGHLIGHT_INITIAL_STATE);
  const wasCollapsed = useRef<boolean>(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLOListElement>(null);

  const scopedT = useScopedI18n(i18ns.vocab);

  function setIsCollapsed(isCollapsed: boolean) {
    setState((prev) => ({ ...prev, isCollapsed }));
  }

  // * ... Scroll effect
  useEffect(() => {
    function handleScroll() {
      // console.log("You're scrolling! I should release the forced active slug");
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // * ... Scroll end effect
  useEffect(() => {
    function handleScrollEnd() {
      // console.log("You don't scroll anymore (or clicked on a link of the toc! I should check if I have a forced active slug and then set it.");
    }

    window.addEventListener('scrollend', handleScrollEnd);

    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, []);

  // * ... Collapse
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

    if (!state.isCollapsed) {
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
  }, [state.isCollapsed, tocRef, headingsRef]);

  // * ... Highlighting
  useEffect(
    () => {
      const observer = new IntersectionObserver(
        (entries) => {
          // ToDo: return if there is a forced slug

          let first: ActiveSlugMetas = HIGHLIGHT_INITIAL_STATE;
          let last: ActiveSlugMetas = HIGHLIGHT_INITIAL_STATE;

          for (const entry of entries) {
            const slug = entry.target.id;
            if (entry.isIntersecting) {
              visibleElements[slug] = headings.findIndex((heading) => heading.slug === slug);
            } else {
              delete visibleElements[slug];
            }
          }

          for (const [slug, idx] of Object.entries(visibleElements)) {
            if (first.idx === NIL_IDX || idx < first.idx) first = { slug, idx };
            if (last.idx === NIL_IDX || idx > last.idx) last = { slug, idx };
          }

          const oldIdx = state.highlight.idx;
          const firstIdx = first.idx;
          const lastIdx = last.idx;

          if (firstIdx !== NIL_IDX && scrollDirection === 'down' && (oldIdx === NIL_IDX || oldIdx < firstIdx)) {
            console.log('Setting to first, ie:', first);
            setState((prev) => ({ ...prev, activeSlug: first }));
          } else if (lastIdx !== NIL_IDX && scrollDirection === 'up' && (oldIdx === NIL_IDX || oldIdx > lastIdx)) {
            console.log('Setting to last, ie:', last);
            setState((prev) => ({ ...prev, activeSlug: last }));
          }
        },
        { rootMargin: '-30% 0px' }
      );

      for (const heading of headings) {
        const element = document.getElementById(heading.slug);
        if (element) observer.observe(element);
      }

      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col items-center self-start" aria-label={scopedT('toc')} ref={tocRef}>
      <ol className="list-none space-y-3" ref={headingsRef}>
        {headings.map((heading, idx) => (
          <li
            className={cn('list-none text-sm font-bold transition-colors duration-200 ease-in-out hover:text-primary', {
              'text-primary':
                forcedActiveSlug.current.slug === heading.slug || (!forcedActiveSlug.current.slug && state.highlight.slug === heading.slug),
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-6 font-normal': heading.depth === 5,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-2 font-normal': heading.depth === 3,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-4 font-normal': heading.depth === 4
            })}
            key={heading.slug}
          >
            {(!state.isCollapsed && (
              <Link
                onClick={() => {
                  preparedForcedActiveSlug.current = { slug: heading.slug, idx };
                  // ToDo update the state with forcedActiveSlug
                }}
                href={`#${heading.slug}`}
              >
                {heading.content}
              </Link>
            )) || (
              <p className="cursor-default select-none" aria-hidden="true">
                {heading.content}
              </p>
            )}
          </li>
        ))}
      </ol>
      <BlogPostTocCollapseButton setIsCollapsed={setIsCollapsed} isCollapsed={state.isCollapsed} className="relative top-5" />
    </nav>
  );
};

export default BlogPostTocDesktop;
